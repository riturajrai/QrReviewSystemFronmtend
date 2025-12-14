"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import logo from "../../../../public/reviwist.png";

export default function Footer() {
  const publicLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/features", label: "Features" },
    { href: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    { href: "https://facebook.com", icon: Facebook },
    { href: "https://twitter.com", icon: Twitter },
    { href: "https://instagram.com", icon: Instagram },
    { href: "https://linkedin.com", icon: Linkedin },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image src={logo} alt="Reviwist Logo" width={80} height={80} className="rounded" />
            </Link>
            <p className="text-gray-600 text-sm text-center md:text-left">
              A platform to leave reviews and generate QR codes easily.
            </p>
          </div>

          {/* Public Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {publicLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-gray-700 hover:text-indigo-600 text-sm transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            {socialLinks.map(({ href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} Reviwist. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
