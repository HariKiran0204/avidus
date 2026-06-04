import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import axiosInstance from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Configure axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // ensure the app's axios instance also has the auth header
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Fetch current user on mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        if (token) {
          const response = await axios.get(`${API_URL}/auth/me`);
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        localStorage.removeItem('token');
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [token, API_URL]);

  const register = useCallback(async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password
      });
      const { token, user } = response.data;
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }, [API_URL]);

  const login = useCallback(async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      const { token, user } = response.data;
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }, [API_URL]);

  const logout = useCallback(async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [API_URL]);

  const value = {
    user,
    loading,
    token,
    isAuthenticated: !!token,
    isAdmin: user?.role === 'Admin',
    register,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
