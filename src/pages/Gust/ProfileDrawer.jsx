import React, { forwardRef } from "react";
import { FaTimes, FaHeart, FaSuitcase, FaUserCircle } from "react-icons/fa";
import { FiMessageSquare, FiHelpCircle } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const ProfileDrawer = forwardRef(({ onClose }, ref) => {
  const navigate = useNavigate();
  const { logout,user } = useAuth();
  
  return (
    <>
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/40 z-40" />

      {/* Drawer */}
      <div
        ref={ref}
        className="fixed top-0 right-0 h-full w-[320px] bg-[#f6f1e7] z-50 shadow-xl animate-slideIn"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div
                className="text-lg"
                style={{ color: "#5b4636", opacity: 0.7 }}
              >
                Welcome, {user?.fullName || "User"}
              </div>
          <button onClick={onClose}>
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Menu */}
        <div className="p-4 space-y-4">
          <MenuItem icon={<FaHeart />} text="Likes" />
          <MenuItem icon={<FaSuitcase />} text="Trips" />
          <MenuItem
            icon={<FaUserCircle />}
            text="Profile"
            onClick={() => navigate("/profile")}
          />
          <MenuItem icon={<FiMessageSquare />} text="Messages" />
          <MenuItem icon={<IoSettingsOutline />} text="Account Settings" />
          <MenuItem icon={<FiHelpCircle />} text="Help Center" />
          <button
            onClick={logout}
            className="px-4 py-2"
            style={{
              backgroundColor: "#bfa98a",
              color: "white",
              borderRadius: "6px",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
});

const MenuItem = ({ icon, text, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
  >
    <span className="text-lg text-gray-600">{icon}</span>
    <span className="text-sm font-medium">{text}</span>
  </div>
);

export default ProfileDrawer;
