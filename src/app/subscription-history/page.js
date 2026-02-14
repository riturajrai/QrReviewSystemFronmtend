"use client";
import React, { useEffect, useState } from "react";
import axios from "../llb/axios";
import ProtectedRoute from "../components/ProtectedRoute";

function Page() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("/subscription-history", {
        withCredentials: true, // IMPORTANT for auth cookie
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

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Subscription History
          </h1>

          {loading ? (
            <div className="text-center text-lg font-medium">
              Loading history...
            </div>
          ) : history.length === 0 ? (
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <p className="text-gray-600 text-lg">
                No subscription history found
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {history.map((sub) => (
                <div
                  key={sub._id}
                  className="bg-white p-5 rounded-xl shadow border"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Plan ID: {sub.planId}
                    </h2>

                    <span
                      className={`px-3 py-1 text-sm rounded-full font-medium ${
                        sub.status === "active"
                          ? "bg-green-100 text-green-700"
                          : sub.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : sub.status === "failed"
                          ? "bg-gray-200 text-gray-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {sub.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
                    <p>
                      <span className="font-medium">Amount:</span> ₹
                      {sub.amount / 100}
                    </p>

                    <p>
                      <span className="font-medium">Subscription ID:</span>{" "}
                      {sub.subscriptionId || "N/A"}
                    </p>

                    <p>
                      <span className="font-medium">Start Date:</span>{" "}
                      {sub.currentStart
                        ? new Date(sub.currentStart).toLocaleString()
                        : "N/A"}
                    </p>

                    <p>
                      <span className="font-medium">End Date:</span>{" "}
                      {sub.currentEnd
                        ? new Date(sub.currentEnd).toLocaleString()
                        : "N/A"}
                    </p>

                    {sub.status === "active" && (
                      <p className="text-green-600 font-medium">
                        Days Remaining: {sub.daysRemaining || 0} days
                      </p>
                    )}

                    <p>
                      <span className="font-medium">Created At:</span>{" "}
                      {new Date(sub.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {sub.shortUrl && (
                    <div className="mt-3">
                      <a
                        href={sub.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 font-medium hover:underline"
                      >
                        Open Payment Link
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
