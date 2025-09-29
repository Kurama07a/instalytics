const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const https = require('https');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3001;

const db = new sqlite3.Database(path.join(__dirname, 'instalytics.db'));

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    username TEXT PRIMARY KEY,
    name TEXT,
    avatar TEXT,
    followers TEXT,
    following TEXT,
    posts TEXT,
    is_verified INTEGER,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    username TEXT,
    image TEXT,
    likes TEXT,
    comments TEXT,
    title TEXT,
    caption TEXT,
    type TEXT,
    timestamp TEXT,
    keywords TEXT,
    vibe TEXT,
    categories TEXT,
    quality TEXT,
    hashtags TEXT,
    mentions TEXT,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (username) REFERENCES users (username)
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS reels (
    id TEXT PRIMARY KEY,
    username TEXT,
    thumbnail TEXT,
    video_src TEXT,
    title TEXT,
    caption TEXT,
    views TEXT,
    likes TEXT,
    comments TEXT,
    timestamp TEXT,
    events TEXT,
    vibe TEXT,
    tags TEXT,
    categories TEXT,
    quality TEXT,
    hashtags TEXT,
    mentions TEXT,
    engagement_breakdown TEXT,
    top_comments TEXT,
    views_trend TEXT,
    keywords TEXT,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (username) REFERENCES users (username)
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS metrics (
    username TEXT PRIMARY KEY,
    engagement_rate TEXT,
    avg_likes TEXT,
    avg_comments TEXT,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (username) REFERENCES users (username)
  )`);
});

function abbreviateNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    } else {
        return num.toString();
    }
}

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.get('/api/user/:username', (req, res) => {
    const username = req.params.username;
    const refresh = req.query.refresh === 'true';

    if (refresh) {
        // Always fetch
        // Path to the Python script
        const scriptPath = path.join(__dirname, '..', 'backend', 'tut2.py');
        const cookiesPath = path.join(__dirname, '..', 'backend', 'cookies.json');

        // Build arguments
        const args = [scriptPath, username, '--no-pretty'];
        if (fs.existsSync(cookiesPath)) {
            args.push('--cookies-file', cookiesPath);
        }

        // Run the Python script with the username
        const python = spawn('python3', args, { cwd: path.join(__dirname, '..') });

        let data = '';
        let errorData = '';

        python.stdout.on('data', (chunk) => {
            data += chunk;
        });

        python.stderr.on('data', (chunk) => {
            errorData += chunk;
        });

        python.on('close', (code) => {
            if (code === 0) {
                try {
                    const result = JSON.parse(data);
                    // Map to frontend expected format
                    const userProfile = {
                        name: result.name || '',
                        username: result.username || '',
                        avatar: result.profile_image || '',
                        followers: abbreviateNumber(result.followers || 0),
                        following: abbreviateNumber(result.follows || 0),
                        posts: abbreviateNumber(result.image_count || 0),
                        isVerified: result.is_verified || false
                    };
                    // Store in DB
                    db.run("INSERT OR REPLACE INTO users (username, name, avatar, followers, following, posts, is_verified) VALUES (?, ?, ?, ?, ?, ?, ?)", 
                        [username, userProfile.name, userProfile.avatar, userProfile.followers, userProfile.following, userProfile.posts, userProfile.isVerified ? 1 : 0], 
                        (err) => {
                            if (err) console.error('DB insert error:', err);
                        });
                    res.json(userProfile);
                } catch (e) {
                    console.error('Failed to parse JSON:', e);
                    res.status(500).json({ error: 'Failed to parse data' });
                }
            } else {
                console.error('Python script failed:', errorData);
                res.status(500).json({ error: 'Scraping failed', details: errorData });
            }
        });
    } else {
        db.get("SELECT name, avatar, followers, following, posts, is_verified FROM users WHERE username = ?", [username], (err, row) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'DB error' });
                return;
            }
            if (row) {
                const userProfile = {
                    name: row.name,
                    username: username,
                    avatar: row.avatar,
                    followers: row.followers,
                    following: row.following,
                    posts: row.posts,
                    isVerified: row.is_verified ? true : false
                };
                res.json(userProfile);
            } else {
                // Fetch and store
                // Same as above
                const scriptPath = path.join(__dirname, '..', 'backend', 'tut2.py');
                const cookiesPath = path.join(__dirname, '..', 'backend', 'cookies.json');

                const args = [scriptPath, username, '--no-pretty'];
                if (fs.existsSync(cookiesPath)) {
                    args.push('--cookies-file', cookiesPath);
                }

                const python = spawn('python3', args, { cwd: path.join(__dirname, '..') });

                let data = '';
                let errorData = '';

                python.stdout.on('data', (chunk) => {
                    data += chunk;
                });

                python.stderr.on('data', (chunk) => {
                    errorData += chunk;
                });

                python.on('close', (code) => {
                    if (code === 0) {
                        try {
                            const result = JSON.parse(data);
                            const userProfile = {
                                name: result.name || '',
                                username: result.username || '',
                                avatar: result.profile_image || '',
                                followers: abbreviateNumber(result.followers || 0),
                                following: abbreviateNumber(result.follows || 0),
                                posts: abbreviateNumber(result.image_count || 0),
                                isVerified: result.is_verified || false
                            };
                            db.run("INSERT OR REPLACE INTO users (username, name, avatar, followers, following, posts, is_verified) VALUES (?, ?, ?, ?, ?, ?, ?)", 
                                [username, userProfile.name, userProfile.avatar, userProfile.followers, userProfile.following, userProfile.posts, userProfile.isVerified ? 1 : 0], 
                                (err) => {
                                    if (err) console.error('DB insert error:', err);
                                });
                            res.json(userProfile);
                        } catch (e) {
                            console.error('Failed to parse JSON:', e);
                            res.status(500).json({ error: 'Failed to parse data' });
                        }
                    } else {
                        console.error('Python script failed:', errorData);
                        res.status(500).json({ error: 'Scraping failed', details: errorData });
                    }
                });
            }
        });
    }
});

app.get('/api/posts/:username', (req, res) => {
    const username = req.params.username;
    const refresh = req.query.refresh === 'true';

    if (refresh) {
        // Always fetch and analyze incrementally
        // First, get existing post IDs
        db.all("SELECT id FROM posts WHERE username = ?", [username], (err, existingPosts) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'DB error' });
                return;
            }
            const existingIds = new Set(existingPosts.map(p => p.id));

            // Path to the Python script
            const scriptPath = path.join(__dirname, '..', 'backend', 'tut2.py');
            const cookiesPath = path.join(__dirname, '..', 'backend', 'cookies.json');

            // Build arguments
            const args = [scriptPath, username, '--no-pretty'];
            if (fs.existsSync(cookiesPath)) {
                args.push('--cookies-file', cookiesPath);
            }

            // Run the Python script with the username
            const python = spawn('python3', args, { cwd: path.join(__dirname, '..') });

            let data = '';
            let errorData = '';

            python.stdout.on('data', (chunk) => {
                data += chunk;
            });

            python.stderr.on('data', (chunk) => {
                errorData += chunk;
            });

            python.on('close', (code) => {
                if (code === 0) {
                    try {
                        const result = JSON.parse(data);
                        // Filter to new posts
                        const newImages = result.images.filter(img => !existingIds.has(img.id));
                        const newVideos = result.videos.filter(vid => !existingIds.has(vid.id));
                        const newResult = { ...result, images: newImages, videos: newVideos };

                        // Write to temp file for analysis
                        const tempFile = path.join(__dirname, 'temp.json');
                        fs.writeFileSync(tempFile, JSON.stringify(newResult));
                        
                        // Run analyze_posts.py
                        const analyzePath = path.join(__dirname, '..', 'backend', 'analyze_posts.py');
                        const analyze = spawn('python3', [analyzePath, tempFile], { cwd: path.join(__dirname, '..') });
                        
                        let analyzedData = '';
                        let analyzeErrorData = '';
                        
                        analyze.stdout.on('data', (chunk) => {
                            analyzedData += chunk;
                        });
                        
                        analyze.stderr.on('data', (chunk) => {
                            analyzeErrorData += chunk;
                        });
                        
                        analyze.on('close', (analyzeCode) => {
                            fs.unlinkSync(tempFile); // Clean up temp file
                            if (analyzeCode === 0) {
                                try {
                                    const analyzedResult = JSON.parse(analyzedData);
                                    // Map new posts
                                    const newPosts = (analyzedResult.images || []).map((img, index) => ({
                                        id: img.id || `post-${Date.now()}-${index}`,
                                        image: `http://localhost:3001/api/avatar?url=${encodeURIComponent(img.src)}`,
                                        likes: abbreviateNumber(img.likes || 0),
                                        comments: abbreviateNumber(img.comments_count || 0),
                                        title: img.title || '',
                                        caption: img.captions ? img.captions.join(' ') : '',
                                        type: 'post',
                                        timestamp: img.taken_at ? new Date(img.taken_at * 1000).toISOString() : '',
                                        keywords: [],
                                        vibe: img.vibe || 'Unknown',
                                        categories: img.categories || [],
                                        quality: img.quality || { score: 0, category: { lighting: 0, contrast: 0, saturation: 0, sharpness: 0, colorfulness: 0, exposure: 0 } },
                                        hashtags: img.hashtags || [],
                                        mentions: img.mentions || []
                                    }));
                                    const newReels = (analyzedResult.videos || []).map((vid, index) => ({
                                        id: vid.id || `reel-${Date.now()}-${index}`,
                                        thumbnail: `http://localhost:3001/api/avatar?url=${encodeURIComponent(vid.thumb)}`,
                                        videoSrc: vid.url || undefined,
                                        title: vid.title || '',
                                        caption: vid.captions ? vid.captions.join(' ') : '',
                                        views: abbreviateNumber(vid.views || 0),
                                        likes: abbreviateNumber(vid.likes || 0),
                                        comments: abbreviateNumber(vid.comments_count || 0),
                                        timestamp: vid.taken_at ? new Date(vid.taken_at * 1000).toISOString() : '',
                                        events: [],
                                        vibe: vid.vibe || 'Unknown',
                                        tags: [],
                                        categories: vid.categories || [],
                                        quality: vid.quality || { score: 0, category: { lighting: 0, contrast: 0, saturation: 0, sharpness: 0, colorfulness: 0, exposure: 0 } },
                                        hashtags: vid.hashtags || [],
                                        mentions: vid.mentions || [],
                                        engagementBreakdown: {},
                                        topComments: {},
                                        viewsTrend: {},
                                        keywords: {}
                                    }));

                                    // Insert new posts and reels
                                    const stmtPosts = db.prepare("INSERT OR REPLACE INTO posts (id, username, image, likes, comments, title, caption, type, timestamp, keywords, vibe, categories, quality, hashtags, mentions) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                                    newPosts.forEach(post => {
                                        stmtPosts.run(post.id, username, post.image, post.likes, post.comments, post.title, post.caption, post.type, post.timestamp, JSON.stringify(post.keywords), post.vibe, JSON.stringify(post.categories), JSON.stringify(post.quality), JSON.stringify(post.hashtags), JSON.stringify(post.mentions));
                                    });
                                    stmtPosts.finalize();

                                    const stmtReels = db.prepare("INSERT OR REPLACE INTO reels (id, username, thumbnail, video_src, title, caption, views, likes, comments, timestamp, events, vibe, tags, categories, quality, hashtags, mentions, engagement_breakdown, top_comments, views_trend, keywords) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                                    newReels.forEach(reel => {
                                        stmtReels.run(reel.id, username, reel.thumbnail, reel.videoSrc, reel.title, reel.caption, reel.views, reel.likes, reel.comments, reel.timestamp, JSON.stringify(reel.events), reel.vibe, JSON.stringify(reel.tags), JSON.stringify(reel.categories), JSON.stringify(reel.quality), JSON.stringify(reel.hashtags), JSON.stringify(reel.mentions), JSON.stringify(reel.engagementBreakdown), JSON.stringify(reel.topComments), JSON.stringify(reel.viewsTrend), JSON.stringify(reel.keywords));
                                    });
                                    stmtReels.finalize();

                                    // Now return all posts and reels
                                    db.all("SELECT * FROM posts WHERE username = ?", [username], (err, postsRows) => {
                                        if (err) {
                                            console.error(err);
                                            res.status(500).json({ error: 'DB error' });
                                            return;
                                        }
                                        db.all("SELECT * FROM reels WHERE username = ?", [username], (err, reelsRows) => {
                                            if (err) {
                                                console.error(err);
                                                res.status(500).json({ error: 'DB error' });
                                                return;
                                            }
                                            const posts = postsRows.map(row => ({
                                                id: row.id,
                                                image: row.image,
                                                likes: row.likes,
                                                comments: row.comments,
                                                title: row.title,
                                                caption: row.caption,
                                                type: row.type,
                                                timestamp: row.timestamp,
                                                keywords: JSON.parse(row.keywords || '[]'),
                                                vibe: row.vibe,
                                                categories: JSON.parse(row.categories || '[]'),
                                                quality: JSON.parse(row.quality || '{}'),
                                                hashtags: JSON.parse(row.hashtags || '[]'),
                                                mentions: JSON.parse(row.mentions || '[]')
                                            }));
                                            const reels = reelsRows.map(row => ({
                                                id: row.id,
                                                thumbnail: row.thumbnail,
                                                videoSrc: row.video_src,
                                                title: row.title,
                                                caption: row.caption,
                                                views: row.views,
                                                likes: row.likes,
                                                comments: row.comments,
                                                timestamp: row.timestamp,
                                                events: JSON.parse(row.events || '[]'),
                                                vibe: row.vibe,
                                                tags: JSON.parse(row.tags || '[]'),
                                                categories: JSON.parse(row.categories || '[]'),
                                                quality: JSON.parse(row.quality || '{}'),
                                                hashtags: JSON.parse(row.hashtags || '[]'),
                                                mentions: JSON.parse(row.mentions || '[]'),
                                                engagementBreakdown: JSON.parse(row.engagement_breakdown || '{}'),
                                                topComments: JSON.parse(row.top_comments || '{}'),
                                                viewsTrend: JSON.parse(row.views_trend || '{}'),
                                                keywords: JSON.parse(row.keywords || '{}')
                                            }));
                                            res.json({ posts, reels });
                                        });
                                    });
                                } catch (e) {
                                    console.error('Failed to parse analyzed JSON:', e);
                                    res.status(500).json({ error: 'Failed to parse analyzed data' });
                                }
                            } else {
                                console.error('Analyze script failed:', analyzeErrorData);
                                res.status(500).json({ error: 'Analysis failed', details: analyzeErrorData });
                            }
                        });
                    } catch (e) {
                        console.error('Failed to parse JSON:', e);
                        res.status(500).json({ error: 'Failed to parse data' });
                    }
                } else {
                    console.error('Python script failed:', errorData);
                    res.status(500).json({ error: 'Scraping failed', details: errorData });
                }
            });
        });
    } else {
        // Normal cached logic
        db.get("SELECT COUNT(*) as count FROM posts WHERE username = ?", [username], (err, row) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'DB error' });
                return;
            }
            if (row.count > 0) {
                // Fetch posts
                db.all("SELECT * FROM posts WHERE username = ?", [username], (err, postsRows) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ error: 'DB error' });
                        return;
                    }
                    // Fetch reels
                    db.all("SELECT * FROM reels WHERE username = ?", [username], (err, reelsRows) => {
                        if (err) {
                            console.error(err);
                            res.status(500).json({ error: 'DB error' });
                            return;
                        }
                        const posts = postsRows.map(row => ({
                            id: row.id,
                            image: row.image,
                            likes: row.likes,
                            comments: row.comments,
                            title: row.title,
                            caption: row.caption,
                            type: row.type,
                            timestamp: row.timestamp,
                            keywords: JSON.parse(row.keywords || '[]'),
                            vibe: row.vibe,
                            categories: JSON.parse(row.categories || '[]'),
                            quality: JSON.parse(row.quality || '{}'),
                            hashtags: JSON.parse(row.hashtags || '[]'),
                            mentions: JSON.parse(row.mentions || '[]')
                        }));
                        const reels = reelsRows.map(row => ({
                            id: row.id,
                            thumbnail: row.thumbnail,
                            videoSrc: row.video_src,
                            title: row.title,
                            caption: row.caption,
                            views: row.views,
                            likes: row.likes,
                            comments: row.comments,
                            timestamp: row.timestamp,
                            events: JSON.parse(row.events || '[]'),
                            vibe: row.vibe,
                            tags: JSON.parse(row.tags || '[]'),
                            categories: JSON.parse(row.categories || '[]'),
                            quality: JSON.parse(row.quality || '{}'),
                            hashtags: JSON.parse(row.hashtags || '[]'),
                            mentions: JSON.parse(row.mentions || '[]'),
                            engagementBreakdown: JSON.parse(row.engagement_breakdown || '{}'),
                            topComments: JSON.parse(row.top_comments || '{}'),
                            viewsTrend: JSON.parse(row.views_trend || '{}'),
                            keywords: JSON.parse(row.keywords || '{}')
                        }));
                        res.json({ posts, reels });
                    });
                });
            } else {
                // Fetch and store all
                // Same as refresh but without filtering
                const scriptPath = path.join(__dirname, '..', 'backend', 'tut2.py');
                const cookiesPath = path.join(__dirname, '..', 'backend', 'cookies.json');

                const args = [scriptPath, username, '--no-pretty'];
                if (fs.existsSync(cookiesPath)) {
                    args.push('--cookies-file', cookiesPath);
                }

                const python = spawn('python3', args, { cwd: path.join(__dirname, '..') });

                let data = '';
                let errorData = '';

                python.stdout.on('data', (chunk) => {
                    data += chunk;
                });

                python.stderr.on('data', (chunk) => {
                    errorData += chunk;
                });

                python.on('close', (code) => {
                    if (code === 0) {
                        try {
                            const result = JSON.parse(data);
                            // Write to temp file for analysis
                            const tempFile = path.join(__dirname, 'temp.json');
                            fs.writeFileSync(tempFile, JSON.stringify(result));
                            
                            // Run analyze_posts.py
                            const analyzePath = path.join(__dirname, '..', 'backend', 'analyze_posts.py');
                            const analyze = spawn('python3', [analyzePath, tempFile], { cwd: path.join(__dirname, '..') });
                            
                            let analyzedData = '';
                            let analyzeErrorData = '';
                            
                            analyze.stdout.on('data', (chunk) => {
                                analyzedData += chunk;
                            });
                            
                            analyze.stderr.on('data', (chunk) => {
                                analyzeErrorData += chunk;
                            });
                            
                            analyze.on('close', (analyzeCode) => {
                                fs.unlinkSync(tempFile); // Clean up temp file
                                if (analyzeCode === 0) {
                                    try {
                                        const analyzedResult = JSON.parse(analyzedData);
                                        // Map using analyzedResult
                                        const posts = (analyzedResult.images || []).map((img, index) => ({
                                            id: img.id || `post-${index}`,
                                            image: `http://localhost:3001/api/avatar?url=${encodeURIComponent(img.src)}`,
                                            likes: abbreviateNumber(img.likes || 0),
                                            comments: abbreviateNumber(img.comments_count || 0),
                                            title: img.title || '',
                                            caption: img.captions ? img.captions.join(' ') : '',
                                            type: 'post',
                                            timestamp: img.taken_at ? new Date(img.taken_at * 1000).toISOString() : '',
                                            keywords: [],
                                            vibe: img.vibe || 'Unknown',
                                            categories: img.categories || [],
                                            quality: img.quality || { score: 0, category: { lighting: 0, contrast: 0, saturation: 0, sharpness: 0, colorfulness: 0, exposure: 0 } },
                                            hashtags: img.hashtags || [],
                                            mentions: img.mentions || []
                                        }));
                                        const reels = (analyzedResult.videos || []).map((vid, index) => ({
                                            id: vid.id || `reel-${index}`,
                                            thumbnail: `http://localhost:3001/api/avatar?url=${encodeURIComponent(vid.thumb)}`,
                                            videoSrc: vid.url || undefined,
                                            title: vid.title || '',
                                            caption: vid.captions ? vid.captions.join(' ') : '',
                                            views: abbreviateNumber(vid.views || 0),
                                            likes: abbreviateNumber(vid.likes || 0),
                                            comments: abbreviateNumber(vid.comments_count || 0),
                                            timestamp: vid.taken_at ? new Date(vid.taken_at * 1000).toISOString() : '',
                                            events: [],
                                            vibe: vid.vibe || 'Unknown',
                                            tags: [],
                                            categories: vid.categories || [],
                                            quality: vid.quality || { score: 0, category: { lighting: 0, contrast: 0, saturation: 0, sharpness: 0, colorfulness: 0, exposure: 0 } },
                                            hashtags: vid.hashtags || [],
                                            mentions: vid.mentions || [],
                                            engagementBreakdown: {},
                                            topComments: {},
                                            viewsTrend: {},
                                            keywords: {}
                                        }));

                                        // Store in DB
                                        const stmtPosts = db.prepare("INSERT OR REPLACE INTO posts (id, username, image, likes, comments, title, caption, type, timestamp, keywords, vibe, categories, quality, hashtags, mentions) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                                        posts.forEach(post => {
                                            stmtPosts.run(post.id, username, post.image, post.likes, post.comments, post.title, post.caption, post.type, post.timestamp, JSON.stringify(post.keywords), post.vibe, JSON.stringify(post.categories), JSON.stringify(post.quality), JSON.stringify(post.hashtags), JSON.stringify(post.mentions));
                                        });
                                        stmtPosts.finalize();
                                        
                                        const stmtReels = db.prepare("INSERT OR REPLACE INTO reels (id, username, thumbnail, video_src, title, caption, views, likes, comments, timestamp, events, vibe, tags, categories, quality, hashtags, mentions, engagement_breakdown, top_comments, views_trend, keywords) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                                        reels.forEach(reel => {
                                            stmtReels.run(reel.id, username, reel.thumbnail, reel.videoSrc, reel.title, reel.caption, reel.views, reel.likes, reel.comments, reel.timestamp, JSON.stringify(reel.events), reel.vibe, JSON.stringify(reel.tags), JSON.stringify(reel.categories), JSON.stringify(reel.quality), JSON.stringify(reel.hashtags), JSON.stringify(reel.mentions), JSON.stringify(reel.engagementBreakdown), JSON.stringify(reel.topComments), JSON.stringify(reel.viewsTrend), JSON.stringify(reel.keywords));
                                        });
                                        stmtReels.finalize();
                                        
                                        res.json({ posts, reels });
                                    } catch (e) {
                                        console.error('Failed to parse analyzed JSON:', e);
                                        res.status(500).json({ error: 'Failed to parse analyzed data' });
                                    }
                                } else {
                                    console.error('Analyze script failed:', analyzeErrorData);
                                    res.status(500).json({ error: 'Analysis failed', details: analyzeErrorData });
                                }
                            });
                        } catch (e) {
                            console.error('Failed to parse JSON:', e);
                            res.status(500).json({ error: 'Failed to parse data' });
                        }
                    } else {
                        console.error('Python script failed:', errorData);
                        res.status(500).json({ error: 'Scraping failed', details: errorData });
                    }
                });
            }
        });
    }
});

app.get('/api/metrics/:username', (req, res) => {
    const username = req.params.username;
    const refresh = req.query.refresh === 'true';

    if (refresh) {
        // Always fetch
        // Path to the Python script
        const scriptPath = path.join(__dirname, '..', 'backend', 'tut2.py');
        const cookiesPath = path.join(__dirname, '..', 'backend', 'cookies.json');

        // Build arguments
        const args = [scriptPath, username, '--no-pretty'];
        if (fs.existsSync(cookiesPath)) {
            args.push('--cookies-file', cookiesPath);
        }

        // Run the Python script with the username
        const python = spawn('python3', args, { cwd: path.join(__dirname, '..') });

        let data = '';
        let errorData = '';

        python.stdout.on('data', (chunk) => {
            data += chunk;
        });

        python.stderr.on('data', (chunk) => {
            errorData += chunk;
        });

        python.on('close', (code) => {
            if (code === 0) {
                try {
                    const result = JSON.parse(data);
                    const images = result.images || [];
                    const videos = result.videos || [];
                    const totalPosts = images.length + videos.length;
                    const totalLikes = images.reduce((sum, img) => sum + (img.likes || 0), 0) + videos.reduce((sum, vid) => sum + (vid.likes || 0), 0);
                    const totalComments = images.reduce((sum, img) => sum + (img.comments_count || 0), 0) + videos.reduce((sum, vid) => sum + (vid.comments_count || 0), 0);
                    const followersStr = typeof result.followers === 'string' ? result.followers.replace(/,/g, '') : result.followers.toString();
                    const followers = parseInt(followersStr) || 1; // avoid division by zero
                    const engagementRate = ((totalLikes + totalComments) / followers * 100).toFixed(1) + '%';
                    const avgLikes = totalPosts > 0 ? (totalLikes / totalPosts).toFixed(1) : '0';
                    const avgComments = totalPosts > 0 ? (totalComments / totalPosts).toFixed(1) : '0';

                    const metrics = [
                        {
                            title: "Engagement Rate",
                            value: engagementRate,
                            subtitle: "",
                            icon: "favorite",
                            color: "error"
                        },
                        {
                            title: "Avg. Likes",
                            value: abbreviateNumber(parseFloat(avgLikes)),
                            subtitle: "",
                            icon: "favorite",
                            color: "error"
                        },
                        {
                            title: "Avg. Comments",
                            value: abbreviateNumber(parseFloat(avgComments)),
                            subtitle: "",
                            icon: "comment",
                            color: "info"
                        }
                    ];
                    // Store in DB
                    db.run("INSERT OR REPLACE INTO metrics (username, engagement_rate, avg_likes, avg_comments) VALUES (?, ?, ?, ?)", 
                        [username, engagementRate, abbreviateNumber(parseFloat(avgLikes)), abbreviateNumber(parseFloat(avgComments))], 
                        (err) => {
                            if (err) console.error('DB insert error:', err);
                        });
                    res.json(metrics);
                } catch (e) {
                    console.error('Failed to parse JSON:', e);
                    res.status(500).json({ error: 'Failed to parse data' });
                }
            } else {
                console.error('Python script failed:', errorData);
                res.status(500).json({ error: 'Scraping failed', details: errorData });
            }
        });
    } else {
        db.get("SELECT engagement_rate, avg_likes, avg_comments FROM metrics WHERE username = ?", [username], (err, row) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'DB error' });
                return;
            }
            if (row) {
                const metrics = [
                    {
                        title: "Engagement Rate",
                        value: row.engagement_rate,
                        subtitle: "",
                        icon: "favorite",
                        color: "error"
                    },
                    {
                        title: "Avg. Likes",
                        value: row.avg_likes,
                        subtitle: "",
                        icon: "favorite",
                        color: "error"
                    },
                    {
                        title: "Avg. Comments",
                        value: row.avg_comments,
                        subtitle: "",
                        icon: "comment",
                        color: "info"
                    }
                ];
                res.json(metrics);
            } else {
                // Fetch and store
                // Same as above
                const scriptPath = path.join(__dirname, '..', 'backend', 'tut2.py');
                const cookiesPath = path.join(__dirname, '..', 'backend', 'cookies.json');

                const args = [scriptPath, username, '--no-pretty'];
                if (fs.existsSync(cookiesPath)) {
                    args.push('--cookies-file', cookiesPath);
                }

                const python = spawn('python3', args, { cwd: path.join(__dirname, '..') });

                let data = '';
                let errorData = '';

                python.stdout.on('data', (chunk) => {
                    data += chunk;
                });

                python.stderr.on('data', (chunk) => {
                    errorData += chunk;
                });

                python.on('close', (code) => {
                    if (code === 0) {
                        try {
                            const result = JSON.parse(data);
                            const images = result.images || [];
                            const videos = result.videos || [];
                            const totalPosts = images.length + videos.length;
                            const totalLikes = images.reduce((sum, img) => sum + (img.likes || 0), 0) + videos.reduce((sum, vid) => sum + (vid.likes || 0), 0);
                            const totalComments = images.reduce((sum, img) => sum + (img.comments_count || 0), 0) + videos.reduce((sum, vid) => sum + (vid.comments_count || 0), 0);
                            const followersStr = typeof result.followers === 'string' ? result.followers.replace(/,/g, '') : result.followers.toString();
                            const followers = parseInt(followersStr) || 1; // avoid division by zero
                            const engagementRate = ((totalLikes + totalComments) / followers * 100).toFixed(1) + '%';
                            const avgLikes = totalPosts > 0 ? (totalLikes / totalPosts).toFixed(1) : '0';
                            const avgComments = totalPosts > 0 ? (totalComments / totalPosts).toFixed(1) : '0';

                            const metrics = [
                                {
                                    title: "Engagement Rate",
                                    value: engagementRate,
                                    subtitle: "",
                                    icon: "favorite",
                                    color: "error"
                                },
                                {
                                    title: "Avg. Likes",
                                    value: abbreviateNumber(parseFloat(avgLikes)),
                                    subtitle: "",
                                    icon: "favorite",
                                    color: "error"
                                },
                                {
                                    title: "Avg. Comments",
                                    value: abbreviateNumber(parseFloat(avgComments)),
                                    subtitle: "",
                                    icon: "comment",
                                    color: "info"
                                }
                            ];
                            db.run("INSERT OR REPLACE INTO metrics (username, engagement_rate, avg_likes, avg_comments) VALUES (?, ?, ?, ?)", 
                                [username, engagementRate, abbreviateNumber(parseFloat(avgLikes)), abbreviateNumber(parseFloat(avgComments))], 
                                (err) => {
                                    if (err) console.error('DB insert error:', err);
                                });
                            res.json(metrics);
                        } catch (e) {
                            console.error('Failed to parse JSON:', e);
                            res.status(500).json({ error: 'Failed to parse data' });
                        }
                    } else {
                        console.error('Python script failed:', errorData);
                        res.status(500).json({ error: 'Scraping failed', details: errorData });
                    }
                });
            }
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/api/avatar', (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: 'Missing url' });

    https.get(url, (response) => {
        res.set('Content-Type', response.headers['content-type']);
        response.pipe(res);
    }).on('error', (err) => {
        res.status(500).json({ error: 'Failed to fetch image' });
    });
});
