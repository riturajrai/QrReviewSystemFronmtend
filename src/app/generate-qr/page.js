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
} from "@heroicons/react/24/outline";

/* ------------------------------------------------------------------ */
/*  Main Page – Protected + UI Wrapper                                 */
/* ------------------------------------------------------------------ */
export default function QRPage() {
  return (
    <ProtectedRoute>
      <QRContent />
    </ProtectedRoute>
  );
}

/* ------------------------------------------------------------------ */
/*  QR UI + API Logic – No Auth Logic Here                            */
/* ------------------------------------------------------------------ */
function QRContent() {
  const [qr, setQr] = useState(null); // Fixed: removed <any>
  const [fetching, setFetching] = useState(true);
  const [loadingQR, setLoadingQR] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = "https://qrreviewbackend.onrender.com/api";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      } else {
        setError(data.message || "Failed to generate QR");
      }
    } catch (e) {
      console.error("Generate QR error:", e);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoadingQR(false);
    }
  };

  /* ------------------- Delete QR ------------------- */
  const deleteQR = async () => {
    if (!confirm("Are you sure you want to delete your QR code? This cannot be undone.")) {
      return;
    }

    setLoadingQR(true);
    setError("");
    try {
      const { data } = await axios.delete(`${API_BASE}/delete-qr`, {
        withCredentials: true,
      });
      if (data.success) {
        setQr(null);
      } else {
        setError(data.message || "Failed to delete QR");
      }
    } catch (e) {
      console.error("Delete QR error:", e);
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
      alert("Failed to copy link. Please copy manually.");
    }
  };

  /* ------------------- Render UI ------------------- */
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My QR Code</h1>
        <p className="text-gray-600 mb-8">
          Generate and manage your personal feedback QR code
        </p>

        {/* Loading Skeleton */}
        {fetching && <QRSkeleton />}

        {/* No QR Found */}
        {!fetching && !qr && (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <QrCodeIcon className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <p className="text-gray-700 mb-6">You don't have a QR code yet.</p>
            <button
              onClick={generateQR}
              disabled={loadingQR}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-70 transition"
            >
              {loadingQR ? (
                <ArrowPathIcon className="w-5 h-5 animate-spin" />
              ) : (
                <QrCodeIcon className="w-5 h-5" />
              )}
              {loadingQR ? "Generating..." : "Generate QR"}
            </button>
          </div>
        )}

        {/* QR Display */}
        {qr && (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <img
              src={qr.imageUrl}
              alt="Your QR Code"
              className="w-64 h-64 mx-auto mb-6 rounded-lg border border-gray-300 shadow-sm"
            />
            <p className="text-sm text-indigo-600 break-all font-mono mb-6 bg-gray-50 p-3 rounded">
              {qr.data}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={copyLink}
                className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                {copySuccess ? (
                  <>
                    <CheckIcon className="w-5 h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <LinkIcon className="w-5 h-5" />
                    Copy Link
                  </>
                )}
              </button>

              <button
                onClick={deleteQR}
                disabled={loadingQR}
                className="flex items-center justify-center gap-2 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 disabled:opacity-70 transition"
              >
                <TrashIcon className="w-5 h-5" />
                {loadingQR ? "Deleting..." : "Delete QR"}
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mt-8 text-center">
            <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <p className="text-red-700 font-medium mb-4">{error}</p>
            <button
              onClick={fetchQR}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              <ArrowPathIcon className="w-5 h-5" />
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Loading Skeleton                                                  */
/* ------------------------------------------------------------------ */
const QRSkeleton = () => (
  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 animate-pulse">
    <div className="w-64 h-64 bg-gray-200 mx-auto mb-6 rounded-xl"></div>
    <div className="h-6 bg-gray-200 w-48 mx-auto mb-3 rounded"></div>
    <div className="h-10 bg-gray-200 w-32 mx-auto rounded"></div>
  </div>
);
