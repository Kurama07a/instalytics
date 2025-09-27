export interface UserProfile {
  name: string;
  username: string;
  avatar: string;
  followers: string;
  following: string;
  posts: string;
  isVerified: boolean;
}

export interface MetricCard {
  title: string;
  value: string;
  subtitle: string;
  icon: 'favorite' | 'comment';
  color: 'error' | 'info';
}

export interface ContentCategory {
  name: string;
  percentage: number;
  color: string;
}

export interface DemographicData {
  gender: {
    female: number;
    male: number;
  };
  ageGroups: {
    '18-24': number;
    '25-34': number;
    '35-44': number;
    '45+': number;
  };
  locations: {
    spain: number;
    india: number;
    chile: number;
    other: number;
  };
}

export interface ContentPost {
  id: string;
  image: string;
  likes: string;
  comments: string;
  title: string;
  caption: string;
  type: 'post';
  timestamp: string;
  keywords: string[];
  vibe: string;
  quality: {
    lighting: number;
    visualAppeal: number;
    consistency: number;
  };
}

export interface ReelData {
  id: string;
  thumbnail: string;
  title: string;
  caption: string;
  views: string;
  likes: string;
  comments: string;
  timestamp: string;
  events: string[];
  vibe: string;
  tags: string[];
  engagementBreakdown?: {};
  topComments?: {};
  viewsTrend?: {};
  keywords?: {};
quality? : {};
}

export interface PostAnalytics {
  views: string;
  engagementRate: string;
  timeAgo: string;
  totalEngagements: number;
  engagementBreakdown: {
    type: string;
    count: number;
    color: string;
  }[];
  viewsTrend: {
    time: string;
    views: number;
  }[];
  topComments: {
    user: string;
    comment: string;
    likes: number;
  }[];
  keywords: string[];
  vibe: string;
  quality: {
    lighting: number;
    visualAppeal: number;
    consistency: number;
  };
}