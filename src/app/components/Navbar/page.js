"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  LogOut,
  User,
  QrCode,
  LayoutDashboard,
  FileText,
  Menu,
  X,
  CheckCircle,
} from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const isActive = (path) => pathname === path;

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/generate-qr", label: "Generate QR", icon: QrCode },
    { href: "/submissions", label: "Submissions", icon: FileText },
     { href: "/formSettings", label: "FormSettings", icon: FileText },
  ];

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm transition-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* LOGO */}
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
              onClick={closeMobileMenu}
            >
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              {/* <span className="hidden sm:inline">GoogleReviews</span> */}
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {user ? (
                <>
                  {navLinks.map(({ href, label, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                        isActive(href)
                          ? "bg-indigo-50 text-indigo-700 shadow-sm"
                          : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                      }`}
                    >
                      <Icon size={18} />
                      {label}
                    </Link>
                  ))}

                  {/* PROFILE DROPDOWN */}
                  <div className="relative ml-2" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all"
                      aria-label="User menu"
                    >
                      <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                        {user.email?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <ChevronDown
                        size={18}
                        className={`text-gray-600 transition-transform ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* DROPDOWN */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-blue-50">
                          <p className="font-semibold text-gray-900 truncate">{user.email}</p>
                          <p className="text-xs text-indigo-600 mt-1 flex items-center gap-1">
                            <CheckCircle size={14} />
                            Signed in
                          </p>
                        </div>

                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <User size={18} className="text-gray-500" />
                          My Profile
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 w-full text-left transition-colors"
                        >
                          <LogOut size={18} />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-indigo-600 font-medium px-4 py-2 rounded-xl transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          ref={mobileMenuRef}
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-4 space-y-1 bg-gray-50/50 border-t border-gray-200">
            {user ? (
              <>
                {navLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                      isActive(href)
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-700 hover:bg-white hover:shadow-sm"
                    }`}
                  >
                    <Icon size={20} />
                    {label}
                  </Link>
                ))}

                <Link
                  href="/profile"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-white hover:shadow-sm transition-all"
                >
                  <User size={20} />
                  My Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 w-full text-left font-medium transition-all"
                >
                  <LogOut size={20} />
                  Logout
                </button>

                <div className="mt-3 pt-3 border-t border-gray-300">
                  <p className="text-sm font-semibold text-gray-900 px-4">{user.email}</p>
                  <p className="text-xs text-indigo-600 px-4 mt-1 flex items-center gap-1">
                    <CheckCircle size={14} />
                    Signed in
                  </p>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="block text-center py-3 px-4 rounded-xl text-gray-700 hover:bg-white font-medium transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={closeMobileMenu}
                  className="block text-center py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium shadow-md hover:shadow-lg transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* BACKDROP */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden backdrop-blur-sm"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}