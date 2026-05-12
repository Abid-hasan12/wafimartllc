import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Load users database from localStorage
    const savedUsers = localStorage.getItem('wafi_users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }

    // Load current logged-in user
    const savedUser = localStorage.getItem('wafi_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Register a new user
  const signup = (username, phone, pin, password = null) => {
    const newUser = {
      id: Date.now(),
      username,
      phone,
      pin,
      password,
      loginType: password ? 'password' : 'pin',
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('wafi_users', JSON.stringify(updatedUsers));

    return newUser;
  };

  // Login with PIN
  const loginWithPIN = (username, pin) => {
    const foundUser = users.find(u => u.username === username && u.pin === pin);
    if (foundUser) {
      const userData = {
        id: foundUser.id,
        username: foundUser.username,
        phone: foundUser.phone,
        loginType: 'pin',
        loginTime: new Date().toISOString()
      };
      setUser(userData);
      localStorage.setItem('wafi_user', JSON.stringify(userData));
      return userData;
    }
    return null;
  };

  // Login with Password
  const loginWithPassword = (username, password) => {
    const foundUser = users.find(u => u.username === username && u.password === password);
    if (foundUser) {
      const userData = {
        id: foundUser.id,
        username: foundUser.username,
        phone: foundUser.phone,
        loginType: 'password',
        loginTime: new Date().toISOString()
      };
      setUser(userData);
      localStorage.setItem('wafi_user', JSON.stringify(userData));
      return userData;
    }
    return null;
  };

  // Social Login (dummy)
  const loginWithSocial = (provider) => {
    const userData = {
      id: Date.now(),
      username: 'Guest User',
      phone: 'N/A',
      loginType: provider, // 'google' or 'facebook'
      loginTime: new Date().toISOString()
    };
    setUser(userData);
    localStorage.setItem('wafi_user', JSON.stringify(userData));
    return userData;
  };

  // Traditional login (backwards compatibility)
  const login = (username) => {
    const userData = { username };
    setUser(userData);
    localStorage.setItem('wafi_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wafi_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      signup, 
      loginWithPIN, 
      loginWithPassword, 
      loginWithSocial,
      users 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);