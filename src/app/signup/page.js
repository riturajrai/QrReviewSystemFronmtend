// // "use client";
// // import { useState } from "react";
// // import axios from "axios";
// // import { useRouter } from "next/navigation";

// // export default function Signup() {
// //   const [formData, setFormData] = useState({ username: "", email: "", password: "" });
// //   const [message, setMessage] = useState({ type: "", text: "" });
// //   const router = useRouter();

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setMessage({ type: "info", text: "Please wait..." });

// //     try {
// //       const res = await axios.post("https://reviwes-backend.onrender.com/api/signup", formData);
// //       setMessage({ type: "success", text: res.data.message });
// //       setTimeout(() => router.push("/login"), 1500);
// //     } catch (err) {
// //       setMessage({ type: "error", text: err.response?.data?.message || "Something went wrong!" });
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 p-4">
// //       <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md animate-fadeInUp">
// //         <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">Signup</h2>

// //         {message.text && (
// //           <div
// //             className={`mb-4 p-3 rounded-md text-sm font-medium ${
// //               message.type === "success"
// //                 ? "bg-green-100 text-green-800"
// //                 : message.type === "error"
// //                 ? "bg-red-100 text-red-800"
// //                 : "bg-blue-100 text-blue-800"
// //             } animate-pulse`}
// //           >
// //             {message.text}
// //           </div>
// //         )}

// //         <input
// //           type="text"
// //           name="username"
// //           placeholder="Username"
// //           value={formData.username}
// //           onChange={handleChange}
// //           className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           required
// //         />

// //         <input
// //           type="email"
// //           name="email"
// //           placeholder="Email"
// //           value={formData.email}
// //           onChange={handleChange}
// //           className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           required
// //         />

// //         <input
// //           type="password"
// //           name="password"
// //           placeholder="Password"
// //           value={formData.password}
// //           onChange={handleChange}
// //           className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           required
// //         />

// //         <button
// //           type="submit"
// //           className="w-full bg-blue-600 text-white py-3 rounded-lg mt-2 hover:bg-blue-700 transition-all duration-300 font-semibold shadow-md"
// //         >
// //           Signup
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }



// "use client";
// import { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";

// export default function Signup() {
//   const [formData, setFormData] = useState({ username: "", email: "", password: "" });
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const router = useRouter();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage({ type: "info", text: "Please wait..." });

//     try {
//       const res = await axios.post("https://reviwes-backend.onrender.com/api/signup", formData);
//       setMessage({ type: "success", text: res.data.message });
//       setTimeout(() => router.push("/login"), 1500);
//     } catch (err) {
//       setMessage({ type: "error", text: err.response?.data?.message || "Something went wrong!" });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-50 to-white px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md border border-blue-100"
//       >
//         <motion.h2
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text"
//         >
//           Create Account
//         </motion.h2>

//         {message.text && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className={`mb-4 p-3 rounded-lg text-sm font-medium text-center ${
//               message.type === "success"
//                 ? "bg-green-100 text-green-800"
//                 : message.type === "error"
//                 ? "bg-red-100 text-red-800"
//                 : "bg-blue-100 text-blue-800"
//             }`}
//           >
//             {message.text}
//           </motion.div>
//         )}

//         <motion.form onSubmit={handleSubmit} className="space-y-4">
//           <motion.input
//             whileFocus={{ scale: 1.02 }}
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
//             required
//           />

//           <motion.input
//             whileFocus={{ scale: 1.02 }}
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
//             required
//           />

//           <motion.input
//             whileFocus={{ scale: 1.02 }}
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
//             required
//           />

//           <motion.button
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.98 }}
//             type="submit"
//             className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg mt-2 font-semibold shadow-md hover:shadow-lg transition-all duration-300"
//           >
//             Sign Up
//           </motion.button>
//         </motion.form>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//           className="text-center text-gray-500 text-sm mt-6"
//         >
//           Already have an account?{" "}
//           <span
//             onClick={() => router.push("/login")}
//             className="text-blue-600 hover:text-indigo-600 cursor-pointer font-medium"
//           >
//             Login
//           </span>
//         </motion.p>
//       </motion.div>
//     </div>
//   );
// }




"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Signup() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState({ type: "", text: "" });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "info", text: "Please wait..." });

    try {
      const res = await axios.post("https://reviwes-backend.onrender.com/api/signup", formData);
      setMessage({ type: "success", text: res.data.message });
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Something went wrong!" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 backdrop-blur-lg border border-gray-200 p-10 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create an Account
        </h2>

        {message.text && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mb-4 p-3 rounded-md text-sm text-center ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : message.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {message.text}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            required
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            required
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            required
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold transition-all duration-300 shadow-md"
          >
            Sign Up
          </motion.button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}
