import React, { useState } from 'react';
import { 
  Box, 
  Grid,
  Card,
  CardMedia,
  Typography,
  IconButton,
  Chip
} from '@mui/material';
import { Favorite, ChatBubbleOutline, Visibility, PlayArrow } from '@mui/icons-material';
import { mockPostAnalytics } from '../data/mockData';
import PostAnalytics from './PostAnalytics';
import { ContentPost, ReelData } from '../types/dashboard';

interface ContentFeedProps {
  activeTab: number;
  posts: ContentPost[];
  reels: ReelData[];
}

const ContentFeed: React.FC<ContentFeedProps> = ({ activeTab, posts, reels }) => {
  const [selectedItem, setSelectedItem] = useState<ContentPost | ReelData | null>(null);

  const content = activeTab === 0 ? posts : reels;

  return (
    selectedItem ? (
      <PostAnalytics 
        analytics={mockPostAnalytics[selectedItem.id] || mockPostAnalytics["1"]} 
        content={selectedItem} 
        onClose={() => setSelectedItem(null)}
        onPrev={() => {
          const currentIndex = content.findIndex(item => item.id === selectedItem.id);
          const prevIndex = currentIndex === 0 ? content.length - 1 : currentIndex - 1;
          setSelectedItem(content[prevIndex]);
        }}
        onNext={() => {
          const currentIndex = content.findIndex(item => item.id === selectedItem.id);
          const nextIndex = (currentIndex + 1) % content.length;
          setSelectedItem(content[nextIndex]);
        }}
      />
    ) : (
      <Box sx={{ maxHeight: '800px', overflowY: 'auto' }}>
        <Grid container spacing={2}>
          {content.map((item) => {
            const isReel = 'views' in item;
            const isPost = 'caption' in item && !isReel;
            
            return (
              <Grid item xs={6} md={4} key={item.id}>
                <Card 
                  className="glass-card-light"
                  sx={{ 
                    position: 'relative',
                    width: 240,
                    height: 240,
                    bgcolor: 'transparent', // Override with glass effect
                    boxShadow: 'none', // Override with glass effect
                    borderRadius: 2,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: selectedItem && typeof selectedItem === 'object' && 'id' in selectedItem && (selectedItem as ContentPost | ReelData).id === item.id ? '2px solid #007AFF' : 'none', // Override with glass effect
                    '&:hover .overlay': {
                      opacity: 1
                    }
                  }}
                  onClick={() => setSelectedItem(item)}
                >
                  <CardMedia
                    component="img"
                    image={isReel ? item.thumbnail : item.image}
                    alt={item.title}
                    sx={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      borderRadius: 2
                    }}
                  />
                  
                  {/* Play button for reels */}
                  {isReel && (
                    <Box sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 2
                    }}>
                      <PlayArrow sx={{ 
                        fontSize: 40, 
                        color: 'white', 
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        borderRadius: '50%',
                        p: 1
                      }} />
                    </Box>
                  )}
                  
                  {/* Overlay with stats */}
                  <Box 
                    className="overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      bgcolor: 'rgba(0,0,0,0.8)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      p: 1.5,
                      opacity: selectedItem && (selectedItem as ContentPost | ReelData).id === item.id ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                      borderRadius: 2
                    }}
                  >
                    {/* Top section - Tags/Keywords for posts */}
                    <Box>
                      {isPost && item.keywords && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                          {item.keywords.slice(0, 3).map((keyword) => (
                            <Chip
                              key={keyword}
                              label={`#${keyword}`}
                              size="small"
                              sx={{
                                bgcolor: 'rgba(0, 123, 255, 0.2)',
                                color: '#007AFF',
                                fontSize: '0.6rem',
                                height: 20
                              }}
                            />
                          ))}
                        </Box>
                      )}
                      
                      {isReel && item.tags && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                          {item.tags.slice(0, 2).map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              size="small"
                              sx={{
                                bgcolor: 'rgba(255, 23, 68, 0.2)',
                                color: '#FF1744',
                                fontSize: '0.6rem',
                                height: 20
                              }}
                            />
                          ))}
                        </Box>
                      )}
                      
                      {/* Vibe indicator */}
                      <Chip
                        label={item.vibe}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(0, 255, 136, 0.2)',
                          color: '#00FF88',
                          fontSize: '0.65rem',
                          height: 20,
                          mb: 1
                        }}
                      />
                    </Box>

                    {/* Bottom stats */}
                    <Box>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: 'white', 
                          fontWeight: 600,
                          display: 'block',
                          mb: 1,
                          lineHeight: 1.2,
                          fontSize: '0.7rem'
                        }}
                      >
                        {item.caption || item.title}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                        {isReel && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                            <Visibility sx={{ fontSize: 12, color: '#007AFF' }} />
                            <Typography variant="caption" sx={{ color: 'white', fontWeight: 500, fontSize: '0.65rem' }}>
                              {item.views}
                            </Typography>
                          </Box>
                        )}
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                          <Favorite sx={{ fontSize: 12, color: '#FF1744' }} />
                          <Typography variant="caption" sx={{ color: 'white', fontWeight: 500, fontSize: '0.65rem' }}>
                            {item.likes}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                          <ChatBubbleOutline sx={{ fontSize: 12, color: '#007AFF' }} />
                          <Typography variant="caption" sx={{ color: 'white', fontWeight: 500, fontSize: '0.65rem' }}>
                            {item.comments}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    )
  );
};

export default ContentFeed;
