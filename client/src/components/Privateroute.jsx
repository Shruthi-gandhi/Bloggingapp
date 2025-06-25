import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const Privateroute = () => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    setAuthenticated(!!token);
  }, []);

  if (authenticated === null) {
    return null; // Optionally render a loading indicator or similar while checking
  }

  return authenticated ? <Outlet /> : <Navigate replace to="/" />;
};




export const Bypassroute = () => {
    const token = sessionStorage.getItem('accessToken');
    
    if (token) {
        return <Navigate replace to="/home" />;
    } else {
        return <Outlet />;
    }
};
