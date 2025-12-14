'use client';
import { usePathname } from 'next/navigation';
import Navbar from './components/Navbar/page';
import { AuthProvider } from './context/AuthContext';
import './globals.css';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Pages where Navbar should hide
  const hideNavbarPaths = ['/login', '/signup'];
  
  // Dynamic routes handling
  const hideNavbar = hideNavbarPaths.includes(pathname) || pathname.startsWith('/form/');

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {!hideNavbar && <Navbar />}
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
