import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography,
  Tab,
  Tabs,
  CircularProgress
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
import { UserProfile, ContentPost, ReelData, MetricCard } from '../types/dashboard';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [userProfile, setUserProfile] = useState<UserProfile | undefined>(undefined);
  const [posts, setPosts] = useState<ContentPost[]>([]);
  const [reels, setReels] = useState<ReelData[]>([]);
  const [metrics, setMetrics] = useState<MetricCard[]>([]);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const handleSearch = async (username: string) => {
    if (!username) return;
    setLoading(true);
    try {
      const [userResponse, postsResponse, metricsResponse] = await Promise.all([
        fetch(`http://localhost:3001/api/user/${username}`),
        fetch(`http://localhost:3001/api/posts/${username}`),
        fetch(`http://localhost:3001/api/metrics/${username}`)
      ]);

      const userData = userResponse.ok ? await userResponse.json() : undefined;
      const postsData = postsResponse.ok ? await postsResponse.json() : { posts: [], reels: [] };
      const metricsData = metricsResponse.ok ? await metricsResponse.json() : [];

      setUserProfile(userData);
      setPosts(postsData.posts || []);
      setReels(postsData.reels || []);
      setMetrics(metricsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setUserProfile(undefined);
      setPosts([]);
      setReels([]);
      setMetrics([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!userProfile) return;
    setLoading(true);
    try {
      const [userResponse, postsResponse, metricsResponse] = await Promise.all([
        fetch(`http://localhost:3001/api/user/${userProfile.username}?refresh=true`),
        fetch(`http://localhost:3001/api/posts/${userProfile.username}?refresh=true`),
        fetch(`http://localhost:3001/api/metrics/${userProfile.username}?refresh=true`)
      ]);

      const userData = userResponse.ok ? await userResponse.json() : undefined;
      const postsData = postsResponse.ok ? await postsResponse.json() : { posts: [], reels: [] };
      const metricsData = metricsResponse.ok ? await metricsResponse.json() : [];

      setUserProfile(userData);
      setPosts(postsData.posts || []);
      setReels(postsData.reels || []);
      setMetrics(metricsData);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <CircularProgress size={60} sx={{ color: '#007AFF' }} />
        </Box>
      ) : (
        <>
          <Header onSearch={handleSearch} />
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
                    <ProfileHeader userProfile={userProfile} onRefresh={handleRefresh} />
                    <KeyMetrics metrics={metrics} />
                    <ContentVibe posts={posts} reels={reels} />
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
                        posts={posts}
                        reels={reels}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </>
      )}
    </ThemeProvider>
  );
};

export default Dashboard;