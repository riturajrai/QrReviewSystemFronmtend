"use client";

import { useState, useEffect } from "react";
import axios from "../llb/axios";
import ProtectedRoute from "../components/ProtectedRoute";
import {
  ArrowPathIcon,
  CheckIcon,
  XMarkIcon,
  PencilIcon,
  TrashIcon,
  BuildingOfficeIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

export default function FormSettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  );
}

function SettingsContent() {
  const [customURL, setCustomURL] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  /* ------------------- Fetch Existing Data ------------------- */
  useEffect(() => {
    const fetchCustomData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/custom-url/get-url", {
          withCredentials: true,
        });

        if (data.success && data.data) {
          setCustomURL(data.data.url || "");
          setCompanyName(data.data.companyName || "");
        }
      } catch (err) {
        console.log("No custom URL found or not set yet.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomData();
  }, []);

  /* ------------------- Save / Update ------------------- */
  const handleSaveOrUpdate = async () => {
    if (!customURL.trim()) {
      setErrorMsg("Please enter a valid URL");
      return;
    }
    if (!companyName.trim()) {
      setErrorMsg("Please enter company name");
      return;
    }

    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const { data } = await axios.post(
        "/custom-url/set-url",
        {
          url: customURL.trim(),
          companyName: companyName.trim(),
        },
        { withCredentials: true }
      );

      if (data.success) {
        setSuccessMsg("Saved successfully!");
        setShowEditDialog(false);
      } else {
        setErrorMsg(data.message || "Failed to save data");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ------------------- Delete ------------------- */
  const handleDelete = async () => {
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const { data } = await axios.delete("/custom-url/delete-url", {
        withCredentials: true,
      });

      if (data.success) {
        setCustomURL("");
        setCompanyName("");
        setSuccessMsg("Deleted successfully!");
        setShowDeleteDialog(false);
      } else {
        setErrorMsg(data.message || "Failed to delete");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ------------------- UI ------------------- */
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center">
            Form Settings
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 text-center mb-6">
            Add company name & redirect URL for 4-5 star ratings
          </p>

          {/* Current Values Display */}
          {customURL || companyName ? (
            <div className="space-y-4 mb-6">
              {companyName && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <BuildingOfficeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700">
                      {companyName}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowEditDialog(true)}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    <PencilIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              )}

              {customURL && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                    <a
                      href={customURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-mono text-indigo-600 underline break-all"
                    >
                      {customURL}
                    </a>
                  </div>
                  <button
                    onClick={() => setShowEditDialog(true)}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    <PencilIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="text-xs sm:text-sm italic">No settings configured yet.</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowEditDialog(true)}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition text-xs sm:text-sm"
            >
              <PencilIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              {customURL || companyName ? "Edit Settings" : "Add Settings"}
            </button>

            {(customURL || companyName) && (
              <button
                onClick={() => setShowDeleteDialog(true)}
                disabled={loading}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 disabled:opacity-70 transition text-xs sm:text-sm"
              >
                <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                Delete
              </button>
            )}
          </div>

          {/* Messages */}
          {successMsg && (
            <p className="mt-5 text-center text-green-600 font-medium text-xs sm:text-sm flex items-center justify-center gap-1">
              <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              {successMsg}
            </p>
          )}
          {errorMsg && (
            <p className="mt-5 text-center text-red-600 font-medium text-xs sm:text-sm">
              {errorMsg}
            </p>
          )}
        </div>

        {/* Edit Dialog */}
        {showEditDialog && (
          <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Edit Form Settings
                </h3>
                <button
                  onClick={() => setShowEditDialog(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter your company / business name"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-xs sm:text-sm"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Redirect URL (4-5 stars)
                  </label>
                  <input
                    type="url"
                    value={customURL}
                    onChange={(e) => setCustomURL(e.target.value)}
                    placeholder="https://your-site.com/thanks"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-xs sm:text-sm"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={() => setShowEditDialog(false)}
                  disabled={loading}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-xs sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveOrUpdate}
                  disabled={loading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-70 transition flex items-center gap-2 text-xs sm, sm:text-sm"
                >
                  {loading ? (
                    <ArrowPathIcon className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckIcon className="w-4 h-4" />
                  )}
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Dialog */}
        {showDeleteDialog && (
          <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Delete Settings?</h3>
                <button
                  onClick={() => setShowDeleteDialog(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-6">
                This will <span className="font-medium text-red-600">permanently delete</span> your
                company name and redirect URL.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteDialog(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-xs sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-70 transition flex items-center gap-2 text-xs sm:text-sm"
                >
                  {loading ? (
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
