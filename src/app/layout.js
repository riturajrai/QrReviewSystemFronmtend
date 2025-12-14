"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar/page";
import Footer from "./components/footer/page";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Pages where Navbar should hide
  const hideNavbarPaths = ["/login", "/signup"];

  // Dynamic routes handling (e.g., /form/:id)
  const hideNavbar = hideNavbarPaths.includes(pathname) || pathname.startsWith("/form/");

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          {/* Show Navbar only if not in hide paths */}
          {!hideNavbar && <Navbar />}

          {/* Main content */}
          <main className="flex-grow">{children}</main>

          {/* Footer always visible */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
