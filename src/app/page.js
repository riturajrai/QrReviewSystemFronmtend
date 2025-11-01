
// // "use client";
// // import Navbar from "@/components/Navbar";

// // export default function Home() {
// //   return (
// //     <>
// //       <Navbar />
// //       <div className="flex justify-center items-center h-[80vh]">
// //         <h1 className="text-3xl font-bold text-gray-700">Welcome to QR Review System</h1>
// //       </div>
// //     </>
// //   );
// // }


"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 overflow-hidden">
        {/* Background Glow */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute w-[400px] h-[400px] bg-indigo-300 rounded-full blur-3xl opacity-30"
        ></motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4 z-10"
        >
          Review Us Software
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed z-10"
        >
          A simple and powerful system to collect customer reviews through QR codes,
          manage feedback, and grow your online reputation.
        </motion.p>

        {/* Button */}
        <motion.a
          href="#features"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mt-8 px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all z-10"
        >
          Explore Features
        </motion.a>
      </section>

      {/* Core Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-12"
          >
            Core Features
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "QR-based Review Page",
                desc: "Customers can scan a QR code to instantly open the review page on their phone.",
              },
              {
                title: "Feedback Form",
                desc: "Collect Name, Email, Star Rating, Comments, and optional Images for better context.",
              },
              {
                title: "Google/Facebook Review Button",
                desc: "Redirect customers to leave reviews on Google or Facebook to boost your online presence.",
              },
              {
                title: "Admin Dashboard",
                desc: "Secure admin panel with total reviews, charts, filters, and download options.",
              },
              {
                title: "Email/SMS Notifications",
                desc: "Instant alerts whenever a new review is submitted for quick response.",
              },
              {
                title: "Branch Management & reCAPTCHA",
                desc: "Manage multiple branches with separate QR codes and prevent spam with reCAPTCHA.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-semibold text-blue-700 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-100 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Review Us Software — All Rights Reserved.
      </footer>
    </>
  );
}










