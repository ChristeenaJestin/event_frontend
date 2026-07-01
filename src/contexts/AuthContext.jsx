import { createContext, useState, useEffect } from 'react';
import * as authApi from '../api/authApi';
import { normalizeUser } from '../utils/helpers';

export const AuthContext = createContext(null);

const TOKEN_KEY = 'eventhub_token';
const USER_KEY  = 'eventhub_user';

export function AuthProvider({ children }) {
  const [user, setUser]     = useState(null);   // normalized user object
  const [loading, setLoading] = useState(true);

  // on app load: validate token with backend
  useEffect(() => {
    const init = async () => {
      const token      = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);
      if (!token) { setLoading(false); return; }
      try {
        // GET /api/users/profile — confirms token still valid
        const raw = await authApi.getCurrentUser();
        const normalized = normalizeUser(raw);
        setUser(normalized);
        localStorage.setItem(USER_KEY, JSON.stringify(normalized));
      } catch {
        // token expired — fall back to cached or clear
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
        }
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // POST /api/auth/login → { token, user }
  const login = async (credentials) => {
    const data = await authApi.login(credentials); // { token, user }
    const normalized = normalizeUser(data.user);
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(normalized));
    setUser(normalized);
    return normalized;
  };

  // POST /api/auth/register → { token, user }
  // register payload: { name, email, password }  ← backend only needs these three
  const register = async (payload) => {
    const data = await authApi.register(payload);
    const normalized = normalizeUser(data.user);
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(normalized));
    setUser(normalized);
    return normalized;
  };

  // POST /api/auth/logout
  const logout = async () => {
    try { await authApi.logout(); } catch { /* ignore */ }
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  // check if current user has any of the given roles
  const hasRole = (...roles) => !!user && roles.includes(user.role);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}
