import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  PhotoLibrary,
  Videocam,
  Analytics,
  Person,
  Settings
} from '@mui/icons-material';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'posts', label: 'Posts', icon: <PhotoLibrary /> },
    { id: 'reels', label: 'Reels', icon: <Videocam /> },
    { id: 'analytics', label: 'Analytics', icon: <Analytics /> },
    { id: 'profile', label: 'Profile', icon: <Person /> },
    { id: 'settings', label: 'Settings', icon: <Settings /> }
  ];

  return (
    <Box
      className="glass-sidebar"
      sx={{
        width: 250,
        height: '100vh',
        bgcolor: 'transparent', // Override with glass effect
        borderRight: 'none', // Override with glass effect
        position: 'fixed',
        left: 0,
        top: -6,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
          InstaAnalytics
        </Typography>
      </Box>
      <Divider sx={{ bgcolor: '#333' }} />
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              selected={activeSection === item.id}
              onClick={() => onSectionChange(item.id)}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'rgba(0, 122, 255, 0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(0, 122, 255, 0.2)'
                  }
                },
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.05)'
                }
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{ color: 'white' }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
