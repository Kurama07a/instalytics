import instaloader
import itertools
import sys

def fetch_instagram_data(username):
    L = instaloader.Instaloader(max_connection_attempts=0)  # Unlimited retries for connection issues
    
    # Load saved session to authenticate (replace 'YOUR_IG_USERNAME' with your Instagram username)
    L.load_session_from_file('prakhar_20s')
    
    try:
        profile = instaloader.Profile.from_username(L.context, username)
        
        print(f"Profile: {profile.username}")
        print(f"Full Name: {profile.full_name}")
        print(f"Followers: {profile.followers}")
        print(f"Following: {profile.followees}")
        print(f"Post Count: {profile.mediacount}")
        print(f"IGTV Count: {profile.igtvcount}")
        print(f"Bio: {profile.biography[:100]}..." if profile.biography else "No bio")
        
        # Fetch latest 10 posts from feed
        print("\nLatest 10 Posts:")
        posts = profile.get_posts()
        for i, post in enumerate(itertools.islice(posts, 10)):
            post_type = post.typename
            if post_type == 'GraphVideo':
                try:
                    if post.product_type == 'clips':
                        post_type = 'Reel'
                    elif post.product_type == 'igtv':
                        post_type = 'IGTV'
                    else:
                        post_type = 'Video'
                except AttributeError:
                    post_type = 'Video'
            
            print(f"\nPost {i+1}:")
            print(f"Shortcode: {post.shortcode} (URL: https://www.instagram.com/p/{post.shortcode}/)")
            print(f"Date (UTC): {post.date_utc}")
            print(f"Likes: {post.likes}")
            print(f"Comments: {post.comments}")
            if post.is_video:
                print(f"Video Views: {post.video_view_count if post.video_view_count else 'N/A'}")
                print(f"Video Duration: {post.video_duration} seconds" if post.video_duration else "N/A")
            print(f"Type: {post_type}")
            print(f"Caption: {post.caption[:100]}..." if post.caption else "No caption")
            print(f"Tagged Users: {', '.join(post.tagged_users)}" if post.tagged_users else "None")
        
        # Fetch latest 10 reels separately
        print("\nLatest 10 Reels:")
        reels = profile.get_reels()
        for i, reel in enumerate(itertools.islice(reels, 10)):
            post_type = 'Reel'  # All items from get_reels are reels
            print(f"\nReel {i+1}:")
            print(f"Shortcode: {reel.shortcode} (URL: https://www.instagram.com/reel/{reel.shortcode}/)")
            print(f"Date (UTC): {reel.date_utc}")
            print(f"Likes: {reel.likes}")
            print(f"Comments: {reel.comments}")
            if reel.is_video:
                print(f"Video Views: {reel.video_view_count if reel.video_view_count else 'N/A'}")
                print(f"Video Duration: {reel.video_duration} seconds" if reel.video_duration else "N/A")
            print(f"Type: {post_type}")
            print(f"Caption: {reel.caption[:100]}..." if reel.caption else "No caption")
            print(f"Tagged Users: {', '.join(reel.tagged_users)}" if reel.tagged_users else "None")
    
    except instaloader.exceptions.ProfileNotExistsException:
        print(f"Profile '{username}' does not exist.")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script.py <username>")
        sys.exit(1)
    fetch_instagram_data(sys.argv[1])