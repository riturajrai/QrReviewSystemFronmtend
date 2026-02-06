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
  StarIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

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
  const [redirectFromRating, setRedirectFromRating] = useState(3);
  const [logoUrl, setLogoUrl] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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
          setRedirectFromRating(data.data.redirectFromRating ?? 3);
          setLogoUrl(data.data.logoUrl || "");
        }
      } catch (err) {
        console.log("No custom settings found yet.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomData();
  }, []);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
    }
  };

  const handleSaveOrUpdate = async () => {
    if (!customURL.trim()) {
      setErrorMsg("Please enter a valid redirect URL");
      return;
    }
    if (!companyName.trim()) {
      setErrorMsg("Please enter your company name");
      return;
    }

    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      // Upload logo if a new file is selected
      let newLogoUrl = logoUrl;
      if (logoFile) {
        const formData = new FormData();
        formData.append("logo", logoFile);

        const uploadResponse = await axios.post("/form/upload-logo", formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (uploadResponse.data.success) {
          newLogoUrl = uploadResponse.data.data.logoUrl;
          setLogoUrl(newLogoUrl);
          setLogoFile(null); // Clear the file after upload
        } else {
          setErrorMsg(uploadResponse.data.message || "Logo upload failed");
          setLoading(false);
          return;
        }
      }

      // Save or update custom settings (assuming logoUrl is handled separately in backend)
      const { data } = await axios.post(
        "/custom-url/set-url",
        {
          url: customURL.trim(),
          companyName: companyName.trim(),
          redirectFromRating: Number(redirectFromRating),
        },
        { withCredentials: true }
      );

      if (data.success) {
        setSuccessMsg("Settings saved successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
        setShowEditDialog(false);
      } else {
        setErrorMsg(data.message || "Failed to save settings");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const { data } = await axios.delete("/custom-url/delete-url", {
        withCredentials: true,
      });

      if (data.success) {
        setCustomURL("");
        setCompanyName("");
        setRedirectFromRating(3);
        setLogoUrl("");
        setSuccessMsg("Settings deleted successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
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

  const renderStars = (threshold) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarSolidIcon
            key={star}
            className={`w-4 h-4 ${
              star >= threshold ? "text-indigo-600" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-gray-600">
          {threshold === 1 ? "all ratings" : threshold === 5 ? "only" : "and above"}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 text-[10px] leading-tight sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-bold text-gray-900 mb-2 text-xl sm:text-2xl">Form Settings</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Customize company name, redirect URL, rating threshold, and logo
          </p>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="p-6">
            {/* Current Settings Display */}
            {(customURL || companyName || logoUrl) ? (
              <div className="space-y-4 mb-6">
                <div className="border-b border-gray-200 pb-4">
                  <h2 className="font-semibold text-gray-800 mb-3 text-base sm:text-lg">
                    Current Configuration
                  </h2>

                  {companyName && (
                    <div className="flex items-center justify-between p-3 bg-indigo-50 rounded text-sm sm:text-base">
                      <div className="flex items-center gap-2">
                        <BuildingOfficeIcon className="w-5 h-5 text-indigo-600" />
                        <div>
                          <p className="font-medium text-gray-700">Company Name</p>
                          <p className="text-gray-900">{companyName}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowEditDialog(true)}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {customURL && (
                    <div className="flex items-center justify-between p-3 bg-indigo-50 rounded mt-3 text-sm sm:text-base">
                      <div className="flex items-center gap-2">
                        <LinkIcon className="w-5 h-5 text-indigo-600" />
                        <div>
                          <p className="font-medium text-gray-700">Redirect URL</p>
                          <a
                            href={customURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 underline hover:text-indigo-800 break-all"
                          >
                            {customURL}
                          </a>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowEditDialog(true)}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {logoUrl && (
                    <div className="flex items-center justify-between p-3 bg-indigo-50 rounded mt-3 text-sm sm:text-base">
                      <div className="flex items-center gap-2">
                        <PhotoIcon className="w-5 h-5 text-indigo-600" />
                        <div>
                          <p className="font-medium text-gray-700">Logo</p>
                          <img
                            src={logoUrl}
                            alt="Company Logo"
                            className="w-20 h-auto mt-1"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => setShowEditDialog(true)}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-3 bg-indigo-50 rounded mt-3 text-sm sm:text-base">
                    <div className="flex items-center gap-2">
                      <StarIcon className="w-5 h-5 text-indigo-600" />
                      <div>
                        <p className="font-medium text-gray-700">Redirect Threshold</p>
                        <div className="mt-1">{renderStars(redirectFromRating)}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowEditDialog(true)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-gray-200 border-2 border-dashed rounded w-20 h-20 mx-auto mb-4" />
                <p className="text-gray-500 text-sm sm:text-base">No settings configured yet</p>
                <p className="text-gray-400 mt-1 text-xs sm:text-sm">
                  Add your company name, redirect URL, logo, and threshold to get started
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowEditDialog(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded hover:bg-indigo-700 font-medium text-sm sm:text-base"
              >
                <PencilIcon className="w-4 h-4" />
                {customURL || companyName || logoUrl ? "Edit Settings" : "Configure Settings"}
              </button>

              {(customURL || companyName || logoUrl) && (
                <button
                  onClick={() => setShowDeleteDialog(true)}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded hover:bg-red-700 disabled:opacity-70 font-medium text-sm sm:text-base"
                >
                  <TrashIcon className="w-4 h-4" />
                  Delete Settings
                </button>
              )}
            </div>

            {/* Messages */}
            {successMsg && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded flex items-center gap-2 text-sm sm:text-base">
                <CheckIcon className="w-5 h-5 text-green-600" />
                <p className="text-green-800 font-medium">{successMsg}</p>
              </div>
            )}
            {errorMsg && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-sm sm:text-base">
                <p className="text-red-800 font-medium">{errorMsg}</p>
              </div>
            )}
          </div>
        </div>

        {/* Edit Dialog */}
        {showEditDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 text-lg sm:text-xl">
                  {customURL || companyName || logoUrl ? "Edit" : "Add"} Settings
                </h3>
                <button
                  onClick={() => setShowEditDialog(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-5 text-sm sm:text-base">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g., ABC Restaurant"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Thank You Redirect URL
                  </label>
                  <input
                    type="url"
                    value={customURL}
                    onChange={(e) => setCustomURL(e.target.value)}
                    placeholder="https://yourwebsite.com/thank-you"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none"
                    disabled={loading}
                  />
                  <p className="text-gray-500 mt-1 text-xs sm:text-sm">
                    Users meeting the rating threshold will be redirected here
                  </p>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Company Logo
                  </label>
                  {logoUrl && (
                    <img
                      src={logoUrl}
                      alt="Current Logo"
                      className="w-32 h-auto mb-2"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none"
                    disabled={loading}
                  />
                  <p className="text-gray-500 mt-1 text-xs sm:text-sm">
                    Upload or update your company logo (JPEG, PNG, etc.)
                  </p>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Redirect users who give:
                  </label>
                  <select
                    value={redirectFromRating}
                    onChange={(e) => setRedirectFromRating(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none"
                    disabled={loading}
                  >
                    <option value={1}>1 star and above (all ratings)</option>
                    <option value={2}>2 stars and above</option>
                    <option value={3}>3 stars and above</option>
                    <option value={4}>4 stars and above</option>
                    <option value={5}>5 stars only</option>
                  </select>
                  <div className="mt-2 p-3 bg-gray-50 rounded">
                    {renderStars(redirectFromRating)}
                  </div>
                  <p className="text-gray-500 mt-2 text-xs sm:text-sm">
                    Users rating <strong>{redirectFromRating}+ stars</strong> will be redirected to your URL. 
                    Lower ratings will go to the feedback form.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={() => setShowEditDialog(false)}
                  disabled={loading}
                  className="px-5 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 font-medium text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveOrUpdate}
                  disabled={loading}
                  className="px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-70 flex items-center gap-2 font-medium text-sm sm:text-base"
                >
                  {loading ? (
                    <>
                      <ArrowPathIcon className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckIcon className="w-4 h-4" />
                      Save Settings
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        {showDeleteDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full p-6 text-center">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrashIcon className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg sm:text-xl">Delete Settings?</h3>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                This will <span className="font-bold text-red-600">permanently remove</span> your company name, redirect URL, logo, and rating threshold.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowDeleteDialog(false)}
                  className="px-5 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 font-medium text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-70 flex items-center gap-2 font-medium text-sm sm:text-base"
                >
                  {loading ? (
                    <ArrowPathIcon className="w-4 h-4 animate-spin" />
                  ) : (
                    <TrashIcon className="w-4 h-4" />
                  )}
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
