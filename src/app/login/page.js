"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      toast.success("Login successful! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch (err) {
      toast.error(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-300">
            {/* Logo */}
            {/* <div className="flex justify-center mb-6 sm:mb-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl sm:text-2xl">G</span>
              </div>
            </div> */}

            <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-center text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8">
              Sign in to manage your feedback
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  <EnvelopeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  Email Address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-xs sm:text-sm"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  <LockClosedIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-xs sm:text-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-md text-xs sm:text-sm"
              >
                {loading ? (
                  <>
                    <ArrowPathIcon className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Links */}
            <div className="mt-6 text-center space-y-2">
              <Link
                href="/forgot-password"
                className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Forgot your password?
              </Link>
              <p className="text-xs sm:text-sm text-gray-600">
                Don’t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>

            {/* Footer */}
            <p className="mt-8 text-center text-xs text-gray-500">
              Powered by{" "}
              <span className="font-semibold text-indigo-600">GoogleReviewsPro</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}