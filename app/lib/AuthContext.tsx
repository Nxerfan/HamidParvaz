"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { User } from "../types/index";
import { logout as serverLogout } from "../actions/auth";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  isAuthenticated: false,
  login: () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount: read saved user from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("auth_user");
      if (stored) {
        const parsed = JSON.parse(stored) as User;
        setUser(parsed);
      }
    } catch {
      localStorage.removeItem("auth_user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback((userData: User) => {
    setUser(userData);
    try {
      localStorage.setItem("auth_user", JSON.stringify(userData));
    } catch {
      // localStorage may be unavailable
    }
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    try {
      localStorage.removeItem("auth_user");
    } catch {
      // localStorage may be unavailable
    }
    // Fire-and-forget the server-side logout (clear httpOnly cookie)
    try {
      await serverLogout();
    } catch {
      // Ignore server errors during logout
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
