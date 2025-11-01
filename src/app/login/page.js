


// // "use client";
// // import { useState } from "react";
// // import axios from "axios";
// // import { useRouter } from "next/navigation";
// // import { motion } from "framer-motion";

// // export default function Login() {
// //   const [formData, setFormData] = useState({ email: "", password: "" });
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
// //       const res = await axios.post("https://reviwes-backend.onrender.com/api/login", formData);
// //       setMessage({ type: "success", text: res.data.message });
// //       setTimeout(() => router.push("/dashboard"), 1500);
// //     } catch (err) {
// //       setMessage({ type: "error", text: err.response?.data?.message || "Invalid credentials!" });
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
// //       <motion.div
// //         initial={{ opacity: 0, y: 30 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.6 }}
// //         className="bg-white/90 backdrop-blur-lg border border-gray-200 p-10 rounded-2xl shadow-lg w-full max-w-md"
// //       >
// //         <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
// //           Welcome Back
// //         </h2>

// //         {message.text && (
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             className={`mb-4 p-3 rounded-md text-sm text-center ${
// //               message.type === "success"
// //                 ? "bg-green-100 text-green-700"
// //                 : message.type === "error"
// //                 ? "bg-red-100 text-red-700"
// //                 : "bg-blue-100 text-blue-700"
// //             }`}
// //           >
// //             {message.text}
// //           </motion.div>
// //         )}

// //         <form onSubmit={handleSubmit} className="space-y-5">
// //           <motion.input
// //             whileFocus={{ scale: 1.02 }}
// //             type="email"
// //             name="email"
// //             placeholder="Email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
// //             required
// //           />

// //           <motion.input
// //             whileFocus={{ scale: 1.02 }}
// //             type="password"
// //             name="password"
// //             placeholder="Password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
// //             required
// //           />

// //           <div className="flex justify-between items-center text-sm text-gray-600">
// //             <label className="flex items-center space-x-2">
// //               <input type="checkbox" className="accent-blue-600" /> <span>Remember me</span>
// //             </label>
// //             <span className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
// //               Forgot Password?
// //             </span>
// //           </div>

// //           <motion.button
// //             whileHover={{ scale: 1.03 }}
// //             whileTap={{ scale: 0.97 }}
// //             type="submit"
// //             className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold transition-all duration-300 shadow-md"
// //           >
// //             Login
// //           </motion.button>
// //         </form>

// //         <p className="text-center text-gray-600 text-sm mt-6">
// //           Don’t have an account?{" "}
// //           <span
// //             onClick={() => router.push("/signup")}
// //             className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
// //           >
// //             Sign Up
// //           </span>
// //         </p>
// //       </motion.div>
// //     </div>
// //   );
// // }


// "use client";
// import { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import "./animatedGradient.css"; // we will create this CSS file

// export default function LoginPage() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
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
//       const res = await axios.post(
//         "https://reviwes-backend.onrender.com/api/login",
//         formData
//       );
//       setMessage({ type: "success", text: res.data.message });
//       setTimeout(() => router.push("/dashboard"), 1500);
//     } catch (err) {
//       setMessage({
//         type: "error",
//         text: err.response?.data?.message || "Invalid credentials!",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row animated-gradient">
//       {/* Left Side - Login Form */}
//       <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-16">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl"
//         >
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">
//             Welcome <span className="text-purple-600">Back!</span>
//           </h2>
//           <p className="text-gray-500 mb-6">
//             Manage and showcase reviews effortlessly with{" "}
//             <span className="text-purple-600 font-semibold">Review Us</span>.
//           </p>

//           {message.text && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className={`mb-4 p-3 rounded-md text-sm text-center ${
//                 message.type === "success"
//                   ? "bg-green-100 text-green-700"
//                   : message.type === "error"
//                   ? "bg-red-100 text-red-700"
//                   : "bg-blue-100 text-blue-700"
//               }`}
//             >
//               {message.text}
//             </motion.div>
//           )}

//           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//             <motion.input
//               whileFocus={{ scale: 1.02 }}
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
//               required
//             />
//             <motion.input
//               whileFocus={{ scale: 1.02 }}
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
//               required
//             />

//             <div className="flex justify-between items-center text-sm text-gray-600">
//               <label className="flex items-center space-x-2">
//                 <input type="checkbox" className="accent-blue-600" />
//                 <span>Remember me</span>
//               </label>
//               <span
//                 className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
//                 onClick={() => alert("Redirect to forgot password")}
//               >
//                 Forgot Password?
//               </span>
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               type="submit"
//               className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
//             >
//               Sign In
//             </motion.button>
//           </form>

//           <p className="text-center text-gray-400 mt-4">
//             No account?{" "}
//             <span
//               onClick={() => router.push("/signup")}
//               className="text-blue-600 font-semibold hover:text-blue-700 cursor-pointer"
//             >
//               Register
//             </span>
//           </p>

//           <div className="flex justify-center mt-6">
//             <button className="flex items-center gap-3 bg-black text-white px-5 py-3 rounded-lg shadow hover:bg-gray-800 transition">
//               <Image
//                 src="/google-play-badge.png"
//                 alt="Google Play"
//                 width={30}
//                 height={30}
//               />
//               Download App
//             </button>
//           </div>

//           <p className="text-center text-gray-300 mt-6 text-sm">
//             © {new Date().getFullYear()} Review Us
//           </p>
//         </motion.div>
//       </div>

//       {/* Right Side - Graphics */}
//       <div className="flex-1 relative hidden md:flex justify-center items-center">
//         <Image
//           src="/login-illustration.png"
//           alt="Illustration"
//           width={500}
//           height={500}
//           className="object-contain"
//         />
//       </div>
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";


export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      const res = await axios.post(
        "https://reviwes-backend.onrender.com/api/login",
        formData
      );
      setMessage({ type: "success", text: res.data.message });
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Invalid credentials!",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row animated-gradient">
      
      {/* Left Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome <span className="text-purple-600">Back!</span>
          </h2>
          <p className="text-gray-500 mb-6">
            Manage and showcase reviews effortlessly with{" "}
            <span className="text-purple-600 font-semibold">Review Us</span>.
          </p>

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

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              required
            />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              required
            />

            <div className="flex justify-between items-center text-sm text-gray-600">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="accent-blue-600" />
                <span>Remember me</span>
              </label>
              <span
                className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
                onClick={() => alert("Redirect to forgot password")}
              >
                Forgot Password?
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
            >
              Sign In
            </motion.button>
          </form>

          <p className="text-center text-gray-400 mt-4">
            No account?{" "}
            <span
              onClick={() => router.push("/signup")}
              className="text-blue-600 font-semibold hover:text-blue-700 cursor-pointer"
            >
              Register
            </span>
          </p>

          <div className="flex justify-center mt-6">
            <button className="flex items-center gap-3 bg-black text-white px-5 py-3 rounded-lg shadow hover:bg-gray-800 transition">
              <Image
                src="/google-play-badge.png"
                alt="Google Play"
                width={30}
                height={30}
              />
              Download App
            </button>
          </div>

          <p className="text-center text-gray-300 mt-6 text-sm">
            © {new Date().getFullYear()} Review Us
          </p>
        </motion.div>
      </div>

      {/* Right Side - Floating Illustration */}
      <div className="flex-1 relative hidden md:flex justify-center items-center">
        <Image
          src="/login-illustration.png"
          alt="Illustration"
          width={500}
          height={500}
          className="object-contain floating-illustration"
        />
      </div>
    </div>
  );
}


