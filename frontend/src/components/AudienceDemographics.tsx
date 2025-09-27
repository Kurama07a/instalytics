import React from 'react';
import { 
  Box, 
  Typography, 
  Grid,
  LinearProgress,
  Tabs,
  Tab,
  Card,
  CardContent
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import WorldMapView from './WorldMapView';
import { mockDemographics } from '../data/mockData';

const AudienceDemographics: React.FC = () => {
  const [locationTab, setLocationTab] = React.useState(0);

  const handleLocationTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setLocationTab(newValue);
  };

  const genderData = [
    { name: 'Female', value: mockDemographics.gender.female, color: '#FF69B4' },
    { name: 'Male', value: mockDemographics.gender.male, color: '#007AFF' }
  ];

  const ageGroups = [
    { label: '18-24', value: mockDemographics.ageGroups['18-24'], color: '#007AFF' },
    { label: '25-34', value: mockDemographics.ageGroups['25-34'], color: '#00FF88' },
    { label: '35-44', value: mockDemographics.ageGroups['35-44'], color: '#FF8800' },
    { label: '45+', value: mockDemographics.ageGroups['45+'], color: '#888' }
  ];

  const locations = [
    { label: 'Spain', value: mockDemographics.locations.spain, color: '#007AFF' },
    { label: 'India', value: mockDemographics.locations.india, color: '#00FF88' },
    { label: 'Chile', value: mockDemographics.locations.chile, color: '#FF8800' },
    { label: 'Other', value: mockDemographics.locations.other, color: '#888' }
  ];

  return (
    <Box className="glass-card" sx={{ 
      bgcolor: 'transparent', // Override with glass effect
      border: 'none', // Override with glass effect
      borderRadius: 2,
      p: 3
    }}>        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700, 
            color: 'white',
            mb: 2,
            fontSize: '1.1rem'
          }}
        >
          Audience Demographics
        </Typography>

      <Grid container spacing={3}>
        {/* Gender Distribution */}
        <Grid item xs={12} md={5}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: 100, height: 100 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={50}
                    dataKey="value"
                    stroke="none"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: '#888', display: 'block', mb: 0.5 }}>
              </Typography>
              {genderData.map((item) => (
                <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.3 }}>
                  <Box sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: item.color }} />
                  <Typography variant="caption" sx={{ color: 'white', fontSize: '1rem' }}>
                    {item.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#888', fontSize: '1rem' }}>
                    {item.value}%
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Age Groups - Condensed */}
        <Grid item xs={12} md={7}>
          <Box>
            {ageGroups.map((group) => (
              <Box key={group.label} sx={{ mb: 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.3 }}>
                  <Typography variant="caption" sx={{ color: 'white', fontSize: '0.9rem' }}>
                    {group.label}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#888', fontSize: '0.9rem' }}>
                    {group.value}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={group.value}
                  sx={{
                    height: 3,
                    borderRadius: 2,
                    bgcolor: '#333',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: group.color,
                      borderRadius: 2
                    }
                  }}
                />
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Location Demographics with Tabs */}
        <Grid item xs={12}>
          <Box sx={{ mt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>
                Top Countries:
              </Typography>
              
              <Tabs 
                value={locationTab} 
                onChange={handleLocationTabChange}
                sx={{ 
                  minHeight: 32,
                  '& .MuiTab-root': { 
                    color: '#888',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    minHeight: 32,
                    padding: '4px 12px',
                    '&.Mui-selected': { color: '#007AFF' }
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#007AFF',
                    height: 2
                  }
                }}
              >
                <Tab label="List View" />
                <Tab label="Map View" />
              </Tabs>
            </Box>

            {locationTab === 0 ? (
              // List View
              <Box>
                {locations.map((location) => (
                  <Box key={location.label} sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.3 }}>
                      <Typography variant="caption" sx={{ color: 'white', fontSize: '0.75rem' }}>
                        {location.label}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#888', fontSize: '0.75rem' }}>
                        {location.value}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={location.value}
                      sx={{
                        height: 2,
                        borderRadius: 2,
                        bgcolor: '#333',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: location.color,
                          borderRadius: 2
                        }
                      }}
                    />
                  </Box>
                ))}
              </Box>
            ) : (
              // Map View
              <Box sx={{ height: 120 }}>
                <WorldMapView />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AudienceDemographics;