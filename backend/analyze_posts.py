import json
import requests
from PIL import Image, ImageFilter, ImageStat
import numpy as np
from transformers import CLIPProcessor, CLIPModel
import torch
import sys
import os
from io import BytesIO
import re

# Load CLIP model
model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

# Define categories and vibes
categories = [
    "Beach Travel", "Mountain Travel", "City Travel", "Adventure Travel", "Cultural Travel", "Luxury Travel", "Budget Travel", "Solo Travel", "Family Travel", "Business Travel",
    "Street Fashion", "Formal Fashion", "Casual Fashion", "Luxury Fashion", "Vintage Fashion", "Sportswear", "Evening Wear", "Accessories", "Footwear", "Jewelry",
    "Italian Food", "Chinese Food", "Japanese Food", "Mexican Food", "Indian Food", "French Food", "Thai Food", "Korean Food", "American Food", "Mediterranean Food",
    "Seafood", "Vegetarian Food", "Vegan Food", "Desserts", "Beverages", "Fast Food", "Healthy Food", "Street Food", "Fine Dining", "Home Cooking",
    "Landscape Photography", "Portrait Photography", "Street Photography", "Nature Photography", "Wildlife Photography", "Macro Photography", "Aerial Photography", "Event Photography", "Fashion Photography", "Food Photography",
    "Abstract Art", "Realistic Art", "Digital Art", "Painting", "Sculpture", "Drawing", "Graffiti", "Installation Art", "Contemporary Art", "Classical Art",
    "Pop Music", "Rock Music", "Jazz Music", "Classical Music", "Electronic Music", "Hip Hop Music", "Country Music", "Reggae Music", "Blues Music", "Folk Music",
    "Soccer", "Basketball", "Tennis", "Golf", "Swimming", "Running", "Cycling", "Yoga", "Pilates", "Weightlifting",
    "Mountains", "Forests", "Oceans", "Deserts", "Rivers", "Lakes", "Wildlife", "Birds", "Mammals", "Insects",
    "Cars", "Motorcycles", "Trucks", "Electric Vehicles", "Luxury Cars", "Sports Cars", "Vintage Cars", "Racing Cars", "SUVs", "Sedans",
    "Technology", "Gadgets", "Smartphones", "Computers", "AI", "Robotics", "Space", "Astronomy", "Physics", "Chemistry",
    "Concerts", "Festivals", "Parties", "Weddings", "Birthdays", "Graduations", "Sports Events", "Music Festivals", "Art Exhibitions", "Theater",
    "Comedy Shows", "Dance Performances", "Opera", "Ballet", "Circus", "Carnivals", "Fairs", "Expos", "Conventions", "Seminars",
    "Workshops", "Classes", "Tutorials", "Webinars", "Podcasts", "Livestreams", "Vlogs", "Blogs", "News", "Interviews",
    "Reviews", "Tutorials", "How-tos", "Challenges", "Contests", "Giveaways", "Polls", "Surveys", "Memes", "Quotes",
    "Inspirational", "Motivational", "Educational", "Informative", "Entertaining", "Funny", "Sad", "Angry", "Happy", "Surprised",
    "Love", "Friendship", "Family", "Pets", "Hobbies", "Games", "Puzzles", "Trivia", "Quizzes", "Riddles"
]
vibes = ["Peaceful", "Aesthetic", "Energetic", "Casual", "Serene", "Vibrant", "Calm", "Dynamic", "Relaxed", "Intense"]
qualities = ["Low Quality", "Medium Quality", "High Quality"]

def download_image(url):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return Image.open(BytesIO(response.content)).convert("RGB")
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return None

def classify_image(image, texts):
    inputs = processor(text=texts, images=image, return_tensors="pt", padding=True)
    outputs = model(**inputs)
    logits_per_image = outputs.logits_per_image
    probs = logits_per_image.softmax(dim=1)
    return probs[0]

def analyze_quality(image):
    # Convert to numpy array
    img_array = np.array(image)
    
    # Lighting (brightness): average of grayscale
    gray = image.convert('L')
    stat = ImageStat.Stat(gray)
    lighting = stat.mean[0] / 255.0  # 0-1 scale
    
    # Contrast: standard deviation of grayscale
    contrast = stat.stddev[0] / 128.0  # normalize
    
    # Saturation: average saturation in HSV
    hsv = image.convert('HSV')
    hsv_array = np.array(hsv)
    saturation = np.mean(hsv_array[:, :, 1]) / 255.0
    
    # Sharpness: variance of Laplacian
    laplacian = np.array(image.filter(ImageFilter.FIND_EDGES))
    sharpness = np.var(laplacian) / 10000.0  # normalize
    
    # Colorfulness: based on rg-bg variance
    rg = img_array[:, :, 0] - img_array[:, :, 1]
    yb = (img_array[:, :, 0] + img_array[:, :, 1]) / 2 - img_array[:, :, 2]
    colorfulness = np.sqrt(np.var(rg) + np.var(yb)) + 0.3 * np.sqrt(np.mean(rg)**2 + np.mean(yb)**2)
    colorfulness = min(colorfulness / 100.0, 1.0)  # normalize
    
    # Exposure: check if brightness is in good range
    exposure = 1.0 - abs(lighting - 0.5) * 2  # 1.0 if lighting=0.5, 0 if 0 or 1
    
    return {
        'lighting': round(lighting, 2),
        'contrast': round(contrast, 2),
        'saturation': round(saturation, 2),
        'sharpness': round(sharpness, 2),
        'colorfulness': round(colorfulness, 2),
        'exposure': round(exposure, 2)
    }

def parse_caption(caption):
    if not caption:
        return [], []
    hashtags = re.findall(r'#\w+', caption)
    mentions = re.findall(r'@\w+', caption)
    return hashtags, mentions

def analyze_post(post, is_video=False):
    # Get image URL
    if is_video:
        url = post.get("thumb")
    else:
        url = post.get("src")
    
    if not url:
        return post
    
    image = download_image(url)
    if image is None:
        return post
    
    # Classify category
    category_texts = [f"an image of {cat.lower()}" for cat in categories]
    category_probs = classify_image(image, category_texts)
    top5_cat = torch.topk(category_probs, 5)
    post["categories"] = [{"name": categories[i], "confidence": val.item()} for val, i in zip(top5_cat.values, top5_cat.indices)]
    
    # Classify vibe
    vibe_texts = [f"an image with {vibe.lower()} vibe" for vibe in vibes]
    vibe_probs = classify_image(image, vibe_texts)
    vibe_idx = torch.argmax(vibe_probs).item()
    post["vibe"] = vibes[vibe_idx]
    
    # Classify quality score
    quality_texts = [f"an image with {q.lower()} quality" for q in qualities]
    quality_probs = classify_image(image, quality_texts)
    quality_score = torch.argmax(quality_probs).item()
    
    # Analyze image quality parameters
    quality_category = analyze_quality(image)
    post["quality"] = {"score": quality_score, "category": quality_category}
    
    # Parse caption for hashtags and mentions
    caption = post.get("caption", "")
    post["hashtags"], post["mentions"] = parse_caption(caption)
    
    return post

def main():
    if len(sys.argv) != 2:
        print("Usage: python analyze_posts.py <input_json>")
        sys.exit(1)
    
    input_file = sys.argv[1]
    with open(input_file, 'r') as f:
        data = json.load(f)
    
    # Analyze images
    if "images" in data:
        for post in data["images"]:
            analyze_post(post, is_video=False)
    
    # Analyze videos
    if "videos" in data:
        for post in data["videos"]:
            analyze_post(post, is_video=True)
    
    # Output to stdout
    print(json.dumps(data, indent=2))

if __name__ == "__main__":
    main()
