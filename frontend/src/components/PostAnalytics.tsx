import React, { useState } from 'react';
import { 
  Box, 
  Typography,
  Chip,
  Grid,
  LinearProgress,
  IconButton,
  Card,
  CardContent,
  Tabs,
  Tab
} from '@mui/material';
import { TrendingUp, Visibility, Share, BookmarkBorder, Favorite, ChatBubbleOutline, Star, Lightbulb, Palette, Close, ArrowBack, ArrowForward } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ContentPost, ReelData, PostAnalytics as PostAnalyticsType } from '../types/dashboard';

interface PostAnalyticsProps {
  analytics: PostAnalyticsType;
  content: ContentPost | ReelData;
  onClose?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

const PostAnalytics: React.FC<PostAnalyticsProps> = ({ analytics, content, onClose, onPrev, onNext }) => {
  const [tabValue, setTabValue] = useState(0);

  if (!content) {
    // Show overview when no content is provided
    return (
      <Box className="glass-card" sx={{ 
        bgcolor: 'transparent', // Override with glass effect
        border: 'none', // Override with glass effect
        borderRadius: 2,
        p: 3,
        height: 400,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700, 
            color: 'white',
            mb: 3,
            fontSize: '1.1rem'
          }}
        >
          Content Analysis Overview
        </Typography>

        {/* Content Categories */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
            Content Categories Distribution:
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: 'rgba(0, 0, 0, 0.3)', borderRadius: 1, backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Typography variant="body2" sx={{ color: '#007AFF', fontWeight: 700 }}>
                  Travel
                </Typography>
                <Typography variant="caption" sx={{ color: '#888' }}>
                  60%
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: 'rgba(0, 0, 0, 0.3)', borderRadius: 1, backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Typography variant="body2" sx={{ color: '#00FF88', fontWeight: 700 }}>
                  Lifestyle
                </Typography>
                <Typography variant="caption" sx={{ color: '#888' }}>
                  40%
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Vibe Analysis */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
            Content Vibe Distribution:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {['Peaceful', 'Aesthetic', 'Energetic', 'Casual'].map((vibe, index) => {
              const colors = ['#007AFF', '#00FF88', '#FF8800', '#FF1744'];
              return (
                <Chip
                  key={vibe}
                  label={vibe}
                  size="small"
                  sx={{
                    bgcolor: `${colors[index]}20`,
                    color: colors[index],
                    border: `1px solid ${colors[index]}40`,
                    fontSize: '0.75rem'
                  }}
                />
              );
            })}
          </Box>
        </Box>

        {/* Quality Metrics */}
        <Box>
          <Typography variant="subtitle2" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
            Average Quality Metrics:
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Lightbulb sx={{ color: '#FFD700', fontSize: 20, mb: 0.5 }} />
              <Typography variant="caption" sx={{ color: 'white', display: 'block' }}>
                Lighting
              </Typography>
              <Typography variant="body2" sx={{ color: '#FFD700', fontWeight: 700 }}>
                89%
              </Typography>
            </Box>
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Star sx={{ color: '#FF69B4', fontSize: 20, mb: 0.5 }} />
              <Typography variant="caption" sx={{ color: 'white', display: 'block' }}>
                Appeal
              </Typography>
              <Typography variant="body2" sx={{ color: '#FF69B4', fontWeight: 700 }}>
                88%
              </Typography>
            </Box>
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Palette sx={{ color: '#9C27B0', fontSize: 20, mb: 0.5 }} />
              <Typography variant="caption" sx={{ color: 'white', display: 'block' }}>
                Consistency
              </Typography>
              <Typography variant="body2" sx={{ color: '#9C27B0', fontWeight: 700 }}>
                89%
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  const isReel = 'views' in content;

  // Show Post/Reel Analytics
  return (
    <Box className="glass-card" sx={{ 
      bgcolor: 'transparent', // Override with glass effect
      border: 'none', // Override with glass effect
      borderRadius: 2,
      p: 3,
      height: 'auto',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {onPrev && (
            <IconButton onClick={onPrev} sx={{ color: 'white' }}>
              <ArrowBack />
            </IconButton>
          )}
          {onNext && (
            <IconButton onClick={onNext} sx={{ color: 'white' }}>
              <ArrowForward />
            </IconButton>
          )}
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700, 
              color: 'white',
              fontSize: '1.1rem'
            }}
          >
            {isReel ? 'Reel Analytics' : 'Post Analytics'}
          </Typography>
        </Box>
        {onClose && (
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
        )}
      </Box>

      {/* Content Preview and Metrics */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
        <Box 
          component="img"
          src={isReel ? content.thumbnail : content.image}
          sx={{ 
            width: 300, 
            height: 300, 
            borderRadius: 1,
            objectFit: 'cover',
            flexShrink: 0
          }}
        />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'white', 
              fontWeight: 600, 
              mb: 1,
              fontSize: '1rem'
            }}
          >
            {content.title}
          </Typography>
          <Typography variant="caption" sx={{ color: '#888', mb: 2 }}>
            {content.timestamp}
          </Typography>

          {/* Metrics Cards */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {isReel && (
              <Card className="glass-card-light" sx={{ bgcolor: 'transparent', border: 'none', minWidth: 120 }}>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Visibility sx={{ color: '#007AFF', fontSize: 20 }} />
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 700 }}>
                      {content.views}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#888' }}>
                    Views
                  </Typography>
                </CardContent>
              </Card>
            )}
            <Card className="glass-card-light" sx={{ bgcolor: 'transparent', border: 'none', minWidth: 120 }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Favorite sx={{ color: '#FF1744', fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: 'white', fontWeight: 700 }}>
                    {content.likes}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: '#888' }}>
                  Likes
                </Typography>
              </CardContent>
            </Card>
            <Card className="glass-card-light" sx={{ bgcolor: 'transparent', border: 'none', minWidth: 120 }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <ChatBubbleOutline sx={{ color: '#007AFF', fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: 'white', fontWeight: 700 }}>
                    {content.comments}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: '#888' }}>
                  Comments
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>

      {/* Tabs */}
      <Box sx={{ width: '100%' }}>
        <Tabs 
          value={tabValue} 
          onChange={(_, newValue) => setTabValue(newValue)}
          sx={{ 
            borderBottom: 1, 
            borderColor: '#333',
            '& .MuiTab-root': { color: '#888', fontSize: '0.9rem' },
            '& .Mui-selected': { color: 'white' },
            '& .MuiTabs-indicator': { bgcolor: '#007AFF' }
          }}
        >
          <Tab label="Overview" />
          <Tab label="Engagement" />
          <Tab label="Quality" />
          {isReel && <Tab label="Events" />}
        </Tabs>

        {/* Overview Tab */}
        {tabValue === 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
              Keywords:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              {analytics.keywords.map((keyword, index) => (
                <Chip key={index} label={keyword} variant="outlined" sx={{ color: 'white', borderColor: '#555' }} />
              ))}
            </Box>
            <Typography variant="subtitle2" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
              Top Comments:
            </Typography>
            <Box sx={{ mb: 3 }}>
              {analytics.topComments.map((comment, index) => (
                <Typography key={index} variant="body2" sx={{ color: '#ccc', mb: 1 }}>
                  "{comment.comment}" by {comment.user} ({comment.likes} likes)
                </Typography>
              ))}
            </Box>
          </Box>
        )}

        {/* Engagement Tab */}
        {tabValue === 1 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
              Engagement Breakdown:
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={analytics.engagementBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="type" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: 4 }} labelStyle={{ color: 'white' }} />
                <Bar dataKey="count" fill="#007AFF" />
              </BarChart>
            </ResponsiveContainer>
            <Typography variant="subtitle2" sx={{ color: 'white', mb: 2, mt: 4, fontWeight: 600 }}>
              Views Trend:
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={analytics.viewsTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="time" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: 4 }} labelStyle={{ color: 'white' }} />
                <Line type="monotone" dataKey="views" stroke="#007AFF" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        )}

        {/* Quality Tab */}
        {tabValue === 2 && analytics.quality && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
              Quality Analysis:
            </Typography>
            <Typography variant="body2" sx={{ color: '#ccc' }}>
              Lighting: {analytics.quality.lighting}/10<br />
              Visual Appeal: {analytics.quality.visualAppeal}/10<br />
              Consistency: {analytics.quality.consistency}/10
            </Typography>
          </Box>
        )}

        {/* Events Tab (Reels only) */}
        {tabValue === 3 && isReel && content.events && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
              Detected Events:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {content.events.map((event, index) => (
                <Chip key={index} label={event} variant="outlined" sx={{ color: 'white', borderColor: '#555' }} />
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PostAnalytics;
