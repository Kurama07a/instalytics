import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography,
  Tab,
  Tabs
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import ProfileHeader from './ProfileHeader';
import KeyMetrics from './KeyMetrics';
import ContentVibe from './ContentVibe';
import AudienceDemographics from './AudienceDemographics';
import ContentFeed from './ContentFeed';
import Sidebar from './Sidebar';
import Header from './Header';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [activeSection, setActiveSection] = React.useState('dashboard');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
      <Box sx={{ 
        minHeight: '100vh',
        width: '100%', 
        bgcolor: 'transparent', // Made transparent to show aurora background
        color: 'white',
        p: 5,
        pt: 10, // Adjust for fixed header
        pl: '270px'  // 250px sidebar + 20px padding
      }}>
        <Container maxWidth={false}>
          <Grid container spacing={3} sx={{ height: '100%' }}>
            {/* Left Column - Dashboard */}
            <Grid item xs={12} lg={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%', marginTop: 2 }}>
                <ProfileHeader />
                <KeyMetrics />
                <ContentVibe />
                <AudienceDemographics />
              </Box>
            </Grid>

            {/* Right Column - Content Feed */}
            <Grid item xs={12} lg={6} marginTop={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 3 }}>
                {/* Content Feed Header */}
                <Box sx={{ mb: 2, ml: 4 }}>
                  <Box sx={{ borderBottom: 1, borderColor: '#333', mb: 2 }}>
                    <Tabs 
                      value={activeTab} 
                      onChange={handleTabChange}
                      sx={{ 
                        '& .MuiTab-root': { 
                          color: '#888',
                          fontWeight: 600,
                          '&.Mui-selected': { color: '#007AFF' }
                        },
                        '& .MuiTabs-indicator': {
                          backgroundColor: '#007AFF'
                        }
                      }}
                    >
                      <Tab label="Recent Posts" />
                      <Tab label="Recent Reels" />
                    </Tabs>
                  </Box>
                </Box>
                
                {/* Content Feed Grid */}
                <Box sx={{ flexGrow: 1, px: 2 }}>
                  <ContentFeed 
                    activeTab={activeTab} 
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;