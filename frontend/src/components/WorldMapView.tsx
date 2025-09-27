import React from 'react';
import { Box } from '@mui/material';

const WorldMapView: React.FC = () => {
  return (
    <Box className="glass-card-light" sx={{ 
      height: 200,
      bgcolor: 'transparent', // Override with glass effect
      borderRadius: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      border: 'none' // Override with glass effect
    }}>
      {/* Simple world map representation using CSS */}
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 400 200" 
        style={{ position: 'absolute' }}
      >
        {/* Continents as simplified shapes */}
        <path
          d="M50,80 Q80,60 120,70 Q160,65 180,80 Q200,75 220,85 Q240,80 260,90 L280,95 Q300,90 320,95 L340,100 Q360,95 380,100 L380,120 Q360,115 340,120 Q320,125 300,120 Q280,125 260,120 Q240,125 220,120 Q200,125 180,120 Q160,125 140,120 Q120,125 100,120 Q80,125 60,120 L50,100 Z"
          fill="#1E3A8A"
          opacity={0.6}
        />
        <path
          d="M100,120 Q130,110 160,115 Q190,110 220,120 Q250,115 280,125 L300,130 Q320,125 340,130 L360,135 L360,155 Q340,150 320,155 Q300,160 280,155 Q250,160 220,155 Q190,160 160,155 Q130,160 100,155 Z"
          fill="#1E3A8A"
          opacity={0.4}
        />
        {/* Highlight points for top countries */}
        <circle cx="200" cy="85" r="3" fill="#007AFF" />
        <circle cx="280" cy="110" r="3" fill="#00FF88" />
        <circle cx="150" cy="140" r="3" fill="#FF8800" />
      </svg>
    </Box>
  );
};

export default WorldMapView;