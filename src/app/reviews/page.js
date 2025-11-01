// app/reviews/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = "https://reviwes-backend.onrender.com"; // <-- change to your backend

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/reviews`);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const data = await res.json();
      // assume backend returns array
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch reviews error:", err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">All Reviews</h1>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="space-y-4">
          {loading ? (
            <p className="text-gray-500">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            reviews.map((r, idx) => (
              <div key={r.id ?? idx} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{r.name ?? r.user ?? "Unknown"}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(r.createdAt ?? Date.now()).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">{r.rating ?? "—"} ★</div>
                </div>
                <p className="mt-2 text-gray-700">{r.comments ?? r.text ?? r.feedback ?? ""}</p>
                <div className="text-xs text-gray-400 mt-2">QR ID: {r.qrId ?? "—"}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
