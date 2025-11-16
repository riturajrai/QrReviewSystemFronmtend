

"use client";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";
import axios from "../../llb/axios";

export default function FeedbackLanding() {
  const { qrId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({ name: "", phone: "", message: "" }); // FIXED: renamed mobile → phone
  const [customURL, setCustomURL] = useState("");

  // Fetch custom URL
  useEffect(() => {
    const fetchCustomURL = async () => {
      if (!qrId) return;
      try {
        const { data } = await axios.get(`/custom-url/get-url/${qrId}`);
        if (data.success) setCustomURL(data.url);
      } catch (err) {
        console.log("No custom URL set.");
      }
    };
    fetchCustomURL();
  }, [qrId]);

  const handleStarClick = (rating) => {
    setSelectedRating(rating);

    if (rating >= 4 && customURL) {
      window.location.href = customURL;
    } else {
      setShowModal(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRating) {
      toast.error("Please select a rating");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        qrId,
        name: form.name.trim(),
        phone: form.phone.trim(), // Always send, even if empty
        message: form.message.trim(),
        rating: selectedRating,
      };

      const { data } = await axios.post("/save-feedback", payload); // Use axios

      if (data.success) {
        toast.success(data.message || "Thank you for your feedback!");
        setShowModal(false);
        setForm({ name: "", phone: "", message: "" });
        setSelectedRating(0);
      } else {
        toast.error(data.message || "Submission failed");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
              How was your experience?
            </h1>
            <div className="flex justify-center gap-3 sm:gap-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-all duration-200 transform hover:scale-110"
                >
                  {hoveredRating >= star || selectedRating >= star ? (
                    <StarIcon className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400 drop-shadow-md" />
                  ) : (
                    <StarOutline className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 drop-shadow-sm" />
                  )}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm sm:text-base text-gray-600">
              Tap a star to rate and leave feedback
            </p>
          </div>

          <p className="text-xs text-gray-500 mt-12">
            Powered by <span className="font-semibold text-indigo-600">VocalHeartInfoTech</span>
          </p>
        </div>
      </div>

      {/* Feedback Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-gray-900">Your Feedback</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`w-10 h-10 ${star <= selectedRating ? "text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  placeholder="+1234567890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none"
                  placeholder="Share your experience..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-indigo-600 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-md"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Feedback"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}