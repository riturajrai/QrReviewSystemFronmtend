// // app/feedback/[id]/page.jsx
// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useParams } from "next/navigation";

// const API_BASE = "https://reviwes-backend.onrender.com"; // <-- change to yours

// export default function FeedbackPage() {
//   const params = useParams();
//   const router = useRouter();
//   const qrId = params?.id || ""; // id from URL

//   const [name, setName] = useState("");
//   const [rating, setRating] = useState(5);
//   const [comments, setComments] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [successMsg, setSuccessMsg] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name.trim() || !comments.trim()) {
//       alert("Please enter name and feedback.");
//       return;
//     }
//     setLoading(true);

//     try {
//       // Example POST request structure — change fields to match your backend
//       const payload = {
//         qrId,
//         name,
//         rating: Number(rating),
//         comments,
//         createdAt: new Date().toISOString(),
//       };

//       const res = await fetch(`${API_BASE}/feedback`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         const txt = await res.text();
//         throw new Error(txt || "Failed to submit feedback");
//       }

//       setSuccessMsg("Feedback submitted successfully. Thank you!");
//       // Clear form
//       setName("");
//       setRating(5);
//       setComments("");

//       // Optionally redirect to reviews page after short delay
//       setTimeout(() => {
//         router.push("/reviews");
//       }, 1200);
//     } catch (err) {
//       console.error("Submit feedback error:", err);
//       alert("Failed to submit feedback. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
//       <div className="w-full max-w-lg bg-white rounded-2xl shadow p-8">
//         <h2 className="text-2xl font-semibold mb-2">Share your feedback</h2>
//         <p className="text-sm text-gray-500 mb-6">
//           We value your opinion. QR ID: <span className="font-medium">{qrId}</span>
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="text-sm text-gray-600">Your name</label>
//             <input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full mt-1 border rounded-md px-3 py-2"
//               placeholder="Enter your name"
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-600">Rating</label>
//             <select
//               value={rating}
//               onChange={(e) => setRating(e.target.value)}
//               className="w-full mt-1 border rounded-md px-3 py-2"
//             >
//               <option value={5}>5 - Excellent</option>
//               <option value={4}>4 - Very Good</option>
//               <option value={3}>3 - Good</option>
//               <option value={2}>2 - Could be better</option>
//               <option value={1}>1 - Poor</option>
//             </select>
//           </div>

//           <div>
//             <label className="text-sm text-gray-600">Comments</label>
//             <textarea
//               value={comments}
//               onChange={(e) => setComments(e.target.value)}
//               className="w-full mt-1 border rounded-md px-3 py-2 h-32"
//               placeholder="Write your feedback..."
//             />
//           </div>

//           <div className="flex items-center gap-3">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`px-5 py-2 rounded-lg text-white font-medium ${
//                 loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
//               }`}
//             >
//               {loading ? "Submitting..." : "Submit Feedback"}
//             </button>
//             <button
//               type="button"
//               onClick={() => router.push("/")}
//               className="px-4 py-2 rounded-lg border text-sm"
//             >
//               Cancel
//             </button>
//           </div>

//           {successMsg && <div className="mt-3 text-green-600">{successMsg}</div>}
//         </form>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";

const API_BASE = "https://reviwes-backend.onrender.com";

export default function FeedbackPage() {
  const params = useParams(); // Ye [id] se milega
  const feedbackId = params.id;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
    comments: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_BASE}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setMessage(data.message || "Feedback submitted successfully!");
        setFormData({ name: "", email: "", rating: "", comments: "" });
      } else {
        setMessage(data.message || "Submission failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Feedback Form</h2>
        <p className="text-sm text-gray-500 mb-4">Your Feedback ID: <b>{feedbackId}</b></p>

        {message && (
          <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">{message}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
            required
          />

          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
            required
          >
            <option value="">Select Rating</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>

          <textarea
            name="comments"
            placeholder="Your Comments"
            value={formData.comments}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white font-semibold ${
              loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
}
