"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "../llb/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  // Fetch user from backend cookies
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/me", { withCredentials: true });
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // 🔥 Automatic Redirect Control System
  useEffect(() => {
    if (loading) return;

    const publicRoutes = ["/", "/login", "/register"]; // unprotected pages

    // If user is logged in and tries to visit Home/login/register → redirect to dashboard
    if (user && publicRoutes.includes(pathname)) {
      router.replace("/dashboard");
    }

    // If NOT logged in and tries to visit protected routes
    if (!user && pathname.startsWith("/dashboard")) {
      router.replace("/login");
    }
  }, [user, loading, pathname]);


  // Login
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

  // Logout
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
