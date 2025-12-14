"use client";

import { useEffect, useState } from "react";
import axios from "../llb/axios";
import ProtectedRoute from "../components/ProtectedRoute";
import {
  QrCodeIcon,
  LinkIcon,
  TrashIcon,
  ArrowPathIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

export default function QRPage() {
  return (
    <ProtectedRoute>
      <QRContent />
    </ProtectedRoute>
  );
}

function QRContent() {
  const [qr, setQr] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [loadingQR, setLoadingQR] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState(0);

  // Customizations
  const [qrColor, setQrColor] = useState("#000000");
  const [customText, setCustomText] = useState("Scan for Feedback");
  const [textColor, setTextColor] = useState("#000000");

  const API_BASE = "http://localhost:5000/api";

  /* ------------------- Fetch Existing QR ------------------- */
  const fetchQR = async () => {
    setFetching(true);
    setError("");
    try {
      const { data } = await axios.get(`${API_BASE}/my-qr`, {
        withCredentials: true,
      });
      setQr(data.success ? data.qr : null);
    } catch (e) {
      console.error("Fetch QR error:", e);
      setError("Failed to load QR code. Please try again.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchQR();
  }, []);

  /* ------------------- Generate New QR ------------------- */
  const generateQR = async () => {
    setLoadingQR(true);
    setError("");
    try {
      const { data } = await axios.post(
        `${API_BASE}/generate-qr`,
        {},
        { withCredentials: true }
      );
      if (data.success) {
        setQr(data.qr);
        setSelectedFrame(0);
        setQrColor("#000000");
        setCustomText("Scan for Feedback");
        setTextColor("#000000");
      } else {
        setError(data.message || "Failed to generate QR");
      }
    } catch (e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoadingQR(false);
    }
  };

  /* ------------------- Delete QR ------------------- */
  const deleteQR = async () => {
    setLoadingQR(true);
    setError("");
    try {
      const { data } = await axios.delete(`${API_BASE}/delete-qr`, {
        withCredentials: true,
      });
      if (data.success) {
        setQr(null);
        setSelectedFrame(0);
        setShowDeleteDialog(false);
      } else {
        setError(data.message || "Failed to delete QR");
      }
    } catch (e) {
      setError("Failed to delete QR. Please try again.");
    } finally {
      setLoadingQR(false);
    }
  };

  /* ------------------- Copy Link ------------------- */
  const copyLink = async () => {
    if (!qr?.data) return;
    try {
      await navigator.clipboard.writeText(qr.data);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      alert("Failed to copy link.");
    }
  };

  /* ------------------- Download QR ------------------- */
  const downloadQR = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const qrImg = new Image();
    qrImg.crossOrigin = "anonymous";

    qrImg.onload = () => {
      canvas.width = 450;
      canvas.height = 550;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (selectedFrame > 0) {
        const frameImg = new Image();
        frameImg.onload = () => {
          ctx.drawImage(frameImg, 0, 0, 450, 550);
          ctx.drawImage(qrImg, 95, 105, 260, 260);
          drawTextAndFinalize();
        };
        frameImg.src = `/frames/frame-${selectedFrame}.png`;
      } else {
        ctx.drawImage(qrImg, 95, 55, 260, 260);
        drawTextAndFinalize();
      }

      function drawTextAndFinalize() {
        ctx.font = "bold 28px Arial";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.fillText(customText, canvas.width / 2, 430);

        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "my-feedback-qr.png";
          a.click();
          URL.revokeObjectURL(url);
        });
      }
    };
    qrImg.src = qr.imageUrl;
  };

  /* ------------------- Frames ------------------- */
  const frames = [
    { name: "None", border: "border-4 border-gray-300" },
    { name: "Classic", border: "border-8 border-indigo-600 rounded-3xl" },
    { name: "Rounded", border: "border-8 border-purple-600 rounded-full" },
    { name: "Dashed", border: "border-8 border-dashed border-indigo-500" },
    { name: "Gradient", border: "border-8 border-transparent bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-3xl" },
    { name: "Shadow", border: "shadow-2xl border-8 border-white rounded-3xl" },
    { name: "Neon", border: "border-8 border-cyan-400 shadow-[0_0_20px_#06b6d4] rounded-3xl" },
    { name: "Elegant", border: "border-8 border-gray-800 rounded-3xl" },
    { name: "Minimal", border: "border-4 border-gray-400 rounded-2xl" },
    { name: "Bold", border: "border-12 border-red-600 rounded-3xl" },
    { name: "Vintage", border: "border-8 border-amber-700 rounded-3xl sepia" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My QR Code</h1>
        <p className="text-lg text-gray-600 mb-8">
          Generate and customize your feedback QR code
        </p>

        {/* Loading Skeleton */}
        {fetching && <QRSkeleton />}

        {/* No QR Yet */}
        {!fetching && !qr && (
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <QrCodeIcon className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <p className="text-xl text-gray-700 mb-6">
              You don't have a QR code yet.
            </p>
            <button
              onClick={generateQR}
              disabled={loadingQR}
              className="inline-flex items-center gap-3 bg-indigo-600 text-white px-6 py-4 rounded-xl hover:bg-indigo-700 disabled:opacity-70 transition text-lg font-medium touch-manipulation"
            >
              {loadingQR ? (
                <ArrowPathIcon className="w-6 h-6 animate-spin" />
              ) : (
                <QrCodeIcon className="w-6 h-6" />
              )}
              {loadingQR ? "Generating..." : "Generate QR"}
            </button>
          </div>
        )}

        {/* QR Exists */}
        {qr && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200">
            {/* Preview */}
            <div className="mb-10 flex justify-center">
              <div className="bg-white">
                <div className={`p-6 sm:p-8 bg-white ${frames[selectedFrame].border} transition-all duration-300`}>
                  <img
                    src={qr.imageUrl}
                    alt="Your QR Code"
                    className="w-64 h-64 mx-auto"
                    style={{
                      filter:
                        qrColor === "#000000"
                          ? "none"
                          : `invert(1) hue-rotate(${getHue(qrColor)}deg) saturate(5) brightness(0.8)`,
                    }}
                  />
                </div>
                {customText && (
                  <p className="mt-6 text-2xl sm:text-3xl font-bold" style={{ color: textColor }}>
                    {customText}
                  </p>
                )}
              </div>
            </div>

            {/* Customizations */}
            <div className="space-y-8 mb-10">
              {/* QR Color */}
              <div className="text-left">
                <label className="block text-base font-semibold text-gray-700 mb-3">
                  QR Code Color
                </label>
                <input
                  type="color"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                  className="w-24 h-14 border-2 border-gray-300 rounded-xl cursor-pointer"
                />
              </div>

              {/* Custom Text */}
              <div className="text-left">
                <label className="block text-base font-semibold text-gray-700 mb-3">
                  Text Below QR
                </label>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="e.g. Scan for Feedback"
                  className="w-full px-5 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300"
                />
              </div>

              {/* Text Color */}
              <div className="text-left">
                <label className="block text-base font-semibold text-gray-700 mb-3">
                  Text Color
                </label>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-24 h-14 border-2 border-gray-300 rounded-xl cursor-pointer"
                />
              </div>

              {/* Frame Selector - Responsive Grid */}
              <div>
                <p className="text-base font-semibold text-gray-700 mb-4 text-left">
                  Choose Frame Style
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {frames.map((frame, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedFrame(index)}
                      className={`p-4 rounded-xl border-4 transition-all touch-manipulation ${
                        selectedFrame === index
                          ? "border-indigo-600 bg-indigo-50 shadow-lg scale-105"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div className={`w-full aspect-square ${frame.border} flex items-center justify-center rounded-lg`}>
                        <div className="w-12 h-12 bg-gray-800 rounded"></div>
                      </div>
                      <p className="mt-2 text-sm font-medium text-gray-700">{frame.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Link */}
            <div className="bg-gray-50 p-4 rounded-xl mb-8">
              <p className="text-sm text-indigo-600 break-all font-mono">{qr.data}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={copyLink}
                className="flex items-center justify-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition text-lg font-medium touch-manipulation"
              >
                {copySuccess ? (
                  <>
                    <CheckIcon className="w-6 h-6" />
                    Copied!
                  </>
                ) : (
                  <>
                    <LinkIcon className="w-6 h-6" />
                    Copy Link
                  </>
                )}
              </button>

              <button
                onClick={downloadQR}
                className="flex items-center justify-center gap-3 bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition text-lg font-medium touch-manipulation"
              >
                <ArrowDownTrayIcon className="w-6 h-6" />
                Download QR
              </button>

              <button
                onClick={() => setShowDeleteDialog(true)}
                disabled={loadingQR}
                className="flex items-center justify-center gap-3 bg-red-600 text-white px-8 py-4 rounded-xl hover:bg-red-700 disabled:opacity-70 transition text-lg font-medium touch-manipulation"
              >
                <TrashIcon className="w-6 h-6" />
                Delete
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mt-8">
            <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-lg text-red-700 font-medium mb-6">{error}</p>
            <button
              onClick={fetchQR}
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 text-lg font-medium"
            >
              <ArrowPathIcon className="w-6 h-6 inline mr-2" /> Retry
            </button>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        {showDeleteDialog && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Delete QR Code?</h3>
              <p className="text-lg text-gray-600 mb-8">
                This action <span className="font-bold text-red-600">cannot be undone</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowDeleteDialog(false)}
                  className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 text-lg font-medium touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteQR}
                  disabled={loadingQR}
                  className="px-8 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-70 flex items-center justify-center gap-3 text-lg font-medium touch-manipulation"
                >
                  {loadingQR ? <ArrowPathIcon className="w-6 h-6 animate-spin" /> : <TrashIcon className="w-6 h-6" />}
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Hue calculation for preview color filter
function getHue(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  if (max !== min) {
    if (max === r) h = ((g - b) / (max - min)) * 60;
    else if (max === g) h = (2 + (b - r) / (max - min)) * 60;
    else h = (4 + (r - g) / (max - min)) * 60;
  }
  return h < 0 ? h + 360 : h;
}

const QRSkeleton = () => (
  <div className="bg-white p-12 rounded-2xl shadow-lg border border-gray-200 animate-pulse">
    <div className="w-80 h-80 bg-gray-200 mx-auto mb-8 rounded-2xl"></div>
    <div className="h-8 bg-gray-200 w-64 mx-auto rounded mb-4"></div>
    <div className="h-12 bg-gray-200 w-48 mx-auto rounded"></div>
  </div>
);