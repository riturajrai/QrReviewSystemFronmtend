"use client";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  
  const items = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Reviews", path: "/reviews" },
    { name: "Customers", path: "/customers" },
    { name: "QR Codes", path: "/qr" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <aside className="w-72 bg-white border-r hidden md:block shadow-lg">
      <div className="p-6 border-b">
        <h1 className="text-xl font-semibold text-indigo-600">ReviewUs Admin</h1>
        <p className="text-sm text-gray-500 mt-1">Review Management Dashboard</p>
      </div>
      <nav className="p-4 space-y-1 text-sm">
        {items.map((item) => (
          <button
            key={item.name}
            onClick={() => router.push(item.path)}
            className="w-full text-left block p-3 rounded-md hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
          >
            {item.name}
          </button>
        ))}
      </nav>
    </aside>
  );
}
