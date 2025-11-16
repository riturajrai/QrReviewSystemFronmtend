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
  const [companyName, setCompanyName] = useState(""); // NEW

  // Enhanced rating labels
  const ratingLabels = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  };

  // Fetch custom URL + Company Name
  useEffect(() => {
    const fetchSettings = async () => {
      if (!qrId) return;
      try {
        const { data } = await axios.get(`/custom-url/get-url/${qrId}`);
        if (data.success && data.data) {
          setCustomURL(data.data.url || "");
          setCompanyName(data.data.companyName || "Our Service");
        }
      } catch (err) {
        console.log("No custom URL or company name found.");
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

    if (rating >= 4 && customURL) {
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
      toast.error("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Particle effect component for celebrations
  const ExplodingParticles = () => (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 bg-yellow-400 rounded-full ${
            isExploding ? "animate-explode" : ""
          }`}
          style={{
            left: "50%",
            top: "50%",
            animationDelay: `${i * 0.1}s`,
            transform: `translate(${
              Math.random() * 200 - 100
            }px, ${Math.random() * 200 - 100}px)`,
          }}
        />
      ))}
    </div>
  );

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="text-center w-full max-w-sm sm:max-w-md">

          {/* Company Name Title */}
          <h2 className="text-xl font-bold text-indigo-700 mb-2">
            {companyName ? companyName : "Our Company"}
          </h2>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-lg font-bold text-gray-800 mb-6 leading-tight">
              How was your experience with {companyName || "us"}?
            </h1>

            {/* Enhanced Star Rating */}
            <div className="relative mb-4">
              <div className="flex justify-center gap-1 sm:gap-2 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => handleStarHover(star)}
                    onMouseLeave={() => handleStarHover(0)}
                    className={`transition-all duration-200 transform hover:scale-110 ${
                      selectedRating >= star ? "animate-bounce" : ""
                    }`}
                    style={{
                      animationDelay:
                        selectedRating >= star ? `${star * 0.1}s` : "0s",
                    }}
                  >
                    {hoveredRating >= star || selectedRating >= star ? (
                      <StarIcon className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400 drop-shadow-lg" />
                    ) : (
                      <StarOutline className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 hover:text-yellow-200" />
                    )}
                  </button>
                ))}
              </div>

              {/* Rating Label */}
              <div className="h-6">
                {(hoveredRating > 0 || selectedRating > 0) && (
                  <p className="text-gray-700 font-medium animate-fadeIn">
                    {ratingLabels[hoveredRating || selectedRating]}
                  </p>
                )}
              </div>

              {isExploding && <ExplodingParticles />}
            </div>

            <p className="text-gray-600 leading-relaxed">
              Tap a star to rate your experience
            </p>
          </div>

          {/* Footer */}
          <p className="text-gray-500 mt-12">
            Powered by{" "}
            <span className="font-semibold text-indigo-600">
              VocalHeartInfoTech
            </span>
          </p>
        </div>
      </div>

      {/* Feedback Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scaleIn">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-5">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Share Your Feedback
                </h3>
                <p className="text-gray-600 mt-1">
                  Help us improve your experience
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Rating Preview */}
            <div className="flex items-center justify-center gap-3 mb-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`w-8 h-8 ${
                      star <= selectedRating
                        ? "text-yellow-400 scale-110"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-700 font-medium">
                {ratingLabels[selectedRating]}
              </span>
            </div>

            {/* Feedback Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Name *
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Phone *
                </label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Message *
                </label>
                <textarea
                  required
                  maxLength={200}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="Write your feedback..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700"
              >
                {submitting ? "Submitting..." : "Submit Feedback"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Animations */}
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
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-explode {
          animation: explode 0.6s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
}
