import React, { useState } from "react";

export default function SideBar({ setSidebarOpen }: { setSidebarOpen: (isOpen: boolean) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setSidebarOpen(!isOpen); // Comunicar el estado a App.tsx
  };

  return (
    <>
      {/* Botón de apertura */}
      <button
        className="fixed top-5 left-5 z-50 text-gray-800 dark:text-white text-xl focus:outline-none"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 p-4 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button className="text-white mb-4 text-xl" onClick={toggleSidebar}>
          ✖
        </button>

        <ul className="text-white space-y-4 text-lg pt-5">
          <li><a href="/" className="block hover:text-gray-300">🏠 Home</a></li>
          <li><a href="/login" className="block hover:text-gray-300">🔑 Login</a></li>
          <li><a href="/register" className="block hover:text-gray-300">📝 Register</a></li>
          <li><a href="/profile" className="block hover:text-gray-300">👤 Profile</a></li>
          <li><a href="/usersProfile" className="block hover:text-gray-300">👥 Users Profile</a></li>
        </ul>
      </div>
    </>
  );
}
