"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "../llb/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch logged-in user from backend cookie
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/me", { withCredentials: true });
        setUser(res.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Login handler
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );

      setUser(res.data.user);
      router.push("/dashboard");

      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  // Logout handler
  const logout = async () => {
    try {
      await axios.post("/logout", {}, { withCredentials: true });
      setUser(null);
      router.push("/login");
    } catch (error) {
      throw new Error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
