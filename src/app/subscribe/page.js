"use client";

import { useState, useEffect } from "react";
import axios from "../llb/axios";

export default function SubscribePage() {
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      const res = await axios.get("/subscription-status");
      setSubscriptionStatus(res.data);
    } catch (err) {
      console.error("Error checking status:", err);
    } finally {
      setCheckingStatus(false);
    }
  };

  const startSubscription = async () => {
    setLoading(true);
    setError("");
    setInfo("");
    try {
      const res = await axios.post("/create-subscription", {});

      if (res.data?.subscription?.short_url) {
        setInfo("Redirecting to secure payment...");
        window.location.href = res.data.subscription.short_url;
        return;
      }

      setError("Unable to start subscription");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (checkingStatus) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking subscription status...</p>
        </div>
      </div>
    );
  }

  // Active subscription view
  if (subscriptionStatus?.status === "active") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-green-800 mb-2">
              Active Subscription
            </h1>
            <p className="text-green-700">
              Your 3-day trial is currently active!
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-gray-500">Days Remaining</p>
                <p className="text-2xl font-bold text-green-600">
                  {subscriptionStatus.daysRemaining}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Hours Remaining</p>
                <p className="text-2xl font-bold text-green-600">
                  {subscriptionStatus.hoursRemaining}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-semibold">Started:</span>{" "}
                  {new Date(subscriptionStatus.currentStart).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Expires:</span>{" "}
                  {new Date(subscriptionStatus.currentEnd).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={checkSubscriptionStatus}
            className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-200 active:scale-95"
          >
            Refresh Status
          </button>
        </div>
      </div>
    );
  }

  // Default subscription page
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-black mb-2">
          7-Day subscription
        </h1>
        <p className="text-gray-600 mb-6">
          Try our premium features for just ₹2
        </p>
        <div className="mb-6">
          <span className="text-4xl font-extrabold text-black">₹2</span>
          <span className="text-gray-500 text-lg"> / 7 days</span>
        </div>

        <ul className="text-left text-gray-700 mb-6 space-y-2 text-sm">
          <li>✔ Full premium access for 3 days</li>
          <li>✔ All features unlocked</li>
          <li>✔ Secure Razorpay checkout</li>
          <li>✔ Auto-expires after 3 days</li>
        </ul>

        <button
          onClick={startSubscription}
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-semibold transition-all duration-200
            ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
            }`}
        >
          {loading ? "Redirecting..." : "Start 3-Day Trial"}
        </button>

        {info && <p className="mt-4 text-indigo-600 text-sm">{info}</p>}
        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
}