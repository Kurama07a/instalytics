import React from 'react';
import { 
  Box, 
  Typography, 
  LinearProgress
} from '@mui/material';
import { ContentPost, ReelData } from '../types/dashboard';

const ContentVibe: React.FC<{ posts: ContentPost[], reels: ReelData[] }> = ({ posts, reels }) => {
  // Combine categories from posts and reels
  const allCategories = [...posts, ...reels].flatMap(item => item.categories || []);

  // Group by name and sum confidences
  const categoryMap = allCategories.reduce((acc, cat) => {
    if (!acc[cat.name]) {
      acc[cat.name] = { totalConfidence: 0, count: 0 };
    }
    acc[cat.name].totalConfidence += cat.confidence;
    acc[cat.name].count += 1;
    return acc;
  }, {} as Record<string, { totalConfidence: number, count: number }>);

  // Compute average confidence and sort
  const sortedCategories = Object.entries(categoryMap)
    .map(([name, { totalConfidence, count }]) => ({
      name,
      averageConfidence: totalConfidence / count,
      count
    }))
    .sort((a, b) => b.averageConfidence - a.averageConfidence)
    .slice(0, 5); // Top 5

  // Compute percentages based on average confidence
  const totalConfidence = sortedCategories.reduce((sum, cat) => sum + cat.averageConfidence, 0);
  const contentCategories = sortedCategories.map(cat => ({
    name: cat.name,
    percentage: totalConfidence > 0 ? Math.round((cat.averageConfidence / totalConfidence) * 100) : 0,
    color: ['#007AFF', '#00FF88', '#88FF00', '#FF8800', '#FF0088'][sortedCategories.indexOf(cat)] || '#888'
  }));

  if (contentCategories.length === 0) {
    return (
      <Box className="glass-card" sx={{ 
        bgcolor: 'transparent',
        border: 'none',
        borderRadius: 2,
        p: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 200
      }}>
        <Typography variant="body1" sx={{ color: '#888' }}>
          No data available
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="glass-card" sx={{ 
      bgcolor: 'transparent', // Override with glass effect
      border: 'none', // Override with glass effect
      borderRadius: 2,
      p: 3
    }}>
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 700, 
          color: 'white',
          mb: 2,
          fontSize: '1.1rem'
        }}
      >
        Content Vibe
      </Typography>
      
      {/* Main Progress Bar */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ position: 'relative', height: 8, bgcolor: '#333', borderRadius: 4, overflow: 'hidden' }}>
          {contentCategories.map((category, index) => {
            const leftOffset = contentCategories.slice(0, index).reduce((sum, cat) => sum + cat.percentage, 0);
            return (
              <Box
                key={category.name}
                sx={{
                  position: 'absolute',
                  left: `${leftOffset}%`,
                  width: `${category.percentage}%`,
                  height: '100%',
                  bgcolor: category.color,
                }}
              />
            );
          })}
        </Box>
        
        {/* Total indicator */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: 1 }}>
          <Typography variant="caption" sx={{ color: '#888', mr: 1 }}>
            {posts.length + reels.length}
          </Typography>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#888' }} />
          <Typography variant="caption" sx={{ color: '#888', ml: 1 }}>
            {contentCategories.length}
          </Typography>
        </Box>
      </Box>

      {/* Category Legend */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
        {contentCategories.map((category) => (
          <Box key={category.name} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{
              width: 12,
              height: 12,
              borderRadius: 1,
              bgcolor: category.color
            }} />
            <Typography variant="caption" sx={{ color: 'white', fontWeight: 500 }}>
              {category.name}
            </Typography>
            <Typography variant="caption" sx={{ color: '#888' }}>
              ({category.percentage}%)
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ContentVibe;