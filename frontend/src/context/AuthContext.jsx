import { createContext, useState, useEffect, useContext } from 'react';
import { loginUser, registerUser, getMe } from '../services/api';

// Create the context
const AuthContext = createContext();

// AuthProvider wraps the entire app and provides auth state to all components
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);      // stores logged in user info
  const [token, setToken] = useState(localStorage.getItem('token')); // get token from localStorage
  const [loading, setLoading] = useState(true); // loading state while checking auth

  // When app loads, check if token exists and fetch user info
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const { data } = await getMe();
          setUser(data);
        } catch (error) {
          // Token is invalid or expired, clear everything
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  // Login function - called from Login page
  const login = async (email, password) => {
    const { data } = await loginUser({ email, password });
    // Save token to localStorage so it persists after page refresh
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser({ _id: data._id, name: data.name, email: data.email });
    return data;
  };

  // Register function - called from Register page
  const register = async (name, email, password) => {
    const { data } = await registerUser({ name, email, password });
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser({ _id: data._id, name: data.name, email: data.email });
    return data;
  };

  // Logout function - clears everything
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context easily in any component
// Instead of writing useContext(AuthContext) every time, just write useAuth()
export const useAuth = () => useContext(AuthContext);

export default AuthContext;