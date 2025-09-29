import React from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Stack,
  Chip,
  IconButton
} from '@mui/material';
import { Verified, Refresh } from '@mui/icons-material';
import { UserProfile } from '../types/dashboard';
// Helper to decrease size by 15%
const scale = (value: number) => value * 0.80;
const ProfileHeader: React.FC<{ userProfile?: UserProfile; onRefresh?: () => void }> = ({ userProfile, onRefresh }) => {
  if (!userProfile) {
    return (
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'flex-start',
        gap: scale(3),
        mb: scale(2),
        p: scale(3),
        bgcolor: '#1a1a1a',
        borderRadius: 2,
      }}>
        <Box sx={{ position: 'relative', mt: scale(-1) }}>
          <Box
            sx={{ 
              width: scale(180),
              height: scale(180),
              borderRadius: '50%',
              bgcolor: '#333',
            }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ height: 24, bgcolor: '#333', borderRadius: 1, mb: 1 }} />
          <Box sx={{ height: 16, bgcolor: '#333', borderRadius: 1, mb: 1, width: '60%' }} />
          <Stack direction="row" spacing={2} sx={{ mt: scale(2) }}>
            {[1,2,3,4].map((i) => (
              <Box key={i} sx={{ height: 20, bgcolor: '#333', borderRadius: 1, width: 60 }} />
            ))}
          </Stack>
        </Box>
      </Box>
    );
  }

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
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: scale(3) }}>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#888',
              fontSize: scale(18.4) // 1.15rem = 18.4px
            }}
          >
            {userProfile.username}
          </Typography>
          {onRefresh && (
            <IconButton 
              onClick={onRefresh}
              sx={{ 
                color: '#007AFF',
                '&:hover': { bgcolor: 'rgba(0, 122, 255, 0.1)' }
              }}
              size="small"
            >
              <Refresh fontSize="small" />
            </IconButton>
          )}
        </Box>

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