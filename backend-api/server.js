const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const https = require('https');

const app = express();
const PORT = 3001;

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
});

app.get('/api/posts/:username', (req, res) => {
    const username = req.params.username;

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
                // Map images to posts
                const posts = (result.images || []).map((img, index) => ({
                    id: img.id || `post-${index}`,
                    image: `http://localhost:3001/api/avatar?url=${encodeURIComponent(img.src)}`, // proxy the image
                    likes: abbreviateNumber(img.likes || 0),
                    comments: abbreviateNumber(img.comments_count || 0),
                    title: img.title || '',
                    caption: img.captions ? img.captions.join(' ') : '',
                    type: 'post',
                    timestamp: img.taken_at ? new Date(img.taken_at * 1000).toISOString() : '',
                    keywords: [], // mock
                    vibe: 'Positive', // mock
                    quality: { lighting: 8, visualAppeal: 9, consistency: 7 } // mock
                }));
                // Map videos to reels
                const reels = (result.videos || []).map((vid, index) => ({
                    id: vid.id || `reel-${index}`,
                    thumbnail: `http://localhost:3001/api/avatar?url=${encodeURIComponent(vid.thumb)}`, // proxy
                    title: vid.title || '',
                    caption: vid.captions ? vid.captions.join(' ') : '',
                    views: abbreviateNumber(vid.views || 0),
                    likes: abbreviateNumber(vid.likes || 0),
                    comments: abbreviateNumber(vid.comments_count || 0),
                    timestamp: vid.taken_at ? new Date(vid.taken_at * 1000).toISOString() : '',
                    events: [], // mock
                    vibe: 'Engaging', // mock
                    tags: [], // mock
                    engagementBreakdown: {}, // mock
                    topComments: {}, // mock
                    viewsTrend: {}, // mock
                    keywords: {}, // mock
                    quality: {} // mock
                }));
                res.json({ posts, reels });
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

app.get('/api/metrics/:username', (req, res) => {
    const username = req.params.username;

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
