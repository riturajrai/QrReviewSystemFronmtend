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

  // Calculate progress percentage for trial
  const calculateProgress = () => {
    if (!subscriptionStatus) return 0;
    const start = new Date(subscriptionStatus.currentStart).getTime();
    const end = new Date(subscriptionStatus.currentEnd).getTime();
    const now = new Date().getTime();
    const total = end - start;
    const elapsed = now - start;
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  };

  if (checkingStatus) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-indigo-200 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="mt-6 text-lg font-medium text-gray-700">
            Checking subscription status...
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Please wait a moment
          </p>
        </div>
      </div>
    );
  }

  // Active subscription view with enhanced design
  if (subscriptionStatus?.status === "active") {
    const progress = calculateProgress();
    const daysRemaining = subscriptionStatus.daysRemaining;
    const hoursRemaining = subscriptionStatus.hoursRemaining;
    const isLowTime = daysRemaining < 2;

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Header Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-indigo-100">
            {/* Top Gradient Bar */}
            <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            
            <div className="p-8 md:p-10">
              {/* Success Badge */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-200">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      Active Subscription
                    </h1>
                    <p className="text-gray-600">Your trial is running smoothly</p>
                  </div>
                </div>
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  Premium
                </span>
              </div>

              {/* Main Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Days Card */}
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-2xl p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-indigo-600 mb-1">Days Remaining</p>
                      <p className="text-4xl md:text-5xl font-bold text-indigo-900">
                        {daysRemaining}
                        <span className="text-lg font-normal text-indigo-600 ml-1">days</span>
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-indigo-200 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Hours Card */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600 mb-1">Hours Remaining</p>
                      <p className="text-4xl md:text-5xl font-bold text-purple-900">
                        {hoursRemaining}
                        <span className="text-lg font-normal text-purple-600 ml-1">hrs</span>
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-200 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Trial Progress</span>
                  <span className="text-sm font-semibold text-indigo-600">
                    {Math.round(progress)}% Complete
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Subscription Details */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
                  Subscription Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Started</span>
                    <span className="font-medium text-gray-900">
                      {new Date(subscriptionStatus.currentStart).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Expires</span>
                    <span className={`font-medium ${isLowTime ? 'text-orange-600' : 'text-gray-900'}`}>
                      {new Date(subscriptionStatus.currentEnd).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <span className="text-gray-600">Subscription ID</span>
                    <span className="font-mono text-sm text-gray-500">
                      {subscriptionStatus.subscriptionId.slice(-8)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={checkSubscriptionStatus}
                  className="flex-1 py-4 px-6 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh Status
                </button>
                <button
                  className="flex-1 py-4 px-6 bg-white border-2 border-indigo-200 hover:border-indigo-300 text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Contact Support
                </button>
              </div>
            </div>
          </div>

          {/* Low Time Warning */}
          {isLowTime && (
            <div className="mt-6 bg-orange-50 border border-orange-200 rounded-2xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-orange-800 mb-1">Your trial is ending soon</h4>
                <p className="text-sm text-orange-700">
                  You have {daysRemaining} days remaining. Don't forget to extend your subscription!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default subscription page with enhanced design
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Premium Badge */}
        <div className="text-center mb-8 animate-fade-in">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-sm font-semibold shadow-lg shadow-indigo-200">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Limited Time Offer
          </span>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-indigo-100/50 overflow-hidden border border-indigo-100 animate-slide-up">
          {/* Top Gradient Bar */}
          <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                7-Day 
              </h1>
              <p className="text-gray-600">
                Experience premium features at an incredible price
              </p>
            </div>

            {/* Price Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 mb-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full -mr-16 -mt-16"></div>
              <div className="relative">
                <span className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                  ₹2
                </span>
                <span className="text-gray-600 text-lg ml-2">for 7 days</span>
                <p className="text-sm text-gray-500 mt-2">
                  Less than ₹0.30 per day
                </p>
              </div>
            </div>

            {/* Features List */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
                What's included
              </h3>
              <div className="space-y-4">
                {[
                  " Full premium access for 7 days",
                  " All features unlocked",
                  " Secure Razorpay checkout",
                  " Auto-expires after 7 days",
                  " Email support included",
                  " Cancel anytime"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-700">
                    <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm md:text-base">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Secure Payment
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                No Auto-renewal
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={startSubscription}
              disabled={loading}
              className={`w-full py-4 px-6 rounded-xl text-white font-semibold transition-all duration-200 
                shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                ${
                  loading
                    ? "bg-gradient-to-r from-indigo-400 to-purple-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:scale-[0.98]"
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Redirecting to Payment...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  Start 7-Day Trial Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              )}
            </button>

            {/* Messages */}
            {info && (
              <div className="mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                <p className="text-indigo-700 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4 text-indigo-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {info}
                </p>
              </div>
            )}
            
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl">
                <p className="text-red-600 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </p>
              </div>
            )}

            {/* Terms */}
            {/* <p className="mt-6 text-xs text-gray-400 text-center">
              By starting your trial, you agree to our{' '}
              <a href="/terms" className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2">
                Privacy Policy
              </a>
            </p> */}
          </div>
        </div>

        {/* Guarantee Badge */}
        {/* <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">30-day money-back guarantee</span>
          </div>
        </div> */}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
