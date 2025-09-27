import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './components/Dashboard';
import theme from './theme';
import './aurora.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Aurora Borealis Background */}
      <div className="aurora-background">
        <div className="aurora-particles">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="aurora-particle"></div>
          ))}
        </div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </div>
      
      {/* Glass Blur Overlay */}
      <div className="glass-overlay"></div>
      
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
