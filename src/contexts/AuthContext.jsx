import { createContext, useState, useEffect } from "react";
import * as authApi from "../api/authApi";
import { normalizeUser } from "../utils/helpers";

export const AuthContext = createContext(null);

const TOKEN_KEY = "eventhub_token";
const USER_KEY = "eventhub_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem(TOKEN_KEY);

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await authApi.getCurrentUser();

        // backend returns { success:true,data:{...} }
        const normalized = normalizeUser(response);

        setUser(normalized);

        localStorage.setItem(
          USER_KEY,
          JSON.stringify(normalized)
        );
      } catch (err) {
        console.error(err);

        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const login = async (credentials) => {
    const data = await authApi.login(credentials);

    const normalized = normalizeUser(data.user);

    localStorage.setItem(TOKEN_KEY, data.token);

    localStorage.setItem(
      USER_KEY,
      JSON.stringify(normalized)
    );

    setUser(normalized);

    return normalized;
  };

  const register = async (payload) => {
    const data = await authApi.register(payload);

    const normalized = normalizeUser(data.user);

   localStorage.setItem(

TOKEN_KEY,

data.token

);

localStorage.setItem(

USER_KEY,

JSON.stringify(normalizeUser(data.user))

);
    setUser(normalized);

    return normalized;
  };

  const updateUser = (updatedUser) => {
    const normalized = normalizeUser(updatedUser);

    setUser(normalized);

    localStorage.setItem(
      USER_KEY,
      JSON.stringify(normalized)
    );
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {}

    setUser(null);

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  const hasRole = (...roles) =>
    !!user && roles.includes(user.role);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}