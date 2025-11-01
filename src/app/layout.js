// app/layout.js
import "./globals.css";

export const metadata = {
  title: "Login Signup App",
  description: "Simple authentication layout by Bhagyashree",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
