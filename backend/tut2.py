import json
import httpx
import logging
import logging.handlers
import argparse
import sys
import time
from pathlib import Path
from typing import Dict, Any
# optional import — will error early if not installed
import jmespath

client = httpx.Client(
    headers={
        # this is internal ID of an Instagram backend app. It doesn't change often.
        "x-ig-app-id": "936619743392459",
        # use browser-like features
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9,ru;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept": "*/*",
    },
    timeout=10.0,
)

def setup_logger(name="tut1", log_file: str | None = None, level=logging.INFO):
    logger = logging.getLogger(name)
    logger.setLevel(level)
    fmt = logging.Formatter("%(asctime)s %(levelname)s %(message)s", "%Y-%m-%d %H:%M:%S")
    # ensure console handler exists so we always have at least one handler
    if not logger.handlers:
        sh = logging.StreamHandler()
        sh.setFormatter(fmt)
        logger.addHandler(sh)
    # optional rotating file (create parent dir first, handle errors)
    if log_file:
        try:
            log_path = Path(log_file)
            if log_path.parent:
                log_path.parent.mkdir(parents=True, exist_ok=True)
            fh = logging.handlers.RotatingFileHandler(str(log_path), maxBytes=2_000_000, backupCount=3)
            fh.setFormatter(fmt)
            logger.addHandler(fh)
        except Exception as exc:
            # safe fallback to console (already added above) and warn
            logger.warning("Could not create log file %s: %s. Continuing with console logging.", log_file, exc)
    return logger

logger = setup_logger()

def scrape_user(username: str, attempts: int = 3, backoff: float = 1.0):
    """Scrape Instagram user's data. Returns a dict on success."""
    url = f"https://i.instagram.com/api/v1/users/web_profile_info/?username={username}"
    last_exc = None
    for attempt in range(1, attempts + 1):
        try:
            logger.info("Requesting %s (attempt %d/%d)", url, attempt, attempts)
            resp = client.get(url)
            resp.raise_for_status()
            data = resp.json()
            user = data.get("data", {}).get("user")
            if user is None:
                raise ValueError("No 'user' key in response JSON")
            logger.info("Successfully scraped user: %s", username)
            return user
        except (httpx.RequestError, httpx.HTTPStatusError, ValueError, json.JSONDecodeError) as exc:
            last_exc = exc
            logger.warning("Attempt %d failed: %s", attempt, exc)
            if attempt < attempts:
                sleep_for = backoff * (2 ** (attempt - 1))
                logger.info("Retrying after %.1f seconds...", sleep_for)
                time.sleep(sleep_for)
    logger.error("All attempts failed for %s: %s", username, last_exc)
    raise last_exc

def scrape_followers(user_id: str, attempts: int = 3, backoff: float = 1.0):
    """Placeholder for scraping followers. Note: Limited by Instagram API restrictions."""
    logger.warning("Follower scraping is restricted by Instagram API. Only partial data may be available.")
    # This is a placeholder. The public API does not support fetching full follower lists.
    # Requires Instagram Graph API access with authentication for business accounts.
    return []

def save_output(data: dict, path: Path, pretty: bool = True):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        if pretty:
            json.dump(data, f, ensure_ascii=False, indent=2)
        else:
            json.dump(data, f, ensure_ascii=False)
    logger.info("Saved output to %s", path)

def parse_user(data: Dict[str, Any]) -> Dict[str, Any]:
    """Parse Instagram user's hidden web dataset for user's data, including top comments."""
    logger.debug("parsing user data %s", data.get("username"))
    expr = r"""
    {
        name: full_name,
        username: username,
        id: id,
        category: category_name,
        business_category: business_category_name,
        phone: business_phone_number,
        email: business_email,
        bio: biography,
        bio_links: bio_links[].url,
        homepage: external_url,
        followers: edge_followed_by.count,
        follows: edge_follow.count,
        facebook_id: fbid,
        is_private: is_private,
        is_verified: is_verified,
        profile_image: profile_pic_url_hd,
        video_count: edge_felix_video_timeline.count,
        videos: edge_felix_video_timeline.edges[].node.{
            id: id,
            title: title,
            shortcode: shortcode,
            thumb: display_url,
            url: video_url,
            views: video_view_count,
            tagged: edge_media_to_tagged_user.edges[].node.user.username,
            captions: edge_media_to_caption.edges[].node.text,
            comments_count: edge_media_to_comment.count,
            comments_disabled: comments_disabled,
            taken_at: taken_at_timestamp,
            likes: edge_liked_by.count,
            location: location.name,
            duration: video_duration,
            top_comments: edge_media_to_comment.edges[].node.{
                id: id,
                text: text,
                created_at: created_at,
                username: owner.username,
                likes: like_count
            }
        },
        image_count: edge_owner_to_timeline_media.count,
        images: edge_owner_to_timeline_media.edges[].node.{
            id: id,
            title: title,
            shortcode: shortcode,
            src: display_url,
            url: video_url,
            views: video_view_count,
            tagged: edge_media_to_tagged_user.edges[].node.user.username,
            captions: edge_media_to_caption.edges[].node.text,
            comments_count: edge_media_to_comment.count,
            comments_disabled: comments_disabled,
            taken_at: taken_at_timestamp,
            likes: edge_liked_by.count,
            location: location.name,
            accesibility_caption: accessibility_caption,
            duration: video_duration,
            top_comments: edge_media_to_comment.edges[].node.{
                id: id,
                text: text,
                created_at: created_at,
                username: owner.username,
                likes: like_count
            }
        },
        saved_count: edge_saved_media.count,
        collections_count: edge_media_collections.count,
        related_profiles: edge_related_profiles.edges[].node.username
    }
    """
    try:
        result = jmespath.search(expr, data)
    except Exception as exc:
        logger.exception("jmespath parse failed: %s", exc)
        raise
    logger.debug("parsed result keys: %s", list(result.keys()) if isinstance(result, dict) else "no-dict")
    return result

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Scrape Instagram user profile (basic).")
    parser.add_argument("username", help="Instagram username to scrape")
    parser.add_argument("--out", "-o", help="Write JSON output to file")
    parser.add_argument("--log-file", help="Write logs to file")
    parser.add_argument("--no-pretty", action="store_true", help="Disable pretty JSON formatting")
    parser.add_argument("--attempts", type=int, default=3, help="Number of attempts on failure")
    parser.add_argument("--no-parse", action="store_true", help="Skip jmespath parsing and save raw scraped JSON")
    args = parser.parse_args()

    # reconfigure logger if user requested a log file
    if args.log_file:
        logger = setup_logger(log_file=args.log_file)

    try:
        user_data = scrape_user(args.username, attempts=args.attempts)
    except Exception as e:
        logger.exception("Failed to scrape user: %s", e)
        sys.exit(1)

    # parse unless user asked to skip parsing
    output_data = user_data
    if not args.no_parse:
        try:
            output_data = parse_user(user_data)
        except Exception:
            logger.warning("Parsing failed — falling back to raw scraped data")
            output_data = user_data

    # Attempt to scrape followers (placeholder)
    followers_data = scrape_followers(output_data.get("id", ""))
    output_data["followers_list"] = followers_data
    output_data["age_group_dynamics"] = "Age group data unavailable via public API"

    if args.out:
        out_path = Path(args.out)
        save_output(output_data, out_path, pretty=not args.no_pretty)
    else:
        # print compact JSON to stdout (pretty by default)
        if args.no_pretty:
            print(json.dumps(output_data, ensure_ascii=False))
        else:
            print(json.dumps(output_data, ensure_ascii=False, indent=2))