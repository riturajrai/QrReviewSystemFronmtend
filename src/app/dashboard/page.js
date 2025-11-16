"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../llb/axios";
import ProtectedRoute from "../components/ProtectedRoute";
import {
  UserGroupIcon,
  CalendarIcon,
  StarIcon,
  ChatBubbleLeftIcon,
  ClockIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

// Main Page Component
const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
};

// Inner Content Component
const DashboardContent = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoadingStats(true);
      const res = await axios.get("/dashboard-stats", { withCredentials: true });
      if (res.data.success) {
        setStats(res.data.stats);
      } else {
        setError("Failed to fetch dashboard stats");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoadingStats(false);
    }
  };

  if (loadingStats) return <LoadingSkeleton />;
  if (error) return <ErrorMessage error={error} onRetry={fetchDashboardStats} />;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Welcome back, {user?.username?.split(" ")[0]}!
          </h1>
          <p className="mt-2 text-gray-600">Here's your feedback dashboard overview.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard
            title="Total Submissions"
            value={stats.totalSubmissions}
            icon={<UserGroupIcon className="w-8 h-8 text-indigo-600" />}
            bgColor="bg-indigo-50"
            borderColor="border-indigo-200"
          />
          <StatCard
            title="Today's Submissions"
            value={stats.todaySubmissions}
            icon={<CalendarIcon className="w-8 h-8 text-green-600" />}
            bgColor="bg-green-50"
            borderColor="border-green-200"
          />
          <StatCard
            title="Average Rating"
            value={
              stats.ratings.length > 0
                ? (
                    stats.ratings.reduce((acc, r) => acc + r._id * r.count, 0) /
                    stats.ratings.reduce((acc, r) => acc + r.count, 0)
                  ).toFixed(1) + " stars"
                : "No ratings"
            }
            icon={<StarIcon className="w-8 h-8 text-yellow-600" />}
            bgColor="bg-yellow-50"
            borderColor="border-yellow-200"
          />
        </div>

        {/* Rating Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <StarIcon className="w-6 h-6 text-indigo-600" />
            Rating Distribution
          </h2>
          {stats.ratings.length === 0 ? (
            <p className="text-gray-500 italic">No ratings yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.ratings
                .sort((a, b) => b._id - a._id)
                .map((r) => (
                  <div key={r._id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700">
                        {r._id} Star{r._id > 1 ? "s" : ""}
                      </span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-5 h-5 ${
                              i < r._id ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-600">{r.count} votes</span>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Recent Submissions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <ChatBubbleLeftIcon className="w-6 h-6 text-indigo-600" />
              Recent Submissions
            </h2>
          </div>
          {stats.totalSubmissions === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <ChatBubbleLeftIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p>No submissions yet. Start collecting feedback!</p>
            </div>
          ) : (
            <RecentSubmissionsTable />
          )}
        </div>
      </div>
    </div>
  );
};

// === Reusable Components ===

const StatCard = ({ title, value, icon, bgColor, borderColor }) => (
  <div className={`${bgColor} ${borderColor} border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow`}>
    <div className="flex items-center justify-between mb-3">
      <div className="p-3 bg-white rounded-lg shadow-sm">{icon}</div>
      <span className="text-3xl font-bold text-gray-800">{value}</span>
    </div>
    <h3 className="text-sm font-medium text-gray-600">{title}</h3>
  </div>
);

const RecentSubmissionsTable = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get("/my-feedbacks", { withCredentials: true });
        if (res.data.success) {
          setFeedbacks(res.data.feedbacks.slice(0, 10));
        } else {
          setError("Failed to fetch submissions");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  if (loading) return <TableSkeleton />;
  if (error) return <p className="p-6 text-red-600 text-center">{error}</p>;
  if (feedbacks.length === 0) return <p className="p-8 text-center text-gray-500">No submissions found.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-gray-50 text-gray-700">
          <tr>
            <th className="px-6 py-4 font-medium">Name</th>
            <th className="px-6 py-4 font-medium hidden sm:table-cell">Phone</th>
            <th className="px-6 py-4 font-medium hidden md:table-cell">Message</th>
            <th className="px-6 py-4 font-medium text-center">Rating</th>
            <th className="px-6 py-4 font-medium hidden lg:table-cell">Submitted</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {feedbacks.map((fb) => (
            <tr key={fb._id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 font-medium text-gray-900">{fb.name || "-"}</td>
              <td className="px-6 py-4 text-gray-600 hidden sm:table-cell">{fb.phone || "-"}</td>
              <td className="px-6 py-4 text-gray-600 hidden md:table-cell max-w-xs truncate">
                {fb.message || "-"}
              </td>
              <td className="px-6 py-4 text-center">
                {fb.rating ? (
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-5 h-5 ${
                          i < fb.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                ) : (
                  "-"
                )}
              </td>
              <td className="px-6 py-4 text-gray-600 hidden lg:table-cell">
                <div className="flex items-center gap-1 text-xs">
                  <ClockIcon className="w-4 h-4" />
                  {new Date(fb.createdAt).toLocaleDateString()}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile View */}
      <div className="sm:hidden">
        {feedbacks.map((fb) => (
          <div key={fb._id} className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <p className="font-medium text-gray-900">{fb.name || "Anonymous"}</p>
              {fb.rating && (
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-4 h-4 ${
                        i < fb.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
            {fb.phone && <p className="text-sm text-gray-600 mb-1">Phone: {fb.phone}</p>}
            {fb.message && <p className="text-sm text-gray-700 mb-2 italic">"{fb.message}"</p>}
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              {new Date(fb.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-gray-50 p-6">
    <div className="max-w-7xl mx-auto">
      <div className="h-10 bg-gray-200 rounded w-64 mb-8 animate-pulse"></div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
            <div className="h-12 bg-gray-200 rounded mb-3"></div>
            <div className="h-5 bg-gray-200 rounded w-32"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TableSkeleton = () => (
  <div className="p-6">
    <div className="space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
      ))}
    </div>
  </div>
);

const ErrorMessage = ({ error, onRetry }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center p-8 bg-white rounded-xl shadow-lg">
      <p className="text-red-600 font-semibold">{error}</p>
      <button
        onClick={onRetry}
        className="mt-4 inline-flex items-center gap-2 bg-indigo-500 text-white px-5 py-2 rounded-lg hover:bg-indigo-600 transition"
      >
        <ArrowPathIcon className="w-5 h-5" />
        Retry
      </button>
    </div>
  </div>
);

// EXPORT DEFAULT DASHBOARDPAGE
export default DashboardPage;