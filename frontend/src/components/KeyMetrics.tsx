import React from 'react';
import { 
  Box, 
  Typography, 
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { Favorite, ChatBubbleOutline } from '@mui/icons-material';
import { MetricCard } from '../types/dashboard';

const KeyMetrics: React.FC<{ metrics: MetricCard[] }> = ({ metrics }) => {
  if (!metrics || metrics.length === 0) {
    return (
      <Box>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700, 
            color: 'white',
            mb: 2,
            fontSize: '1.1rem'
          }}
        >
        </Typography>
        
        <Grid container spacing={2}>
          {[1, 2, 3].map((i) => (
            <Grid item xs={12} sm={4} key={i}>
              <Card className="glass-card" sx={{ 
                bgcolor: 'transparent',
                border: 'none',
                borderRadius: 2,
                height: '100%'
              }}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ height: 20, bgcolor: '#333', borderRadius: 1, mb: 1 }} />
                  <Box sx={{ height: 40, bgcolor: '#333', borderRadius: 1, mb: 1 }} />
                  <Box sx={{ height: 16, bgcolor: '#333', borderRadius: 1, width: '70%' }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box>
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 700, 
          color: 'white',
          mb: 2,
          fontSize: '1.1rem'
        }}
      >
      </Typography>
      
      <Grid container spacing={2} mt= {-5}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card className="glass-card" sx={{ 
              bgcolor: 'transparent', // Override with glass effect
              border: 'none', // Override with glass effect
              borderRadius: 2,
              height: '100%'
            }}>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  {metric.icon === 'favorite' ? (
                    <Favorite sx={{ color: '#FF1744', fontSize: 20, mr: 1 }} />
                  ) : (
                    <ChatBubbleOutline sx={{ color: '#007AFF', fontSize: 20, mr: 1 }} />
                  )}
                </Box>
                
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700, 
                    color: 'white',
                    mb: 0.5,
                    fontSize: index === 0 ? '2rem' : '1.5rem' // Larger for engagement rate
                  }}
                >
                  {metric.value}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#888',
                    fontSize: '0.85rem'
                  }}
                >
                  {metric.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default KeyMetrics;