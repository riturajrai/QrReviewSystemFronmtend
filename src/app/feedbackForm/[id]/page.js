"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const API_BASE = "https://reviwes-backend.onrender.com";

export default function FeedbackForm({ params }) {
  const router = useRouter();
  const { id } = params; // QR ke liye unique ID
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    comments: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.comments) {
      setErrorMsg("All fields are required!");
      setLoading(false);
      return;
    }
    if (formData.rating < 1 || formData.rating > 5) {
      setErrorMsg("Rating must be between 1 and 5!");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMsg(data.message);
        setTimeout(() => {
          if (data.googleReviewLink) {
            window.location.href = data.googleReviewLink; // Redirect
          } else {
            setSuccessMsg(""); // hide success msg
            router.push("/thank-you"); // fallback page
          }
        }, 1500);
      } else {
        setErrorMsg(data.message || "Submission failed");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white p-4">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Submit Your Feedback</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          We value your feedback. Please fill out the form below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Rating</label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>{r} ★</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Comments</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
            ></textarea>
          </div>

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
          {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
