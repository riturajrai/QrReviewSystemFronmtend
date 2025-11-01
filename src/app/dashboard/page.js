


"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const API_BASE = "https://reviwes-backend.onrender.com";

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({ users: 0, reviews: 0, rating: 0, qr: 0 });
  const [recentReviews, setRecentReviews] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrImage, setQrImage] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [qrLoading, setQrLoading] = useState(false);

  // Dummy / initial data loader
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setStats({ users: 1248, reviews: 342, rating: 4.6, qr: 278 });
      setRecentReviews([
        { id: 1, name: "Rohit Sharma", rating: 5, text: "Great service!" },
        { id: 2, name: "Priya Singh", rating: 4, text: "Good experience." },
        { id: 3, name: "Aman Verma", rating: 5, text: "Highly recommended." },
      ]);
      setMonthlyData([
        { month: "Jan", reviews: 40, rating: 4.3, scans: 30 },
        { month: "Feb", reviews: 55, rating: 4.5, scans: 50 },
        { month: "Mar", reviews: 70, rating: 4.7, scans: 65 },
        { month: "Apr", reviews: 60, rating: 4.2, scans: 40 },
        { month: "May", reviews: 75, rating: 4.8, scans: 55 },
        { month: "Jun", reviews: 85, rating: 4.6, scans: 70 },
        { month: "Jul", reviews: 90, rating: 4.9, scans: 80 },
        { month: "Aug", reviews: 65, rating: 4.4, scans: 60 },
        { month: "Sep", reviews: 78, rating: 4.7, scans: 50 },
        { month: "Oct", reviews: 88, rating: 4.9, scans: 75 },
        { month: "Nov", reviews: 95, rating: 5.0, scans: 90 },
        { month: "Dec", reviews: 100, rating: 4.8, scans: 85 },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  // QR Generator
  const handleGenerateQR = async () => {
    setQrLoading(true);
    setQrImage("");
    try {
      const id = Math.random().toString(36).substring(2, 10);
      setUniqueId(id);
      const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
      const qrLink = `${origin}/feedback/${id}`;

      try {
        await fetch(`${API_BASE}/upload-qr`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            qrId: id,
            qrLink,
            createdAt: new Date().toISOString(),
          }),
        });
      } catch (err) {
        console.warn("upload-qr failed (backend)", err);
      }

      const qr = await QRCode.toDataURL(qrLink);
      setQrImage(qr);
    } catch (error) {
      console.error("QR generation error:", error);
      alert("Failed to generate QR");
    } finally {
      setQrLoading(false);
    }
  };

  // Download QR
  const handleDownloadQR = () => {
    if (!qrImage) return;
    const link = document.createElement("a");
    link.href = qrImage;
    link.download = `FeedbackQR_${uniqueId}.png`;
    link.click();
  };

  // Open Feedback Page
  const handleOpenFeedback = () => {
    if (!uniqueId) return;
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    window.open(`${origin}/feedback/${uniqueId}`, "_blank");
  };

  return (
    <div className={`min-h-screen font-sans transition-all duration-300 ${showQRModal ? "backdrop-blur-sm" : "bg-gray-50"}`}>
      <main className="flex-1 p-6 relative">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h2>
            <p className="text-sm text-gray-500">Welcome back — here’s your monthly summary.</p>
          </div>
          <div className="flex items-center gap-4">
            <input
              className="hidden sm:block border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-300"
              placeholder="Search reviews, users..."
            />
            <button
              onClick={() => setShowQRModal(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-200 shadow"
            >
              Create QR
            </button>
          </div>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total Users" value={loading ? "..." : stats.users} />
          <StatCard title="Total Reviews" value={loading ? "..." : stats.reviews} />
          <StatCard title="Avg. Rating" value={loading ? "..." : stats.rating} />
          <StatCard title="Total QR Codes" value={loading ? "..." : stats.qr} />
        </section>

        {/* Charts + Recent reviews */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white border rounded-lg p-5 shadow hover:shadow-lg transition-all duration-200">
            <h3 className="font-medium mb-3 text-gray-700">Monthly QR Scans & Ratings</h3>
            <div className="h-72">
              {loading ? (
                <p className="text-gray-500 text-center mt-10">Loading chart...</p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="scans" stroke="#6366F1" strokeWidth={2.5} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="rating" stroke="#10B981" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Recent Reviews */}
          <aside className="space-y-6">
            <div className="bg-white border rounded-lg p-5 shadow hover:shadow-lg transition-all duration-200">
              <h3 className="font-medium mb-3 text-gray-700">Recent Reviews</h3>
              <div className="space-y-3">
                {loading ? (
                  <p className="text-sm text-gray-500">Loading...</p>
                ) : (
                  recentReviews.map((r) => (
                    <div key={r.id} className="border rounded-md p-3 hover:bg-indigo-50 transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{r.name}</div>
                          <div className="text-xs text-gray-500">{r.rating} ★</div>
                        </div>
                        <div className="text-sm text-gray-600">ID #{r.id}</div>
                      </div>
                      <p className="text-sm mt-2 text-gray-700">{r.text}</p>
                    </div>
                  ))
                )}
              </div>
              <button
                onClick={() => router.push("/reviews")}
                className="mt-4 text-sm text-indigo-600 hover:underline"
              >
                View all reviews
              </button>
            </div>
          </aside>
        </section>

        {/* QR Modal */}
        {showQRModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center relative">
              <button
                onClick={() => {
                  setShowQRModal(false);
                  setQrImage("");
                }}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Generate Feedback QR</h2>

              <button
                onClick={handleGenerateQR}
                disabled={qrLoading}
                className={`px-6 py-3 rounded-xl text-white font-semibold ${
                  qrLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {qrLoading ? "Generating..." : "Generate QR"}
              </button>

              {qrImage && (
                <div className="mt-6">
                  <img src={qrImage} alt="QR Code" className="w-48 h-48 mx-auto border-2 border-gray-200 p-2 rounded-xl" />
                  <p className="mt-4 text-gray-700 text-sm">
                    Unique ID: <b>{uniqueId}</b>
                  </p>
                  <p className="text-gray-500 text-sm mt-1">Scan this QR to open Feedback Page</p>
                  <div className="flex gap-3 justify-center mt-4">
                    <button
                      onClick={handleDownloadQR}
                      className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
                    >
                      Download QR
                    </button>
                    <button
                      onClick={handleOpenFeedback}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow"
                    >
                      Open Feedback Page
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white border rounded-lg p-4 flex items-center justify-between shadow hover:scale-105 transition-transform duration-200">
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>
      <div className="text-sm text-gray-400">↗</div>
    </div>
  );
}






