import React, { createContext, useContext, useEffect, useState } from "react";
import { login as loginApi, register as registerApi } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("rc_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("rc_token") || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("rc_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("rc_user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("rc_token", token);
    } else {
      localStorage.removeItem("rc_token");
    }
  }, [token]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const { user, token } = await loginApi(credentials);
      setUser(user);
      setToken(token);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    setLoading(true);
    try {
      await registerApi(data);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
