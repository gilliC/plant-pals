"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiPath } from "../../lib/utils";
import { useUser, type User } from "../../lib/userContext";

interface AuthResponse {
  token: string;
  user: User;
}

interface AuthPayload {
  name: string;
  password: string;
}

const loginPath = getApiPath("/auth/login");
const registerPath = getApiPath("/auth/register");

async function loginUser(data: AuthPayload) {
  const res = await fetch(loginPath, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Login failed");
  }
  return res.json();
}

async function registerUser(data: AuthPayload) {
  const res = await fetch(registerPath, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Registration failed");
  }
  return res.json();
}

export function useAuth(onSuccess: () => void) {
  const { setUser } = useUser();

  const login = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: AuthResponse) => {
      setUser(data.user);
      onSuccess();
    },
    onError: (err: Error) => {
      toast.error(err.message || "Invalid credentials");
    },
  });

  const register = useMutation({
    mutationFn: registerUser,
    onSuccess: (data: User) => {
      setUser(data);
      toast.success("Account created! You are now signed in.");
      onSuccess();
    },
    onError: (err: Error) => {
      toast.error(err.message || "Registration failed");
    },
  });

  return { login, register };
}
