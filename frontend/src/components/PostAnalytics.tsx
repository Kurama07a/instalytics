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
import { ContentPost, ReelData } from '../types/dashboard';

interface PostAnalyticsProps {
  content: ContentPost | ReelData;
  onClose?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

const PostAnalytics: React.FC<PostAnalyticsProps> = ({ content, onClose, onPrev, onNext }) => {
  const [tabValue, setTabValue] = useState(0);

  if (!content) {
    // Show overview when no content is provided
    return (
      <Box className="glass-card" sx={{ 
        bgcolor: 'transparent', 
        border: 'none', 
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
        {isReel ? (
          <video
            src={content.videoSrc || content.thumbnail}
            controls
            style={{ width: 400, height: 400, borderRadius: 8, objectFit: 'contain', flexShrink: 0 }}
          />
        ) : (
          <Box
            component="img"
            src={content.image}
            sx={{
              width: 400,
              height: 400,
              borderRadius: 1,
              objectFit: 'contain',
              flexShrink: 0
            }}
          />
        )}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'white', 
              fontWeight: 600, 
              mb: 0.5,
              fontSize: '1rem'
            }}
          >
            {content.title}
          </Typography>
          <Typography variant="body2" sx={{ color: '#ccc', mb: 1.5, fontFamily: 'Roboto', fontSize: '0.9rem' }}>
            {content.caption}
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
            borderBottom: '1px solid #333',
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
              Top Categories:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              {content.categories?.slice(0, 5).map((category, index) => (
                <Chip key={index} label={`${category.name} (${(category.confidence * 100).toFixed(1)}%)`} variant="outlined" sx={{ color: 'white', borderColor: '#555' }} />
              )) || []}
            </Box>
            <Typography variant="subtitle2" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
              Vibe:
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Chip label={content.vibe} sx={{ bgcolor: '#007AFF', color: 'white' }} />
            </Box>
          </Box>
        )}

        {/* Engagement Tab - Placeholder */}
        {tabValue === 1 && (
          <Box sx={{ mt: 3, textAlign: 'center', py: 4 }}>
            <Typography variant="body1" sx={{ color: '#888' }}>
              Engagement analytics not available
            </Typography>
          </Box>
        )}

        {/* Quality Tab */}
        {tabValue === 2 && content.quality && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
              Image Quality Parameters:
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[
                { name: 'Lighting', value: Math.round((content.quality.category?.lighting || 0) * 100) },
                { name: 'Contrast', value: Math.round((content.quality.category?.contrast || 0) * 100) },
                { name: 'Saturation', value: Math.round((content.quality.category?.saturation || 0) * 100) },
                { name: 'Sharpness', value: Math.round((content.quality.category?.sharpness || 0) * 100) },
                { name: 'Colorfulness', value: Math.round((content.quality.category?.colorfulness || 0) * 100) },
                { name: 'Exposure', value: Math.round((content.quality.category?.exposure || 0) * 100) },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid #fff', borderRadius: 4 }}
                  labelStyle={{ color: '#fff' }}
                  itemStyle={{ color: '#00FF88' }}
                />
                <Bar dataKey="value" fill="#00FF88" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}

        {/* Events Tab - Only for Reels */}
        {tabValue === 3 && isReel && (
          <Box sx={{ mt: 3, textAlign: 'center', py: 4 }}>
            <Typography variant="body1" sx={{ color: '#888' }}>
              Events analytics not available
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PostAnalytics;
