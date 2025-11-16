"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "../llb/axios";
import ProtectedRoute from "../components/ProtectedRoute";
import toast, { Toaster } from "react-hot-toast";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  KeyIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

/* ------------------------------------------------------------------ */
/*  Validation Schemas                                                */
/* ------------------------------------------------------------------ */
const profileSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});

const passwordSchema = z.object({
  oldPassword: z.string().min(6, "Old password required"),
  newPassword: z.string().min(6, "New password must be 6+ characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

/* ------------------------------------------------------------------ */
/*  Main Page – Protected Only                                        */
/* ------------------------------------------------------------------ */
export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}

/* ------------------------------------------------------------------ */
/*  All UI + API Logic – NO Auth Checks Here                          */
/* ------------------------------------------------------------------ */
function ProfileContent() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [profile, setProfile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(profileSchema) });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: pwdErrors },
    reset: resetPassword,
  } = useForm({ resolver: zodResolver(passwordSchema) });

  /* ------------------- Fetch Profile ------------------- */
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/profile", { withCredentials: true });
        if (data.success) {
          setProfile(data.profile);
          reset(data.profile);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [reset]);

  /* ------------------- Update Profile ------------------- */
  const onSubmit = async (formData) => {
    setSaving(true);
    try {
      const { data } = await axios.put("/profile", formData, { withCredentials: true });
      if (data.success) {
        setProfile(data.profile);
        toast.success("Profile updated successfully!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  /* ------------------- Change Password ------------------- */
  const onPasswordChange = async (formData) => {
    try {
      const { data } = await axios.post("/change-password", formData, { withCredentials: true });
      if (data.success) {
        toast.success("Password changed successfully!");
        setShowPasswordModal(false);
        resetPassword();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Password change failed");
    }
  };

  /* ------------------- Delete Account ------------------- */
  const deleteAccount = async () => {
    if (!confirm("Warning: This will delete your account permanently. Continue?")) return;

    setDeleting(true);
    try {
      const { data } = await axios.delete("/profile", { withCredentials: true });
      if (data.success) {
        toast.success("Account deleted. Goodbye!");
        setTimeout(() => window.location.href = "/", 1500);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Deletion failed");
    } finally {
      setDeleting(false);
    }
  };

  /* ------------------- Loading State ------------------- */
  if (loading) return <ProfileSkeleton />;

  /* ------------------- Render UI ------------------- */
  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {profile?.username?.charAt(0).toUpperCase() || "U"}
            </div>
            <h1 className="mt-4 text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">Manage your account information</p>
          </div>

          {/* Profile Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <UserIcon className="w-5 h-5" />
                  Full Name
                </label>
                <input
                  {...register("username")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  placeholder="John Doe"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <EnvelopeIcon className="w-5 h-5" />
                  Email Address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <PhoneIcon className="w-5 h-5" />
                  Phone (Optional)
                </label>
                <input
                  {...register("phone")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  placeholder="+1234567890"
                />
              </div>

              {/* Save Button */}
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {saving ? (
                  <>
                    <ArrowPathIcon className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckIcon className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="flex items-center justify-center gap-2 bg-yellow-50 text-yellow-700 px-5 py-3 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition font-medium"
            >
              <KeyIcon className="w-5 h-5" />
              Change Password
            </button>

            <button
              onClick={deleteAccount}
              disabled={deleting}
              className="flex items-center justify-center gap-2 bg-red-50 text-red-600 px-5 py-3 rounded-lg border border-red-200 hover:bg-red-100 transition font-medium disabled:opacity-70"
            >
              {deleting ? (
                <ArrowPathIcon className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <TrashIcon className="w-5 h-5" />
                  Delete Account
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Change Password</h3>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  resetPassword();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit(onPasswordChange)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input
                  {...registerPassword("oldPassword")}
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                {pwdErrors.oldPassword && (
                  <p className="mt-1 text-sm text-red-600">{pwdErrors.oldPassword.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  {...registerPassword("newPassword")}
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                {pwdErrors.newPassword && (
                  <p className="mt-1 text-sm text-red-600">{pwdErrors.newPassword.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input
                  {...registerPassword("confirmPassword")}
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                {pwdErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{pwdErrors.confirmPassword.message}</p>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
                >
                  Update Password
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    resetPassword();
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Loading Skeleton                                                  */
/* ------------------------------------------------------------------ */
const ProfileSkeleton = () => (
  <div className="min-h-screen bg-gray-50 p-6">
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-center mb-8">
        <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-pulse space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        ))}
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  </div>
);