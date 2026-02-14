"use client";
import React, { useEffect, useState } from "react";
import axios from "../llb/axios";
import ProtectedRoute from "../components/ProtectedRoute";
import { Receipt, Calendar, Clock, CreditCard } from "lucide-react";

function Page() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("/subscription-history", {
        withCredentials: true,
      });

      if (res.data.success) {
        setHistory(res.data.history || []);
      }
    } catch (error) {
      console.error("History fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      case "failed":
        return "bg-gray-200 text-gray-700 border-gray-300";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="max-w-6xl mx-auto">
          
          {/* HEADER */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="p-2 sm:p-3 bg-indigo-100 rounded-xl">
              <Receipt className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
              Subscription History
            </h1>
          </div>

          {/* LOADING SKELETON */}
          {loading ? (
            <div className="grid gap-4 sm:gap-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-2xl p-5 sm:p-6 shadow animate-pulse"
                >
                  <div className="h-5 w-40 bg-gray-200 rounded mb-4"></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-4 bg-gray-200 rounded w-40"></div>
                    <div className="h-4 bg-gray-200 rounded w-36"></div>
                    <div className="h-4 bg-gray-200 rounded w-28"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : history.length === 0 ? (
            /* EMPTY STATE */
            <div className="bg-white rounded-2xl shadow-md p-8 sm:p-12 text-center border">
              <Receipt className="w-12 h-12 sm:w-14 sm:h-14 mx-auto text-gray-400 mb-4" />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
                No Subscription History
              </h2>
              <p className="text-gray-500 mt-2 text-sm sm:text-base">
                You haven’t purchased any subscription yet.
              </p>
            </div>
          ) : (
            /* HISTORY CARDS */
            <div className="grid gap-4 sm:gap-6">
              {history.map((sub) => (
                <div
                  key={sub._id}
                  className="bg-white rounded-2xl shadow-md border hover:shadow-lg transition-all duration-300 p-4 sm:p-6"
                >
                  {/* TOP ROW */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-indigo-600" />
                      <h2 className="text-base sm:text-lg font-semibold text-gray-800 break-all">
                        {sub.planId || "Premium Plan"}
                      </h2>
                    </div>

                    <span
                      className={`px-3 py-1 text-xs sm:text-sm rounded-full border font-semibold w-fit ${getStatusStyle(
                        sub.status
                      )}`}
                    >
                      {sub.status.toUpperCase()}
                    </span>
                  </div>

                  {/* DETAILS GRID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Amount:</span>
                      <span className="text-indigo-600 font-semibold">
                        ₹{sub.amount / 100}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 break-all">
                      <span className="font-medium">Sub ID:</span>
                      <span>{sub.subscriptionId || "N/A"}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>
                        {sub.currentStart
                          ? new Date(sub.currentStart).toLocaleDateString()
                          : "Start: N/A"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>
                        {sub.currentEnd
                          ? new Date(sub.currentEnd).toLocaleDateString()
                          : "End: N/A"}
                      </span>
                    </div>

                    {sub.status === "active" && (
                      <div className="flex items-center gap-2 text-green-600 font-medium">
                        <Clock className="w-4 h-4" />
                        {sub.daysRemaining || 0} days remaining
                      </div>
                    )}

                    <div className="text-gray-500 text-xs sm:text-sm">
                      Created:{" "}
                      {new Date(sub.createdAt).toLocaleDateString()}{" "}
                      {new Date(sub.createdAt).toLocaleTimeString()}
                    </div>
                  </div>

                  {/* PAYMENT BUTTON */}
                  {sub.shortUrl && sub.status === "created" && (
                    <div className="mt-5">
                      <a
                        href={sub.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-full sm:w-auto text-center bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow"
                      >
                        Complete Payment
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Page;
