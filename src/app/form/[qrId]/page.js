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
  const [isExploding, setIsExploding] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [customURL, setCustomURL] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [redirectFromRating, setRedirectFromRating] = useState(4);
  const [logoUrl, setLogoUrl] = useState("");

  const ratingLabels = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  };

  // Fetch custom settings
  useEffect(() => {
    const fetchSettings = async () => {
      if (!qrId) return;
      try {
        const { data } = await axios.get(`/custom-url/get-url/${qrId}`);
        if (data.success && data.data) {
          setCustomURL(data.data.url || "");
          setCompanyName(data.data.companyName || "Our Service");
          setRedirectFromRating(data.data.redirectFromRating ?? 4);
          setLogoUrl(data.data.logoUrl || "");
        }
      } catch (err) {
        console.log("No custom settings found. Using defaults.");
        setCompanyName("Our Service");
        setRedirectFromRating(4);
      }
    };
    fetchSettings();
  }, [qrId]);

  const handleStarClick = (rating) => {
    setSelectedRating(rating);

    if (rating >= 4) {
      setIsExploding(true);
      setTimeout(() => setIsExploding(false), 600);
    }

    if (rating >= redirectFromRating && customURL) {
      setTimeout(() => {
        window.location.href = customURL;
      }, 800);
    } else {
      setTimeout(() => {
        setShowModal(true);
      }, 300);
    }
  };

  const handleStarHover = (rating) => {
    setHoveredRating(rating);
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
        phone: form.phone.trim(),
        message: form.message.trim(),
        rating: selectedRating,
      };

      const { data } = await axios.post("/save-feedback", payload);

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
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const ExplodingParticles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full ${
            isExploding ? "animate-explode" : ""
          }`}
          style={{
            left: "50%",
            top: "50%",
            animationDelay: `${i * 0.05}s`,
            "--tx": `${Math.random() * 300 - 150}px`,
            "--ty": `${Math.random() * 300 - 150}px`,
          }}
        />
      ))}
    </div>
  );

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          {/* Company Name */}
          <h2 className="text-xl font-bold text-indigo-700 mb-3">
            {companyName}
          </h2>
          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 relative overflow-hidden">
            {logoUrl && (
              <div
                className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-10 z-0"
                style={{
                  backgroundImage: `url(${logoUrl})`,
                }}
              />
            )}
            <div className="relative z-10">
              <h2 className="text-lg font-bold text-gray-800 mb-6">
                How was your experience with {companyName}?
              </h2>

              {/* Star Rating */}
              <div className="relative mb-6">
                <div className="flex justify-center gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => handleStarHover(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onTouchStart={() => handleStarHover(star)}
                      className="transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none"
                    >
                      {(hoveredRating >= star || selectedRating >= star) ? (
                        <StarIcon className="w-10 h-10 text-yellow-400 drop-shadow-md" />
                      ) : (
                        <StarOutline className="w-10 h-10 text-gray-300 hover:text-yellow-300 transition-all duration-200" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Rating Label */}
                <div className="mt-4 h-8">
                  {(hoveredRating > 0 || selectedRating > 0) && (
                    <p className="text-base font-semibold text-gray-700 animate-fadeIn">
                      {ratingLabels[hoveredRating || selectedRating]}
                    </p>
                  )}
                </div>

                {isExploding && <ExplodingParticles />}
              </div>

              <p className="text-sm text-gray-600">
                Tap a star to rate your experience
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-xs text-gray-500 mt-10">
            Powered by{" "}
            <span className="font-bold text-indigo-600">VocalHeartInfoTech</span>
          </p>
        </div>
      </div>

      {/* Feedback Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end justify-center p-4 animate-fadeIn sm:items-center">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[92vh] overflow-y-auto animate-scaleIn">
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    We Value Your Feedback
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Help us improve our service
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-700 text-2xl font-light"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              {/* Rating Preview */}
              <div className="flex flex-col items-center gap-3 mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className={`w-8 h-8 ${
                        star <= selectedRating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-base font-bold text-gray-800">
                  {ratingLabels[selectedRating]}
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium text-sm mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium text-sm mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium text-sm mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    maxLength={300}
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none resize-none"
                    placeholder="Tell us how we can improve..."
                  />
                  <p className="text-right text-xs text-gray-500 mt-1">
                    {form.message.length}/300
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium text-sm hover:bg-indigo-700 disabled:opacity-70 transition"
                >
                  {submitting ? "Submitting..." : "Submit Feedback"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Global Animations */}
      <style jsx global>{`
        @keyframes explode {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-explode {
          animation: explode 0.8s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
