"use client";

import { useState } from "react";
import axios from "../llb/axios";

export default function SubscribePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const startSubscription = async () => {
    setLoading(true);
    setError("");
    setInfo("");
    try {
      const res = await axios.post("/create-subscription", {});

      //  redirect for both new & pending subscription
      if (res.data?.subscription?.short_url) {
        setInfo("Redirecting to secure payment...");
        window.location.href = res.data.subscription.short_url;
        return;
      }
      setError("Unable to start subscription");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8 text-center">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-black mb-2">
          Pro Subscription
        </h1>
        <p className="text-gray-600 mb-6">
          Unlock premium features & priority support
        </p>
        {/* Price */}
        <div className="mb-6">
          <span className="text-4xl font-extrabold text-black">
            ₹1999
          </span>
          <span className="text-gray-500 text-lg"> / years</span>
        </div>

        {/* Features */}
        <ul className="text-left text-gray-700 mb-6 space-y-2 text-sm">
          <li>✔ Unlimited access</li>
          <li>✔ Premium support</li>
          <li>✔ Secure Razorpay checkout</li>
          <li>✔ Cancel anytime</li>
        </ul>

        {/* Button */}
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
          {loading ? "Redirecting..." : "Subscribe Now"}
        </button>

        {/* Info message */}
        {info && (
          <p className="mt-4 text-indigo-600 text-sm">
            {info}
          </p>
        )}

        {/* Error message */}
        {error && (
          <p className="mt-4 text-red-500 text-sm">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
