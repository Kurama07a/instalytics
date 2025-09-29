import React from 'react';
import { 
  Box, 
  Typography
} from '@mui/material';
import WorldMapView from './WorldMapView';

const AudienceDemographics: React.FC = () => {
  return (
    <Box className="glass-card" sx={{ 
      bgcolor: 'transparent',
      border: 'none',
      borderRadius: 2,
      p: 3,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 400
    }}>
      <Typography variant="body1" sx={{ color: '#888' }}>
        Audience demographics data not available
      </Typography>
    </Box>
  );
};

export default AudienceDemographics;