# Instalytics

Instagram Analytics Dashboard

## Description

Instalytics is a comprehensive analytics tool for Instagram profiles, providing deep insights into user metrics, post performance, content analysis, and engagement trends using AI-powered techniques. It scrapes real-time data from Instagram and analyzes posts/reels to deliver actionable insights for content creators and marketers.

## Features

I'm proud of the comprehensive feature set I implemented in Instalytics, designed to give users a complete picture of their Instagram presence. From basic profile metrics to advanced AI-driven content analysis, each feature was carefully crafted to provide valuable insights for content creators and marketers.

- **User Profile Analytics**: Followers, following, posts count, verification status
- **Post & Reel Analytics**: Engagement metrics (likes, comments, views), timestamps, captions
- **Content Analysis**: AI-powered categorization, vibe detection, quality assessment
- **Engagement Metrics**: Average likes/comments, engagement rates
- **Real-time Scraping**: Fresh data from Instagram with caching
- **Interactive Dashboard**: Modern UI with charts and visualizations

## Tech Stack

- **Frontend**: React, TypeScript, Material-UI, Recharts for data visualization
- **Backend API**: Node.js, Express.js, SQLite database
- **Scraping Engine**: Python with httpx library for HTTP requests
- **AI/ML Analysis**: Python-based CLIP model for image classification and PIL for image quality analysis

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- Python 3.8+
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd instalytics
   ```

2. **Setup Python Backend (Scraping & Analysis):**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
   - Ensure `useragents.txt` contains a list of user agent strings (one per line) for rotation
   - Place your Instagram session cookies in `cookies.json` for authenticated scraping (optional but recommended)
   - This enables bypassing rate limits and accessing more data

3. **Setup Node.js API Server:**
   ```bash
   cd ../backend-api
   npm install
   ```

4. **Setup React Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

1. **Instagram Authentication: (optional)**
   - Login to Instagram in a browser
   - Extract cookies and save as `backend/cookies.json`
   - This provides authenticated access for scraping

2. **Database:**
   - SQLite database (`instalytics.db`) is created automatically on first run
   - Contains tables for users, posts, reels, and metrics

### Running the Application

1. **Start the API Server:**
   ```bash
   cd backend-api
   npm start
   ```
   Server runs on http://localhost:3001

2. **Start the Frontend:**
   ```bash
   cd frontend
   npm start
   ```
   App accessible at http://localhost:3000

3. **Access the Dashboard:**
   - Open http://localhost:3000 in your browser
   - Enter an Instagram username to start analyzing

## Scraping Technique & Rate Limit Bypass

One of the biggest challenges I faced was dealing with Instagram's aggressive rate limiting and anti-bot measures. I developed a robust scraping system that combines multiple techniques to reliably collect data while respecting the platform's constraints.

Instagram implements strict rate limiting and anti-bot measures. Instalytics employs several techniques to ensure reliable data collection:

### Authentication & Session Management
- **Cookie-based Authentication**: Uses real browser session cookies stored in `backend/cookies.json` to authenticate requests
- **Session Persistence**: Maintains login state across scraping sessions via cookies
- **User Agent Rotation**: Cycles through realistic user agents loaded from `backend/useragents.txt` to avoid fingerprinting

### Rate Limit Mitigation
- **Request Throttling**: Implements random delays with exponential backoff (starting at 1 second, doubling each retry) between failed requests
- **Retry Logic**: Automatically retries failed requests up to 3 times with increasing delays
- **Error Handling**: Graceful handling of HTTP errors, timeouts, and JSON parsing failures

### Data Collection Strategy
- **API Endpoint**: Uses Instagram's internal web API endpoint (`https://i.instagram.com/api/v1/users/web_profile_info/`) with `x-ig-app-id` header
- **Incremental Updates**: Only fetches new posts/reels since last scrape by comparing IDs
- **Metadata First**: Collects post metadata before full content analysis
- **Caching Layer**: Stores results in SQLite to minimize redundant requests

The scraper (`tut2.py`) uses the httpx library for HTTP requests and jmespath for parsing the complex JSON response into structured data.

### Limitations
- **Follower Lists**: Full follower/following lists are not scraped due to Instagram API restrictions on public access. Only aggregate counts are available.
- **Private Profiles**: Cannot access private profiles without authentication and following approval.
- **Age Demographics**: Age group data is not available via the public API.
- **Real-time Data**: Data may be cached by Instagram and not instantly updated.
- **Rate Limits**: Despite mitigation techniques, excessive requests may still trigger temporary blocks.

## Post Analysis Pipeline

I'm particularly excited about the AI-powered analysis pipeline I built, which transforms raw Instagram data into rich, actionable insights. Using state-of-the-art machine learning models, I created a system that can understand and categorize content in ways that go far beyond simple metrics.

Posts and reels undergo AI-powered analysis using the `analyze_posts.py` script to extract meaningful insights:

### 1. Content Categorization
- **CLIP Model Classification**: Uses OpenAI's CLIP (Contrastive Language-Image Pretraining) model to classify images against 100+ predefined categories (travel, fashion, food, etc.)
- **Top-5 Categories**: Returns the 5 most likely categories with confidence scores
- **Text Prompts**: Generates prompts like "an image of beach travel" for classification

### 2. Vibe Detection
- **Emotional Classification**: Classifies content vibe from 10 predefined options (Peaceful, Aesthetic, Energetic, etc.)
- **Single Label**: Selects the most probable vibe using CLIP model
- **Visual Analysis**: Based on image features learned by the CLIP model

### 3. Image Quality Assessment
- **Technical Metrics**: Evaluates 6 quality parameters using PIL library:
  - **Lighting**: Average brightness (0-1 scale)
  - **Contrast**: Standard deviation of grayscale values
  - **Saturation**: Average saturation in HSV color space
  - **Sharpness**: Variance of edge detection (Laplacian filter)
  - **Colorfulness**: RG-BG color variance calculation
  - **Exposure**: Deviation from optimal brightness (0.5)
- **Composite Scoring**: Provides overall quality score (0-2) based on CLIP classification against quality levels
- **Normalized Values**: All metrics scaled to 0-1 range for consistency

### 4. Text Analysis
- **Hashtag Extraction**: Uses regex to find all `#hashtag` patterns in captions
- **Mention Detection**: Uses regex to find all `@username` patterns in captions
- **Caption Parsing**: Processes post captions for social features

### 5. Data Processing
- **Image Download**: Downloads images/videos thumbnails using requests library with 10-second timeout
- **Batch Processing**: Analyzes all posts in the input JSON file
- **Output Enrichment**: Adds analysis fields to existing post data structure

### Limitations
- **Image Download Failures**: Posts with broken/missing images are skipped
- **Model Accuracy**: CLIP classification accuracy depends on training data and may not be perfect
- **Computational Cost**: Analysis requires GPU for faster processing; CPU-only may be slow
- **Caption Dependency**: Hashtag/mention analysis relies on caption text availability
- **Video Analysis**: Only analyzes video thumbnails, not full video content
- **No Engagement Prediction**: Does not predict future engagement or provide optimization suggestions
- **No Trend Analysis**: Does not analyze historical performance patterns

## Script Details

The core of Instalytics lies in its two main Python scripts, which I wrote from scratch to handle the complex tasks of data collection and analysis. These scripts represent the technical heart of the project, combining web scraping techniques with AI-powered content analysis.

### tut2.py (Scraping Script)
- **Purpose**: Scrapes Instagram user profile data including posts and reels
- **Input**: Instagram username, optional cookies file, output options
- **Process**:
  1. Loads cookies and user agents from files
  2. Makes authenticated HTTP request to Instagram's internal API
  3. Parses JSON response using jmespath queries to extract structured data
  4. Handles retries with exponential backoff on failures
  5. Outputs parsed data as JSON
- **Key Features**: Cookie authentication, user agent rotation, error handling
- **Output**: Structured JSON with user info, posts, reels, and metadata

### analyze_posts.py (Analysis Script)
- **Purpose**: Analyzes scraped posts/reels for content insights
- **Input**: JSON file containing scraped post data
- **Process**:
  1. Downloads post images/thumbnails
  2. Uses CLIP model for category and vibe classification
  3. Analyzes image quality metrics with PIL
  4. Parses captions for hashtags and mentions
  5. Enriches post data with analysis results
- **Key Features**: AI-powered classification, quality assessment, text parsing
- **Output**: Enhanced JSON with analysis fields added to each post

## Architecture Overview

I designed the architecture of Instalytics to be modular and scalable, separating concerns between the frontend, backend API, and data processing layers. This approach allows for easy maintenance and future enhancements while ensuring efficient data flow throughout the system.

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend│◄──►│  Express API    │◄──►│  Python Scraper │
│   (Port 3000)   │    │  (Port 3001)    │    │   & Analyzer    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   SQLite DB     │
                       │ (instalytics.db)│
                       └─────────────────┘
```

- **Frontend**: Single-page React application with Material-UI components
- **API Layer**: RESTful endpoints for data retrieval and caching
- **Scraping Layer**: Python scripts for Instagram data collection
- **Database**: SQLite for persistent storage and caching

## API Endpoints

- `GET /api/user/:username` - User profile data
- `GET /api/posts/:username` - Posts and reels with analysis
- `GET /api/metrics/:username` - Engagement metrics
- `GET /api/avatar?url=` - Image proxy for Instagram content

## Database Schema

- **users**: Profile information and basic stats
- **posts**: Individual post data with analysis results
- **reels**: Video content analytics
- **metrics**: Aggregated engagement statistics

## Limitations

While building Instalytics, I encountered several technical and platform-imposed limitations that shaped the project's scope and capabilities. I'm transparent about these constraints to set realistic expectations for users and guide future development.

### Data Access Limitations
- **Public API Only**: Relies on Instagram's unofficial web API, which may change without notice
- **No Private Profiles**: Cannot access private accounts without proper authentication
- **Limited Follower Data**: Cannot retrieve individual follower lists due to API restrictions
- **No Age Demographics**: Age group data is not exposed by Instagram's public API
- **Geographic Restrictions**: May not work in regions where Instagram blocks certain IPs

### Analysis Limitations
- **Image-Only Analysis**: Video content analysis is limited to thumbnails only
- **Caption Dependency**: Hashtag and mention analysis requires captions to be present
- **Model Accuracy**: CLIP classification may have errors, especially for niche or ambiguous content
- **Computational Requirements**: Analysis requires significant CPU/GPU resources for large profiles

### Technical Limitations
- **Rate Limiting**: Despite mitigation, excessive use may trigger Instagram blocks
- **Data Freshness**: Instagram caches data, so real-time updates may be delayed
- **Error Handling**: Network issues or API changes can cause scraping failures
- **Storage Limits**: SQLite may not scale well for very large datasets

### Legal & Ethical Considerations
- **Terms of Service**: This tool may violate Instagram's Terms of Service
- **Rate Respect**: Always respect rate limits to avoid account/IP bans
- **Data Privacy**: Only analyze public data and respect user privacy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Troubleshooting

### Common Issues

1. **Scraping Fails**: Check `cookies.json` is valid and up-to-date
2. **Analysis Errors**: Ensure Python dependencies are installed
3. **Database Issues**: Delete `instalytics.db` to reset (data will be re-scraped)

### Logs
- Check `backend/logs/` for scraping logs
- API server logs appear in terminal

## License

This project is for educational purposes, made as a part of Internship requirements, Not to be used outside of assesmneet purposes. Respect Instagram's Terms of Service and use responsibly.