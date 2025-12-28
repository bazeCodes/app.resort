import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Plus, Settings, User } from "lucide-react";

// ✅ Helper function to merge class names
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const sidebarItems = [
  {
    title: "My Resorts",
    icon: Home,
    path: "/Host/MyResort",
  },

  {
    title: "Add Resort",
    icon: Plus,
    path: "/Host/AddResort",
  },

  {
    title: "Profile",
    icon: User,
    path: "/Host/HostProfile",
  },

  {
    title: "Settings",
    icon: Settings,
    path: "*",
  },
];

function HostSidebar() {
  const location = useLocation();

  return (
    <>
      {/* ===== Desktop Sidebar ===== */}
      <aside className="hidden md:flex w-60 bg-white shadow-md p-6 flex-col relative">
        <Link to="/" className="text-xl font-semibold mb-6">
          Host Dashboard
        </Link>

        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                  isActive
                    ? "bg-[#10b5cb] text-white"
                    : "hover:bg-gray-100 text-gray-700"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default HostSidebar;
