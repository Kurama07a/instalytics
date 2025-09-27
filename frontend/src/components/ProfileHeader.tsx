import React from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Stack,
  Chip
} from '@mui/material';
import { Verified } from '@mui/icons-material';
import { mockUserProfile } from '../data/mockData';
import { UserProfile } from '../types/dashboard';
// Helper to decrease size by 15%
const scale = (value: number) => value * 0.80;
const ProfileHeader: React.FC<{ userProfile?: UserProfile }> = ({ userProfile = mockUserProfile }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'flex-start',
      gap: scale(3),
      mb: scale(2),
      p: scale(3),
    }}>
      {/* Profile Avatar with Verification Badge */}
      <Box sx={{ position: 'relative', mt: scale(-1) }}>
        <Avatar
          src={`http://localhost:3001/api/avatar?url=${encodeURIComponent(userProfile.avatar)}`}
          sx={{ 
            width: scale(180),
            height: scale(180),
            border: `${scale(4)}px solid #007AFF`
          }}
        />
        {userProfile.isVerified && (
          <Box sx={{
            position: 'absolute',
            bottom: scale(2),
            right: scale(2),
            bgcolor: '#007AFF',
            borderRadius: '50%',
            width: scale(36),
            height: scale(36),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `${scale(3)}px solid #0a0a0a`
          }}>
            <Verified sx={{ fontSize: scale(20), color: 'white' }} />
          </Box>
        )}
      </Box>

      {/* Profile Info */}
      <Box sx={{ flex: 1, pt: scale(1) }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            color: 'white',
            mb: scale(0.5),
            lineHeight: 1.2,
            fontSize: scale(34) // default h4 is 2.125rem = 34px
          }}
        >
          {userProfile.name}
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#888',
            mb: scale(3),
            fontSize: scale(18.4) // 1.15rem = 18.4px
          }}
        >
          {userProfile.username}
        </Typography>

        {/* Stats Row with decreased spacing */}
        <Stack direction="row" spacing={scale(15)} alignItems="center">
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700, 
                color: 'white',
                fontSize: scale(28), // 1.75rem = 28px
                lineHeight: 1
              }}
            >
              {userProfile.followers}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#888',
                fontSize: scale(16), // 1rem = 16px
                textTransform: 'none'
              }}
            >
              Followers
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700, 
                color: '#007AFF',
                fontSize: scale(28),
                lineHeight: 1
              }}
            >
              {userProfile.following}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#888',
                fontSize: scale(16),
                textTransform: 'none'
              }}
            >
              Following
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700, 
                color: 'white',
                fontSize: scale(28),
                lineHeight: 1
              }}
            >
              {userProfile.posts}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#888',
                fontSize: scale(16),
                textTransform: 'none'
              }}
            >
              Posts
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProfileHeader;