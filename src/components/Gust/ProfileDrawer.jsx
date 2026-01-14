  import React, { forwardRef } from "react";
  import { FaTimes, FaHeart, FaSuitcase, FaUserCircle } from "react-icons/fa";
  import { FiMessageSquare, FiHelpCircle } from "react-icons/fi";
  import { IoSettingsOutline } from "react-icons/io5";
  import { useNavigate } from "react-router-dom";
  import { useAuth } from "../../context/AuthContext";

  const ProfileDrawer = forwardRef(({ onClose }, ref) => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    return (
      <>
        {/* Background Overlay */}
        <div className="fixed inset-0 bg-black/40 z-40" />

        {/* Drawer */}
        <div
          ref={ref}
          className="fixed top-0 right-0 h-full w-[320px]  bg-[#f6f1e7] z-50 shadow-xl animate-slideIn rounded-2xl "
        >
          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b gap-3">
            <div className="text-xl" style={{ color: "#5b4636", opacity: 0.7 }}>
             👋 Hallo {user?.fullName || "User"}
            </div>
            <button onClick={onClose}>
              <FaTimes className="text-2xl" />
            </button>
          </div>

          {/* Menu */}
          <div className="p-4 space-y-4">
            <MenuItem
              icon={<FaHeart />}
              text="Likes"
              onClick={() => {
                navigate("/wishlist/:propertyId");
                onClose();
              }}
            />
            <MenuItem
              icon={<FaSuitcase />}
              text="Trips"
              onClick={() => {
                navigate("*");
                onClose();
              }}
            />
            <MenuItem
              icon={<FaUserCircle />}
              text="Profile"
              onClick={() => {
                navigate("/profile");
                onClose();
              }}
            />
            <MenuItem
              icon={<FiMessageSquare />}
              text="Messages"
              onClick={() => {
                navigate("*");
                onClose();
              }}
            />
            <MenuItem
              icon={<IoSettingsOutline />}
              text="Account Settings"
              onClick={() => {
                navigate("*");
                onClose();
              }}
            />
            <MenuItem
              icon={<FiHelpCircle />}
              text="Help Center"
              onClick={() => {
                navigate("*");
                onClose();
              }}
            />
          </div>
          <div className="p-4 border-t">
            <button
              onClick={logout}
              className="w-full py-2 rounded-md"
              style={{
                backgroundColor: "#bfa98a",
                color: "white",
                navigate:"/"
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
      <span className="text-lg font-medium">{text}</span>
    </div>
  );

  export default ProfileDrawer;
