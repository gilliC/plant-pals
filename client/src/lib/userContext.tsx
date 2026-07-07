"use client";

import { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: number;
  name: string;
  role: string;
}

interface UserContextValue {
  user: User | null;
  isAdmin: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextValue | null>(null);

const STORAGE_KEY = "plant-pals-user";
const TOKEN_KEY = "plant-pals-token";

function loadUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = loadUser();
    if (stored) setUser(stored);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
      setToken(null);
    }
  }, [user]);

  function logout() {
    setUser(null);
  }

  const isAdmin = user?.role === "ADMIN";

  return (
    <UserContext value={{ user, setUser, logout, isAdmin }}>
      {children}
    </UserContext>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("Missing UserProvider");
  return ctx;
}
