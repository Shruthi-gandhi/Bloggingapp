import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const GlobalStyle = styled(Box)({
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
});

const LandingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '96vh',
  backgroundColor: '#f5f5f5',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  zIndex: 1,
  padding: '0 20px', // Add padding for small screens
  [theme.breakpoints.down('sm')]: {
    padding: '0 10px', // Adjust padding for even smaller screens
  },
}));

const TopLeftTypography = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: '20px',
  left: '20px',
  fontSize: '2rem',
  color: '#333',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem', // Adjust font size for small screens
    top: '15px',
    left: '15px',
  },
}));

export function Landing() {
  const navigate = useNavigate();
  sessionStorage.clear();
  return (
    <GlobalStyle>
      <LandingContainer>
        <TopLeftTypography>
          Welcome
        </TopLeftTypography>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', sm: '2.6rem' }, // Responsive font size
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '20px',
          }}
        >
          Stories worth sharing, insights worth exploring...
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: '1.2rem', sm: '1.5rem' }, // Responsive font size
            color: '#666',
            marginBottom: '40px',
          }}
        >
          Explore. Express. Connect.
        </Typography>
        <Box>
          <Button
            variant="outlined"
            sx={{
              margin: '20px 10px',
              padding: { xs: '8px 20px', sm: '10px 30px' }, // Responsive padding
              fontSize: { xs: '16px', sm: '18px' }, // Responsive font size
              borderRadius: '10px',
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              margin: '20px 10px',
              padding: { xs: '8px 20px', sm: '10px 30px' }, // Responsive padding
              fontSize: { xs: '16px', sm: '18px' }, // Responsive font size
              borderRadius: '10px',
            }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </Box>
      </LandingContainer>
    </GlobalStyle>
  );
}
