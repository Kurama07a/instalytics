import React from 'react';
import { 
  Box, 
  Typography, 
  LinearProgress
} from '@mui/material';
import { mockContentCategories } from '../data/mockData';

const ContentVibe: React.FC = () => {
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
          {mockContentCategories.map((category, index) => {
            const leftOffset = mockContentCategories.slice(0, index).reduce((sum, cat) => sum + cat.percentage, 0);
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
            65.1K
          </Typography>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#888' }} />
          <Typography variant="caption" sx={{ color: '#888', ml: 1 }}>
            920
          </Typography>
        </Box>
      </Box>

      {/* Category Legend */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
        {mockContentCategories.map((category) => (
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