import { UserProfile, MetricCard, ContentCategory, DemographicData, ContentPost, ReelData, PostAnalytics } from '../types/dashboard';

export const mockUserProfile: UserProfile = {
  name: "Celeste Chen",
  username: "@celeste_journeyes",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  followers: "1.2M",
  following: "533",
  posts: "540",
  isVerified: true
};

export const mockMetrics: MetricCard[] = [
  {
    title: "Engagement Rate",
    value: "4.5%",
    subtitle: "",
    icon: "favorite",
    color: "error"
  },
  {
    title: "Avg. Likes",
    value: "54.2K",
    subtitle: "",
    icon: "favorite",
    color: "error"
  },
  {
    title: "Avg. Comments",
    value: "850",
    subtitle: "",
    icon: "comment",
    color: "info"
  }
];

export const mockContentCategories: ContentCategory[] = [
  { name: "Travel", percentage: 60, color: "#007AFF" },
  { name: "Fashion", percentage: 20, color: "#00FF88" },
  { name: "Food", percentage: 10, color: "#88FF00" },
  { name: "Other", percentage: 10, color: "#FF8800" }
];

export const mockDemographics: DemographicData = {
  gender: {
    female: 62,
    male: 38
  },
  ageGroups: {
    '18-24': 40,
    '25-34': 35,
    '35-44': 20,
    '45+': 5
  },
  locations: {
    spain: 35,
    india: 30,
    chile: 25,
    other: 10
  }
};

export const mockContentPosts: ContentPost[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
    likes: "92K",
    comments: "1.2K",
    title: "Hiking to new heights! 🏔️",
    caption: "Nothing beats the feeling of reaching the summit after hours of hiking. The view from up here is absolutely breathtaking! #hiking #adventure #mountains #nature",
    type: "post",
    timestamp: "2 hours ago",
    keywords: ["hiking", "mountains", "adventure", "nature", "summit"],
    vibe: "energetic",
    quality: {
      lighting: 95,
      visualAppeal: 88,
      consistency: 92
    }
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop",
    likes: "85K",
    comments: "980",
    title: "Golden hour magic ✨",
    caption: "There's something magical about golden hour that makes everything look ethereal. Grateful for moments like these. #goldenhour #nature #peaceful",
    type: "post",
    timestamp: "5 hours ago",
    keywords: ["golden hour", "nature", "peaceful", "landscape", "sunset"],
    vibe: "aesthetic",
    quality: {
      lighting: 98,
      visualAppeal: 95,
      consistency: 89
    }
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=300&fit=crop",
    likes: "78K",
    comments: "850",
    title: "Culinary adventures 🍝",
    caption: "Trying out this amazing pasta recipe I learned in Italy. The flavors are absolutely incredible! #food #cooking #pasta #italian #foodie",
    type: "post",
    timestamp: "1 day ago",
    keywords: ["food", "cooking", "pasta", "italian", "recipe"],
    vibe: "casual",
    quality: {
      lighting: 85,
      visualAppeal: 82,
      consistency: 88
    }
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=300&h=300&fit=crop",
    likes: "95K",
    comments: "1.1K",
    title: "Forest therapy session 🌲",
    caption: "Sometimes you just need to disconnect and reconnect with nature. Forest bathing is real therapy for the soul. #forest #nature #mindfulness #therapy",
    type: "post",
    timestamp: "2 days ago",
    keywords: ["forest", "nature", "mindfulness", "therapy", "trees"],
    vibe: "peaceful",
    quality: {
      lighting: 90,
      visualAppeal: 87,
      consistency: 94
    }
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=300&fit=crop",
    likes: "88K",
    comments: "920",
    title: "Street food discoveries 🌮",
    caption: "Found this hidden gem serving the most authentic tacos in the city! Local food culture is always the best culture. #streetfood #tacos #local #authentic #foodie",
    type: "post",
    timestamp: "3 days ago",
    keywords: ["street food", "tacos", "local", "authentic", "culture"],
    vibe: "casual",
    quality: {
      lighting: 78,
      visualAppeal: 85,
      consistency: 80
    }
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=300&h=300&fit=crop",
    likes: "82K",
    comments: "750",
    title: "Minimalist vibes ⚪",
    caption: "Embracing the beauty of simplicity. Less is more when it comes to creating a peaceful living space. #minimalism #interior #peaceful #simple #design",
    type: "post",
    timestamp: "4 days ago",
    keywords: ["minimalism", "interior", "design", "simple", "peaceful"],
    vibe: "aesthetic",
    quality: {
      lighting: 92,
      visualAppeal: 90,
      consistency: 95
    }
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
    likes: "76K",
    comments: "680",
    title: "Ocean waves therapy 🌊",
    caption: "The sound of waves crashing against the shore is the best meditation. Ocean therapy is real! #ocean #waves #meditation #peaceful #nature",
    type: "post",
    timestamp: "5 days ago",
    keywords: ["ocean", "waves", "meditation", "peaceful", "therapy"],
    vibe: "peaceful",
    quality: {
      lighting: 88,
      visualAppeal: 86,
      consistency: 87
    }
  },
  {
    id: "8",
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=300&h=300&fit=crop",
    likes: "91K",
    comments: "1.0K",
    title: "Urban exploration day 🏙️",
    caption: "Discovering hidden corners of the city that most people never see. Urban exploration is an art form. #urban #exploration #city #architecture #adventure",
    type: "post",
    timestamp: "6 days ago",
    keywords: ["urban", "exploration", "city", "architecture", "street"],
    vibe: "energetic",
    quality: {
      lighting: 84,
      visualAppeal: 89,
      consistency: 86
    }
  },
  {
    id: "9",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=300&fit=crop",
    likes: "87K",
    comments: "890",
    title: "Coffee culture deep dive ☕",
    caption: "Learning about the art of coffee making from local baristas. Every cup tells a story about its origin and process. #coffee #culture #barista #local #craft",
    type: "post",
    timestamp: "1 week ago",
    keywords: ["coffee", "culture", "barista", "craft", "local"],
    vibe: "casual",
    quality: {
      lighting: 86,
      visualAppeal: 84,
      consistency: 88
    }
  },
  {
    id: "10",
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=300&h=300&fit=crop",
    likes: "79K",
    comments: "720",
    title: "Sunset reflections 🌅",
    caption: "Taking a moment to reflect on the day as the sun sets. These quiet moments are so precious. #sunset #reflection #peaceful #mindfulness #gratitude",
    type: "post",
    timestamp: "1 week ago",
    keywords: ["sunset", "reflection", "peaceful", "mindfulness", "gratitude"],
    vibe: "peaceful",
    quality: {
      lighting: 96,
      visualAppeal: 93,
      consistency: 91
    }
  }
];

export const mockReelData: ReelData[] = [
  {
    id: "r1",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop",
    title: "Mountain hiking adventure",
    caption: "Epic day hiking in the mountains! The views were absolutely incredible 🏔️ #hiking #mountains #adventure",
    views: "245K",
    likes: "12.5K",
    comments: "890",
    timestamp: "3 hours ago",
    events: ["person hiking", "mountain landscape", "scenic views"],
    vibe: "adventure",
    tags: ["outdoor", "hiking", "nature", "mountains"]
  },
  {
    id: "r2",
    thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=400&fit=crop",
    title: "Cooking pasta masterclass",
    caption: "Making fresh pasta from scratch! Follow along for the recipe ✨ #cooking #pasta #recipe",
    views: "189K",
    likes: "8.9K",
    comments: "567",
    timestamp: "8 hours ago",
    events: ["person cooking", "food preparation", "kitchen activity"],
    vibe: "educational",
    tags: ["indoor", "cooking", "food", "tutorial"],
    engagementBreakdown: [
      { type: "Likes", count: 8900, color: "#FF1744" },
      { type: "Comments", count: 567, color: "#007AFF" },
      { type: "Shares", count: 1762, color: "#00FF88" },
      { type: "Saves", count: 300, color: "#FF8800" }
    ],
    topComments: [
      { user: "pasta_lover", comment: "This pasta looks delicious!", likes: 48 },
      { user: "home_chef", comment: "Great tutorial, thanks!", likes: 35 },
      { user: "italian_foodie", comment: "Authentic recipe!", likes: 29 }
    ],
    viewsTrend: [
      { time: "0h", views: 0 },
      { time: "1h", views: 38000 },
      { time: "2h", views: 76000 },
      { time: "3h", views: 114000 },
      { time: "4h", views: 142000 },
      { time: "5h", views: 163000 },
      { time: "6h", views: 178000 },
      { time: "7h", views: 189000 }
    ],
    keywords: ["indoor", "cooking", "food", "tutorial"],
    quality: {
      lighting: 88,
      visualAppeal: 85,
      consistency: 90
    }
  },
  {
    id: "r3",
    thumbnail: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=400&fit=crop",
    title: "Golden hour time-lapse",
    caption: "Watch the magic of golden hour unfold in 60 seconds 🌅 #timelapse #goldenhour #nature",
    views: "312K",
    likes: "15.2K",
    comments: "1.1K",
    timestamp: "1 day ago",
    events: ["sunset time-lapse", "landscape", "natural lighting"],
    vibe: "aesthetic",
    tags: ["outdoor", "nature", "sunset", "timelapse"]
  },
  {
    id: "r4",
    thumbnail: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=300&h=400&fit=crop",
    title: "Forest meditation walk",
    caption: "Join me for a peaceful forest walk and meditation 🌲 #meditation #forest #mindfulness",
    views: "156K",
    likes: "7.8K",
    comments: "445",
    timestamp: "2 days ago",
    events: ["person walking", "forest environment", "meditative activity"],
    vibe: "peaceful",
    tags: ["outdoor", "nature", "meditation", "wellness"],
    topComments: [
      { user: "meditation_practitioner", comment: "So peaceful and calming", likes: 36 },
      { user: "forest_lover", comment: "Love walking in forests", likes: 28 },
      { user: "mindfulness_teacher", comment: "Great for meditation", likes: 23 }
    ],
    viewsTrend: [
      { time: "0h", views: 0 },
      { time: "1h", views: 30000 },
      { time: "2h", views: 60000 },
      { time: "3h", views: 90000 },
      { time: "4h", views: 120000 },
      { time: "5h", views: 140000 },
      { time: "6h", views: 150000 },
      { time: "7h", views: 156000 }
    ],
    keywords: ["outdoor", "nature", "meditation", "wellness"],
    quality: {
      lighting: 90,
      visualAppeal: 87,
      consistency: 92
    }
  },
  {
    id: "r5",
    thumbnail: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=300&h=400&fit=crop",
    title: "Room makeover reveal",
    caption: "Minimalist bedroom transformation - before and after! 🏠 #home #minimalism #design",
    views: "278K",
    likes: "13.6K",
    comments: "892",
    timestamp: "3 days ago",
    events: ["interior transformation", "room setup", "design reveal"],
    vibe: "aesthetic",
    tags: ["indoor", "design", "home", "minimalism"]
  }
];

export const mockPostAnalytics: { [key: string]: PostAnalytics } = {
  "1": {
    views: "125K",
    engagementRate: "6.8%",
    timeAgo: "2 hours ago",
    totalEngagements: 8520,
    engagementBreakdown: [
      { type: "Likes", count: 6200, color: "#FF1744" },
      { type: "Comments", count: 1200, color: "#007AFF" },
      { type: "Shares", count: 820, color: "#00FF88" },
      { type: "Saves", count: 300, color: "#FF8800" }
    ],
    viewsTrend: [
      { time: "0h", views: 0 },
      { time: "1h", views: 25000 },
      { time: "2h", views: 50000 },
      { time: "3h", views: 75000 },
      { time: "4h", views: 92000 },
      { time: "5h", views: 105000 },
      { time: "6h", views: 115000 },
      { time: "7h", views: 125000 }
    ],
    topComments: [
      { user: "hiker_jane", comment: "This view is incredible! Where is this?", likes: 45 },
      { user: "mountain_lover", comment: "Perfect timing for this post!", likes: 32 },
      { user: "adventure_seeker", comment: "Adding this to my bucket list!", likes: 28 }
    ],
    keywords: ["hiking", "mountains", "adventure", "nature", "summit"],
    vibe: "energetic",
    quality: {
      lighting: 95,
      visualAppeal: 88,
      consistency: 92
    }
  },
  "2": {
    views: "98K",
    engagementRate: "5.4%",
    timeAgo: "5 hours ago",
    totalEngagements: 5292,
    engagementBreakdown: [
      { type: "Likes", count: 3800, color: "#FF1744" },
      { type: "Comments", count: 892, color: "#007AFF" },
      { type: "Shares", count: 400, color: "#00FF88" },
      { type: "Saves", count: 200, color: "#FF8800" }
    ],
    viewsTrend: [
      { time: "0h", views: 0 },
      { time: "1h", views: 20000 },
      { time: "2h", views: 40000 },
      { time: "3h", views: 60000 },
      { time: "4h", views: 75000 },
      { time: "5h", views: 85000 },
      { time: "6h", views: 92000 },
      { time: "7h", views: 98000 }
    ],
    topComments: [
      { user: "nature_lover", comment: "This golden hour shot is stunning!", likes: 28 },
      { user: "photography_pro", comment: "Perfect composition and lighting", likes: 19 },
      { user: "sunset_chaser", comment: "Where was this taken?", likes: 15 }
    ],
    keywords: ["indoor", "cooking", "food", "tutorial"],
    vibe: "educational",
    quality: {
      lighting: 88,
      visualAppeal: 85,
      consistency: 90
    }
  },
  "3": {
    views: "87K",
    engagementRate: "4.9%",
    timeAgo: "1 day ago",
    totalEngagements: 4263,
    engagementBreakdown: [
      { type: "Likes", count: 3100, color: "#FF1744" },
      { type: "Comments", count: 763, color: "#007AFF" },
      { type: "Shares", count: 300, color: "#00FF88" },
      { type: "Saves", count: 100, color: "#FF8800" }
    ],
    viewsTrend: [
      { time: "0h", views: 0 },
      { time: "1h", views: 18000 },
      { time: "2h", views: 35000 },
      { time: "3h", views: 52000 },
      { time: "4h", views: 65000 },
      { time: "5h", views: 75000 },
      { time: "6h", views: 82000 },
      { time: "7h", views: 87000 }
    ],
    topComments: [
      { user: "foodie_delight", comment: "This pasta looks amazing! Recipe please?", likes: 42 },
      { user: "chef_master", comment: "Perfect plating and colors", likes: 31 },
      { user: "italian_food_lover", comment: "Authentic Italian vibes!", likes: 25 }
    ],
    keywords: ["food", "cooking", "pasta", "italian", "recipe"],
    vibe: "casual",
    quality: {
      lighting: 85,
      visualAppeal: 82,
      consistency: 88
    }
  },
  "4": {
    views: "95K",
    engagementRate: "7.2%",
    timeAgo: "2 days ago",
    totalEngagements: 6840,
    engagementBreakdown: [
      { type: "Likes", count: 4500, color: "#FF1744" },
      { type: "Comments", count: 1340, color: "#007AFF" },
      { type: "Shares", count: 700, color: "#00FF88" },
      { type: "Saves", count: 300, color: "#FF8800" }
    ],
    viewsTrend: [
      { time: "0h", views: 0 },
      { time: "1h", views: 19000 },
      { time: "2h", views: 38000 },
      { time: "3h", views: 57000 },
      { time: "4h", views: 71000 },
      { time: "5h", views: 82000 },
      { time: "6h", views: 89000 },
      { time: "7h", views: 95000 }
    ],
    topComments: [
      { user: "mindful_walker", comment: "Such a serene forest path!", likes: 38 },
      { user: "nature_healer", comment: "Perfect for meditation", likes: 29 },
      { user: "tree_hugger", comment: "I need to visit this place", likes: 22 }
    ],
    keywords: ["forest", "nature", "mindfulness", "therapy", "trees"],
    vibe: "peaceful",
    quality: {
      lighting: 90,
      visualAppeal: 87,
      consistency: 94
    }
  },
  "5": {
    views: "78K",
    engagementRate: "5.1%",
    timeAgo: "3 days ago",
    totalEngagements: 3978,
    engagementBreakdown: [
      { type: "Likes", count: 2800, color: "#FF1744" },
      { type: "Comments", count: 778, color: "#007AFF" },
      { type: "Shares", count: 300, color: "#00FF88" },
      { type: "Saves", count: 100, color: "#FF8800" }
    ],
    viewsTrend: [
      { time: "0h", views: 0 },
      { time: "1h", views: 16000 },
      { time: "2h", views: 32000 },
      { time: "3h", views: 48000 },
      { time: "4h", views: 60000 },
      { time: "5h", views: 69000 },
      { time: "6h", views: 75000 },
      { time: "7h", views: 78000 }
    ],
    topComments: [
      { user: "taco_lover", comment: "Best street tacos I've seen!", likes: 35 },
      { user: "food_traveler", comment: "Authentic Mexican street food", likes: 27 },
      { user: "spicy_food_fan", comment: "Looks so delicious!", likes: 20 }
    ],
    keywords: ["street food", "tacos", "local", "authentic", "culture"],
    vibe: "casual",
    quality: {
      lighting: 78,
      visualAppeal: 85,
      consistency: 80
    }
  },
  "6": {
    views: "92K",
    engagementRate: "6.3%",
    timeAgo: "4 days ago",
    totalEngagements: 5796,
    engagementBreakdown: [
      { type: "Likes", count: 4200, color: "#FF1744" },
      { type: "Comments", count: 996, color: "#007AFF" },
      { type: "Shares", count: 450, color: "#00FF88" },
      { type: "Saves", count: 150, color: "#FF8800" }
    ],
    viewsTrend: [
      { time: "0h", views: 0 },
      { time: "1h", views: 18000 },
      { time: "2h", views: 36000 },
      { time: "3h", views: 54000 },
      { time: "4h", views: 67000 },
      { time: "5h", views: 77000 },
      { time: "6h", views: 85000 },
      { time: "7h", views: 92000 }
    ],
    topComments: [
      { user: "design_lover", comment: "This room is so minimalist and beautiful!", likes: 40 },
      { user: "home_decor_fan", comment: "Perfect color palette", likes: 32 },
      { user: "interior_designer", comment: "Great use of space", likes: 28 }
    ],
    keywords: ["minimalism", "interior", "design", "simple", "peaceful"],
    vibe: "aesthetic",
    quality: {
      lighting: 92,
      visualAppeal: 90,
      consistency: 95
    }
  },
  "7": {
    views: "84K",
    engagementRate: "5.8%",
    timeAgo: "5 days ago",
    totalEngagements: 4872,
    engagementBreakdown: [
      { type: "Likes", count: 3600, color: "#FF1744" },
      { type: "Comments", count: 680, color: "#007AFF" },
      { type: "Shares", count: 442, color: "#00FF88" },
      { type: "Saves", count: 150, color: "#FF8800" }
    ],
    viewsTrend: [
      { time: "0h", views: 0 },
      { time: "1h", views: 17000 },
      { time: "2h", views: 34000 },
      { time: "3h", views: 51000 },
      { time: "4h", views: 63000 },
      { time: "5h", views: 72000 },
      { time: "6h", views: 78000 },
      { time: "7h", views: 84000 }
    ],
    topComments: [
      { user: "wave_watcher", comment: "The sound of waves is so calming", likes: 33 },
      { user: "ocean_lover", comment: "Beautiful ocean view!", likes: 26 },
      { user: "meditation_guru", comment: "Perfect spot for mindfulness", likes: 21 }
    ],
    keywords: ["ocean", "waves", "meditation", "peaceful", "therapy"],
    vibe: "peaceful",
    quality: {
      lighting: 88,
      visualAppeal: 86,
      consistency: 87
    }
  },
  "8": {
    views: "96K",
    engagementRate: "6.5%",
    timeAgo: "6 days ago",
    totalEngagements: 6240,
    engagementBreakdown: [
      { type: "Likes", count: 4550, color: "#FF1744" },
      { type: "Comments", count: 1000, color: "#007AFF" },
      { type: "Shares", count: 490, color: "#00FF88" },
      { type: "Saves", count: 200, color: "#FF8800" }
    ],
    viewsTrend: [
      { time: "0h", views: 0 },
      { time: "1h", views: 19000 },
      { time: "2h", views: 38000 },
      { time: "3h", views: 57000 },
      { time: "4h", views: 71000 },
      { time: "5h", views: 82000 },
      { time: "6h", views: 89000 },
      { time: "7h", views: 96000 }
    ],
    topComments: [
      { user: "city_explorer", comment: "Love this urban architecture!", likes: 37 },
      { user: "street_photographer", comment: "Great composition", likes: 29 },
      { user: "architecture_fan", comment: "Iconic city vibes", likes: 24 }
    ],
    keywords: ["urban", "exploration", "city", "architecture", "street"],
    vibe: "energetic",
    quality: {
      lighting: 84,
      visualAppeal: 89,
      consistency: 86
    }
  },
  "9": {
    views: "81K",
    engagementRate: "5.3%",
    timeAgo: "1 week ago",
    totalEngagements: 4293,
    engagementBreakdown: [
      { type: "Likes", count: 3200, color: "#FF1744" },
      { type: "Comments", count: 890, color: "#007AFF" },
      { type: "Shares", count: 153, color: "#00FF88" },
      { type: "Saves", count: 50, color: "#FF8800" }
    ],
    viewsTrend: [
      { time: "0h", views: 0 },
      { time: "1h", views: 16000 },
      { time: "2h", views: 32000 },
      { time: "3h", views: 48000 },
      { time: "4h", views: 60000 },
      { time: "5h", views: 69000 },
      { time: "6h", views: 75000 },
      { time: "7h", views: 81000 }
    ],
    topComments: [
      { user: "coffee_addict", comment: "This coffee looks perfect!", likes: 30 },
      { user: "barista_life", comment: "Love the latte art", likes: 25 },
      { user: "morning_coffee", comment: "Starting my day right", likes: 18 }
    ],
    keywords: ["coffee", "culture", "barista", "craft", "local"],
    vibe: "casual",
    quality: {
      lighting: 86,
      visualAppeal: 84,
      consistency: 88
    }
  },
  "10": {
    views: "88K",
    engagementRate: "5.9%",
    timeAgo: "1 week ago",
    totalEngagements: 5192,
    engagementBreakdown: [
      { type: "Likes", count: 3950, color: "#FF1744" },
      { type: "Comments", count: 720, color: "#007AFF" },
      { type: "Shares", count: 372, color: "#00FF88" },
      { type: "Saves", count: 150, color: "#FF8800" }
    ],
    viewsTrend: [
      { time: "0h", views: 0 },
      { time: "1h", views: 18000 },
      { time: "2h", views: 36000 },
      { time: "3h", views: 54000 },
      { time: "4h", views: 67000 },
      { time: "5h", views: 77000 },
      { time: "6h", views: 83000 },
      { time: "7h", views: 88000 }
    ],
    topComments: [
      { user: "sunset_lover", comment: "Beautiful reflection in the water", likes: 34 },
      { user: "peaceful_mind", comment: "So calming and serene", likes: 27 },
      { user: "nature_reflection", comment: "Perfect moment of gratitude", likes: 22 }
    ],
    keywords: ["sunset", "reflection", "peaceful", "mindfulness", "gratitude"],
    vibe: "peaceful",
    quality: {
      lighting: 96,
      visualAppeal: 93,
      consistency: 91
    }
  },
  "r1": {
    views: "245K",
    engagementRate: "7.2%",
    timeAgo: "3 hours ago",
    totalEngagements: 17640,
    engagementBreakdown: [
      { type: "Likes", count: 12500, color: "#FF1744" },
      { type: "Comments", count: 890, color: "#007AFF" },
      { type: "Shares", count: 3250, color: "#00FF88" },
      { type: "Saves", count: 1000, color: "#FF8800" }
    ],
    viewsTrend: [
      { time: "0h", views: 0 },
      { time: "1h", views: 50000 },
      { time: "2h", views: 100000 },
      { time: "3h", views: 150000 },
      { time: "4h", views: 185000 },
      { time: "5h", views: 210000 },
      { time: "6h", views: 230000 },
      { time: "7h", views: 245000 }
    ],
    topComments: [
      { user: "hiking_enthusiast", comment: "Amazing mountain views!", likes: 55 },
      { user: "outdoor_adventurer", comment: "This hike looks epic!", likes: 42 },
      { user: "nature_walker", comment: "Can't wait to try this trail", likes: 38 }
    ],
    keywords: ["outdoor", "hiking", "nature", "mountains"],
    vibe: "adventure",
    quality: {
      lighting: 92,
      visualAppeal: 89,
      consistency: 87
    }
  },
  "r2": {
    views: "189K",
    engagementRate: "6.1%",
    timeAgo: "8 hours ago",
    totalEngagements: 11529,
    engagementBreakdown: [
      { type: "Likes", count: 8900, color: "#FF1744" },
      { type: "Comments", count: 567, color: "#007AFF" },
      { type: "Shares", count: 1762, color: "#00FF88" },
      { type: "Saves", count: 300, color: "#FF8800" }
    ],
    viewsTrend: [
      { time: "0h", views: 0 },
      { time: "1h", views: 38000 },
      { time: "2h", views: 76000 },
      { time: "3h", views: 114000 },
      { time: "4h", views: 142000 },
      { time: "5h", views: 163000 },
      { time: "6h", views: 178000 },
      { time: "7h", views: 189000 }
    ],
    topComments: [
      { user: "pasta_lover", comment: "This pasta looks delicious!", likes: 48 },
      { user: "home_chef", comment: "Great tutorial, thanks!", likes: 35 },
      { user: "italian_foodie", comment: "Authentic recipe!", likes: 29 }
    ],
    keywords: ["indoor", "cooking", "food", "tutorial"],
    vibe: "educational",
    quality: {
      lighting: 88,
      visualAppeal: 85,
      consistency: 90
    }
  },
  "r3": {
    views: "312K",
    engagementRate: "6.8%",
    timeAgo: "1 day ago",
    totalEngagements: 21216,
    engagementBreakdown: [
      { type: "Likes", count: 15200, color: "#FF1744" },
      { type: "Comments", count: 1100, color: "#007AFF" },
      { type: "Shares", count: 4416, color: "#00FF88" },
      { type: "Saves", count: 500, color: "#FF8800" }
    ],
    viewsTrend: [
      { time: "0h", views: 0 },
      { time: "1h", views: 62000 },
      { time: "2h", views: 124000 },
      { time: "3h", views: 186000 },
      { time: "4h", views: 230000 },
      { time: "5h", views: 264000 },
      { time: "6h", views: 290000 },
      { time: "7h", views: 312000 }
    ],
    topComments: [
      { user: "timelapse_fan", comment: "This golden hour is magical!", likes: 62 },
      { user: "nature_videographer", comment: "Beautiful editing!", likes: 49 },
      { user: "sunset_watcher", comment: "Perfect timing", likes: 41 }
    ],
    keywords: ["outdoor", "nature", "sunset", "timelapse"],
    vibe: "aesthetic",
    quality: {
      lighting: 98,
      visualAppeal: 95,
      consistency: 93
    }
  },
  "r4": {
    views: "156K",
    engagementRate: "5.9%",
    timeAgo: "2 days ago",
    totalEngagements: 9216,
    engagementBreakdown: [
      { type: "Likes", count: 7800, color: "#FF1744" },
      { type: "Comments", count: 445, color: "#007AFF" },
      { type: "Shares", count: 871, color: "#00FF88" },
      { type: "Saves", count: 100, color: "#FF8800" }
    ],
    topComments: [
      { user: "meditation_practitioner", comment: "So peaceful and calming", likes: 36 },
      { user: "forest_lover", comment: "Love walking in forests", likes: 28 },
      { user: "mindfulness_teacher", comment: "Great for meditation", likes: 23 }
    ],
    viewsTrend: [
      { time: "0h", views: 0 },
      { time: "1h", views: 30000 },
      { time: "2h", views: 60000 },
      { time: "3h", views: 90000 },
      { time: "4h", views: 120000 },
      { time: "5h", views: 140000 },
      { time: "6h", views: 150000 },
      { time: "7h", views: 156000 }
    ],
    keywords: ["outdoor", "nature", "meditation", "wellness"],
    vibe: "peaceful",
    quality: {
      lighting: 90,
      visualAppeal: 87,
      consistency: 92
    }
  },
  "r5": {
    views: "278K",
    engagementRate: "6.5%",
    timeAgo: "3 days ago",
    totalEngagements: 18070,
    engagementBreakdown: [
      { type: "Likes", count: 13600, color: "#FF1744" },
      { type: "Comments", count: 892, color: "#007AFF" },
      { type: "Shares", count: 3078, color: "#00FF88" },
      { type: "Saves", count: 500, color: "#FF8800" }
    ],
    viewsTrend: [
      { time: "0h", views: 0 },
      { time: "1h", views: 56000 },
      { time: "2h", views: 112000 },
      { time: "3h", views: 168000 },
      { time: "4h", views: 208000 },
      { time: "5h", views: 238000 },
      { time: "6h", views: 260000 },
      { time: "7h", views: 278000 }
    ],
    topComments: [
      { user: "home_design_fan", comment: "This room transformation is amazing!", likes: 58 },
      { user: "minimalist_life", comment: "Love the minimalist style", likes: 45 },
      { user: "interior_decorator", comment: "Great before and after!", likes: 39 }
    ],
    keywords: ["indoor", "design", "home", "minimalism"],
    vibe: "aesthetic",
    quality: {
      lighting: 94,
      visualAppeal: 91,
      consistency: 96
    }
  }
};