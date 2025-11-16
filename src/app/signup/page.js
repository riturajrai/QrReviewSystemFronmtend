"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import axios from "../llb/axios";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import SignupImage from "../../../public/signupimage.png";

const signupSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post("/signup", data, { withCredentials: true });

      if (res.data.success) {
        toast.success(res.data.message || "Account created!");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        toast.error(res.data.message || "Signup failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col lg:flex-row">
        {/* Left: Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100"
          >
            {/* Logo */}
            {/* <div className="flex justify-center mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl sm:text-2xl">G</span>
              </div>
            </div> */}

            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-center text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8">
              Join <span className="font-semibold text-indigo-600">GoogleReviewsPro</span> today
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Username */}
              <div>
                <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  <UserIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  Full Name
                </label>
                <div className="relative">
                  <input
                    {...register("username")}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-xs sm:text-sm"
                    placeholder="John Doe"
                  />
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                </div>
                {errors.username && (
                  <p className="mt-1 text-xs text-red-600">{errors.username.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  <EnvelopeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-xs sm:text-sm"
                    placeholder="you@example.com"
                  />
                  <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                </div>
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
                    className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-xs sm:text-sm"
                    placeholder="••••••••"
                  />
                  <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
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

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-md text-xs sm:text-sm"
              >
                {loading ? (
                  <>
                    <ArrowPathIcon className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-xs sm:text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-indigo-600 font-medium hover:text-indigo-700">
                Sign in
              </Link>
            </p>

            <p className="mt-8 text-center text-xs text-gray-500">
              Powered by{" "}
              <span className="font-semibold text-indigo-600">GoogleReviewsPro</span>
            </p>
          </motion.div>
        </div>

        {/* Right: Image */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-12 bg-gradient-to-bl from-indigo-50 to-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-center"
          >
            <Image
              src={SignupImage}
              alt="Welcome to GoogleReviewsPro"
              width={450}
              height={450}
              className="object-contain drop-shadow-2xl"
              priority
            />
            <p className="mt-6 text-lg font-medium text-gray-700">
              Start collecting real customer feedback today
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Simple. Fast. Beautiful.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
