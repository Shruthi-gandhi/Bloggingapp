// src/components/context/Context.jsx

import { createContext, useState, useEffect } from 'react';

// Create the context
export const UserContext = createContext();

// Named export of the provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : { userName: '', firstName: '' };
  });

  useEffect(() => {
    if (user.userName && user.firstName) {
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('user');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
