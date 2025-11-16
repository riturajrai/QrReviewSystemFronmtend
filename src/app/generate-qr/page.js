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
  XMarkIcon,
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
  const [qr, setQr] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [loadingQR, setLoadingQR] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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
    setLoadingQR(true);
    setError("");
    try {
      const { data } = await axios.delete(`${API_BASE}/delete-qr`, {
        withCredentials: true,
      });
      if (data.success) {
        setQr(null);
        setShowDeleteDialog(false);
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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          My QR Code
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mb-8">
          Generate and manage your personal feedback QR code
        </p>

        {/* Loading Skeleton */}
        {fetching && <QRSkeleton />}

        {/* No QR Found */}
        {!fetching && !qr && (
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
            <QrCodeIcon className="w-16 h-16 sm:w-20 sm:h-20 text-gray-300 mx-auto mb-4 sm:mb-6" />
            <p className="text-xs sm:text-sm text-gray-700 mb-4 sm:mb-6">
              You don't have a QR code yet.
            </p>
            <button
              onClick={generateQR}
              disabled={loadingQR}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 disabled:opacity-70 transition text-xs sm:text-sm"
            >
              {loadingQR ? (
                <ArrowPathIcon className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              ) : (
                <QrCodeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
              {loadingQR ? "Generating..." : "Generate QR"}
            </button>
          </div>
        )}

        {/* QR Display */}
        {qr && (
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
            <img
              src={qr.imageUrl}
              alt="Your QR Code"
              className="w-56 h-56 sm:w-64 sm:h-64 mx-auto mb-4 sm:mb-6 rounded-lg border border-gray-300 shadow-sm"
            />
            <p className="text-xs sm:text-sm text-indigo-600 break-all font-mono mb-4 sm:mb-6 bg-gray-50 p-2.5 sm:p-3 rounded">
              {qr.data}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={copyLink}
                className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-xs sm:text-sm"
              >
                {copySuccess ? (
                  <>
                    <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    Copy Link
                  </>
                )}
              </button>

              <button
                onClick={() => setShowDeleteDialog(true)}
                disabled={loadingQR}
                className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-70 transition text-xs sm:text-sm"
              >
                <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                {loadingQR ? "Deleting..." : "Delete QR"}
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mt-8 text-center">
            <ExclamationTriangleIcon className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 mx-auto mb-3" />
            <p className="text-xs sm:text-sm text-red-700 font-medium mb-4">{error}</p>
            <button
              onClick={fetchQR}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition text-xs sm:text-sm"
            >
              <ArrowPathIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              Retry
            </button>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        {showDeleteDialog && (
          <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Delete QR Code?</h3>
                <button
                  onClick={() => setShowDeleteDialog(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-6">
                This action <span className="font-medium text-red-600">cannot be undone</span>.
                Your QR code and link will be permanently deleted.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteDialog(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-xs sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteQR}
                  disabled={loadingQR}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-70 transition flex items-center gap-2 text-xs sm:text-sm"
                >
                  {loadingQR ? (
                    <ArrowPathIcon className="w-4 h-4 animate-spin" />
                  ) : (
                    <TrashIcon className="w-4 h-4" />
                  )}
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

/* ------------------------------------------------------------------ */
/*  Loading Skeleton                                                  */
/* ------------------------------------------------------------------ */
const QRSkeleton = () => (
  <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200 animate-pulse">
    <div className="w-56 h-56 sm:w-64 sm:h-64 bg-gray-200 mx-auto mb-4 sm:mb-6 rounded-xl"></div>
    <div className="h-5 sm:h-6 bg-gray-200 w-48 mx-auto mb-3 rounded"></div>
    <div className="h-9 sm:h-10 bg-gray-200 w-32 mx-auto rounded"></div>
  </div>
);
