import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  InputBase,
  IconButton,
  AppBar,
  Toolbar
} from '@mui/material';
import { Search, Notifications, Settings, AccountCircle } from '@mui/icons-material';

const Header: React.FC<{ onSearch?: (username: string) => void }> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && onSearch) {
      onSearch(searchValue.trim());
      setSearchValue('');
    }
  };

  return (
    <AppBar position="fixed" className="glass-header" sx={{ 
      bgcolor: 'transparent', // Override with glass effect
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      zIndex: 1201,
      height: '64px' // Similar height to ProfileHeader's effective height
    }}>
      <Toolbar sx={{ minHeight: '64px' }}>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, color: '#FFFFFF' }}>
          InstaAnalytics
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          bgcolor: 'rgba(255,255,255,0.1)', 
          borderRadius: 2, 
          px: 2, 
          mr: 2,
          width: '300px'
        }}>
          <Search sx={{ color: '#CCCCCC', mr: 1 }} />
          <InputBase
            placeholder="Search Instagram username..."
            sx={{ color: '#FFFFFF', flex: 1 }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </Box>
        
        <IconButton sx={{ color: '#CCCCCC' }}>
          <Notifications />
        </IconButton>
        <IconButton sx={{ color: '#CCCCCC' }}>
          <Settings />
        </IconButton>
        <IconButton sx={{ color: '#CCCCCC' }}>
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;