

// "use client";
// import Link from "next/link";

// export default function Navbar() {
//   return (
//     <nav className="flex justify-between items-center bg-white shadow-md px-6 py-4">
//       <h1 className="text-2xl font-bold text-blue-600">QR Review</h1>
//       <div className="space-x-4">
//         <Link href="/login" className="text-gray-600 hover:text-blue-600">
//           Login
//         </Link>
//         <Link href="/signup" className="text-gray-600 hover:text-blue-600">
//           Signup
//         </Link>
//       </div>
//     </nav>
//   );
// }




"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // for icons (install lucide-react)

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide cursor-pointer hover:scale-105 transition-transform">
          <span className="text-yellow-300">QR</span> Review
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-lg">
          <Link
            href="/"
            className="hover:text-yellow-300 transition duration-200"
          >
            Home
          </Link>
          <Link
            href="/features"
            className="hover:text-yellow-300 transition duration-200"
          >
            Features
          </Link>
          <Link
            href="/about"
            className="hover:text-yellow-300 transition duration-200"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-yellow-300 transition duration-200"
          >
            Contact
          </Link>
          <Link
            href="/login"
            className="bg-yellow-300 text-blue-800 font-semibold px-4 py-2 rounded-full hover:bg-yellow-400 transition"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="border border-yellow-300 px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-blue-800 font-semibold transition"
          >
            Signup
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white text-center py-4 space-y-3 animate-slide-down">
          <Link
            href="/"
            className="block hover:text-yellow-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/features"
            className="block hover:text-yellow-300"
            onClick={() => setIsOpen(false)}
          >
            Features
          </Link>
          <Link
            href="/about"
            className="block hover:text-yellow-300"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block hover:text-yellow-300"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <Link
            href="/login"
            className="block bg-yellow-300 text-blue-800 px-4 py-2 mx-20 rounded-full font-semibold hover:bg-yellow-400"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="block border border-yellow-300 px-4 py-2 mx-20 rounded-full font-semibold hover:bg-yellow-300 hover:text-blue-800"
            onClick={() => setIsOpen(false)}
          >
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
}



