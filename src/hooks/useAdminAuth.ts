import { useState, useCallback } from "react";

const SESSION_KEY = "utkarsh_admin_session";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(SESSION_KEY) === "true";
  });

  const login = useCallback((username: string, password: string): boolean => {
    const validUser = import.meta.env.VITE_ADMIN_USER;
    const validPass = import.meta.env.VITE_ADMIN_PASS;

    if (username === validUser && password === validPass) {
      localStorage.setItem(SESSION_KEY, "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, login, logout };
}
