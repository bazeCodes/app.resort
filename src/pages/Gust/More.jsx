import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaSuitcase, FaUserCircle } from "react-icons/fa";
import { FiMessageSquare, FiHelpCircle } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";

const More = () => {
  const navigate = useNavigate();

  // helper function for handling menu clicks
  const handleMenuClick = (path) => {
    if (path) navigate(path);
  };

  return (
    <div className="absolute top-12  w-64 bg-white rounded-xl shadow-lg border border-gray-200 p-2 z-50">
      {/* Section 1 */}
      <div className="space-y-2 border-b border-gray-200 pb-2">
        <MenuItem icon={<FaHeart />} text="Likes" />
        <MenuItem icon={<FaSuitcase />} text="Trips" />
        <MenuItem icon={<FiMessageSquare />} text="Messages" />
        {/* 👇 Profile navigates to /profile */}
        <MenuItem
          icon={<FaUserCircle />}
          text="Profile"
          onClick={() => handleMenuClick("/profile")}
        />
      </div>

      {/* Section 2 */}
      <div className="space-y-2 border-b border-gray-200 py-2">
        <MenuItem icon={<IoSettingsOutline />} text="Account settings" />
        <MenuItem icon={<FiHelpCircle />} text="Help Centre" />
      </div>

      {/* Section 3 */}
      <div className="space-y-2 pt-3">
        <MenuItem text="Log out" />
      </div>
    </div>
  );
};

const MenuItem = ({ icon, text, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
  >
    {icon && <span className="text-lg text-gray-600">{icon}</span>}
    <span className="text-sm text-gray-800">{text}</span>
  </div>
);

export default More;
