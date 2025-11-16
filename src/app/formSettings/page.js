"use client";

import { useState, useEffect } from "react";
import axios from "../llb/axios";
import ProtectedRoute from "../components/ProtectedRoute";

export default function FormSettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  );
}

/* ------------------------------------------------------------------ */
/*  Settings UI + API Logic – No Auth Checks Here                     */
/* ------------------------------------------------------------------ */
function SettingsContent() {
  const [customURL, setCustomURL] = useState("");
  const [loadingURL, setLoadingURL] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  /* ------------------- Fetch Existing URL ------------------- */
  useEffect(() => {
    const fetchCustomURL = async () => {
      try {
        setLoadingURL(true);
        const { data } = await axios.get("/custom-url/get-url", {
          withCredentials: true,
        });
        if (data.success && data.url) {
          setCustomURL(data.url);
        }
      } catch (err) {
        console.log("No custom URL found or not set yet.");
      } finally {
        setLoadingURL(false);
      }
    };

    fetchCustomURL();
  }, []);

  /* ------------------- Save / Update URL ------------------- */
  const handleSaveOrUpdate = async () => {
    if (!customURL.trim()) {
      setErrorMsg("Please enter a valid URL");
      return;
    }

    setLoadingURL(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const { data } = await axios.post(
        "/custom-url/set-url",
        { url: customURL.trim() },
        { withCredentials: true }
      );

      if (data.success) {
        setSuccessMsg("Custom URL saved successfully!");
      } else {
        setErrorMsg(data.message || "Failed to save URL");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoadingURL(false);
    }
  };

  /* ------------------- Delete URL ------------------- */
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this custom URL?")) return;

    setLoadingURL(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const { data } = await axios.delete("/custom-url/delete-url", {
        withCredentials: true,
      });

      if (data.success) {
        setCustomURL("");
        setSuccessMsg("Custom URL deleted successfully!");
      } else {
        setErrorMsg(data.message || "Failed to delete URL");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoadingURL(false);
    }
  };

  /* ------------------- Render UI ------------------- */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Form Settings
        </h1>
        <p className="text-gray-600 text-center text-sm mb-6">
          Set a custom redirect URL for 4-5 star ratings
        </p>

        {/* URL Input */}
        <input
          type="url"
          value={customURL}
          onChange={(e) => setCustomURL(e.target.value)}
          placeholder="https://your-site.com/thanks"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          disabled={loadingURL}
        />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-5">
          <button
            onClick={handleSaveOrUpdate}
            disabled={loadingURL}
            className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-70 transition font-medium"
          >
            {loadingURL ? "Saving..." : "Save URL"}
          </button>

          <button
            onClick={handleDelete}
            disabled={loadingURL || !customURL}
            className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 disabled:opacity-70 transition font-medium"
          >
            {loadingURL ? "Deleting..." : "Delete URL"}
          </button>
        </div>

        {/* Success / Error Messages */}
        {successMsg && (
          <p className="mt-5 text-center text-green-600 font-medium text-sm">
            {successMsg}
          </p>
        )}
        {errorMsg && (
          <p className="mt-5 text-center text-red-600 font-medium text-sm">
            {errorMsg}
          </p>
        )}

        {/* Loading Indicator */}
        {loadingURL && (
          <div className="mt-5 flex justify-center">
            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}