"use client";

import React, { useEffect, useState, useMemo } from "react";
import axios from "../llb/axios";
import ProtectedRoute from "../components/ProtectedRoute";
import {
  ChatBubbleLeftIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  StarIcon,
  ClockIcon,
  DocumentArrowDownIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

/* ------------------------------------------------------------------ */
/*  Main Page – Protected Only                                        */
/* ------------------------------------------------------------------ */
export default function SubmissionsPage() {
  return (
    <ProtectedRoute>
      <SubmissionsContent />
    </ProtectedRoute>
  );
}

/* ------------------------------------------------------------------ */
/*  All UI + API Logic – NO Auth Checks Here                          */
/* ------------------------------------------------------------------ */
function SubmissionsContent() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [copiedId, setCopiedId] = useState("");

  const ITEMS_PER_PAGE = 10;

  /* ------------------- Fetch Feedbacks ------------------- */
  const fetchFeedbacks = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get("/my-feedbacks", { withCredentials: true });
      if (data.success) {
        const sorted = data.feedbacks.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setFeedbacks(sorted);
      } else {
        setError("Failed to fetch submissions");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  /* ------------------- Search & Filter ------------------- */
  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter((fb) => {
      const term = search.toLowerCase();
      return (
        (fb.name?.toLowerCase().includes(term)) ||
        (fb.phone?.includes(search)) ||
        (fb.message?.toLowerCase().includes(term))
      );
    });
  }, [feedbacks, search]);

  /* ------------------- Pagination ------------------- */
  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredFeedbacks.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredFeedbacks, page]);

  const totalPages = Math.ceil(filteredFeedbacks.length / ITEMS_PER_PAGE);

  /* ------------------- Copy Phone ------------------- */
  const copyPhone = (phone, id) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 2000);
  };

  /* ------------------- Export to CSV ------------------- */
  const exportCSV = () => {
    const headers = ["Name", "Phone", "Message", "Rating", "Submitted At"];
    const rows = filteredFeedbacks.map((fb) => [
      fb.name || "",
      fb.phone || "",
      fb.message || "",
      fb.rating || "",
      new Date(fb.createdAt).toLocaleString(),
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `submissions_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  /* ------------------- Render UI ------------------- */
  if (loading) return <SubmissionsSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg border border-red-200 p-8 text-center max-w-md">
          <ExclamationTriangleIcon className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-red-700 font-medium mb-4">{error}</p>
          <button
            onClick={fetchFeedbacks}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition text-xs sm:text-sm"
          >
            <ArrowPathIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 flex items-center gap-3">
            <ChatBubbleLeftIcon className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600" />
            All Submissions
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            View and manage all customer feedback
          </p>
        </div>

        {/* Search & Export */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, phone, or message..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-xs sm:text-sm"
            />
          </div>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition text-xs sm:text-sm"
          >
            <DocumentArrowDownIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            Export CSV
          </button>
        </div>

        {/* Empty State */}
        {filteredFeedbacks.length === 0 ? (
          <EmptyState search={search} />
        ) : (
          <>
            {/* Desktop Table (md+) */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left font-medium text-xs sm:text-sm">Name</th>
                      <th className="px-6 py-4 text-left font-medium text-xs sm:text-sm">Phone</th>
                      <th className="px-6 py-4 text-left font-medium text-xs sm:text-sm">Message</th>
                      <th className="px-6 py-4 text-center font-medium text-xs sm:text-sm">Rating</th>
                      <th className="px-6 py-4 text-left font-medium text-xs sm:text-sm">Submitted</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginated.map((fb) => (
                      <tr key={fb._id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 font-medium text-gray-900 text-xs sm:text-sm">
                          {fb.name || "Anonymous"}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          <div className="flex items-center gap-2">
                            <PhoneIcon className="w-4 h-4 text-gray-400" />
                            <span className="text-xs sm:text-sm">{fb.phone || "-"}</span>
                            {fb.phone && (
                              <button
                                onClick={() => copyPhone(fb.phone, fb._id)}
                                className="text-indigo-600 hover:text-indigo-800 text-xs font-medium"
                              >
                                {copiedId === fb._id ? "Copied!" : "Copy"}
                              </button>
                            )}
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 text-gray-700 max-w-xs truncate text-xs sm:text-sm"
                          title={fb.message}
                        >
                          {fb.message || "-"}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {fb.rating ? (
                            <div className="flex justify-center">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon
                                  key={i}
                                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                    i < fb.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          ) : (
                            <span className="text-xs sm:text-sm text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          <div className="flex items-center gap-1 text-xs sm:text-sm">
                            <ClockIcon className="w-4 h-4" />
                            {new Date(fb.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {paginated.map((fb) => (
                <div
                  key={fb._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-5"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900 text-xs sm:text-sm">
                      {fb.name || "Anonymous"}
                    </h3>
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

                  {fb.phone && (
                    <p className="text-xs text-gray-600 mb-2 flex items-center gap-2">
                      <PhoneIcon className="w-4 h-4" />
                      {fb.phone}
                      <button
                        onClick={() => copyPhone(fb.phone, fb._id)}
                        className="text-indigo-600 text-xs hover:underline font-medium"
                      >
                        {copiedId === fb._id ? "Copied!" : "Copy"}
                      </button>
                    </p>
                  )}

                  {fb.message && (
                    <p className="text-xs italic text-gray-700 mb-3">"{fb.message}"</p>
                  )}

                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    {new Date(fb.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-3">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                >
                  Previous
                </button>
                <span className="text-xs sm:text-sm text-gray-600 font-medium">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Empty State                                                       */
/* ------------------------------------------------------------------ */
const EmptyState = ({ search }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
    <ChatBubbleLeftIcon className="w-16 h-16 sm:w-20 sm:h-20 text-gray-300 mx-auto mb-4" />
    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
      {search ? "No matching submissions" : "No submissions yet"}
    </h3>
    <p className="text-xs sm:text-sm text-gray-600">
      {search
        ? "Try adjusting your search term."
        : "Start collecting feedback using your QR code or link."}
    </p>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Loading Skeleton                                                  */
/* ------------------------------------------------------------------ */
const SubmissionsSkeleton = () => (
  <div className="min-h-screen bg-gray-50 p-6">
    <div className="max-w-7xl mx-auto">
      <div className="h-8 sm:h-10 bg-gray-200 rounded w-64 mb-8 animate-pulse"></div>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-pulse"
          >
            <div className="h-5 sm:h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 sm:h-5 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
