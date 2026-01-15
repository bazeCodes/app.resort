import React, { useState, useEffect, useRef } from "react";
import {
  FaUserCircle,
  FaBars,
  FaTimes,
  FaHeart,
  FaSuitcase,
  FaSearch,
} from "react-icons/fa";
import { FiMessageSquare, FiHelpCircle } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { Outlet, Link, useNavigate } from "react-router-dom";
import ProfileDrawer from "./ProfileDrawer";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const { isLogin, user, logout } = useAuth();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div >
      {/* HEADER */}
      <header
        className="flex items-center justify-between px-10 py-6 shadow-sm sticky top-0 z-50 text-black"
        style={{
          backgroundColor: "#f6f1e7",
          borderBottom: "1px solid #c2b8a3",
        }}
      >
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link
            to="/"
            className="text-3xl font-bold tracking-wide "
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            StayEase
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10 text-xl font-[500]">
          <Link to="/" className="transition">
            Home
          </Link>

          <Link to="*" className="transition">
            Search
          </Link>
          {isLogin && (
            <Link to="/host/myresort" className="transition">
              Host
            </Link>
          )}

          <Link to="*" className="transition">
            About
          </Link>
        </nav>

        {/* Desktop User Section */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              {/* USER ICON */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="text-3xl"
                  style={{ color: "#5b4636" }}
                >
                  <FaUserCircle />
                </button>

                {isUserMenuOpen && <ProfileDrawer />}
              </div>
              {isDrawerOpen && (
                <ProfileDrawer
                  ref={drawerRef}
                  onClose={() => setIsDrawerOpen(false)}
                />
              )}

              {/* LOGOUT BUTTON */}
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2"
                style={{
                  color: "#5b4636",
                  border: "1px solid #b6a893",
                }}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2"
                style={{
                  color: "#5b4636",
                  border: "1px solid #b6a893",
                }}
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-3xl z-60"
          style={{ color: "#5b4636" }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed top-0 right-0 h-full w-[300px] bg-[#f6f1e7] z-50 shadow-xl animate-slideIn rounded-2xl flex flex-col">
            <div className="flex justify-between items-center p-5 border-b">
              <div
                className="text-xl"
                style={{ color: "#2d231c", opacity: 0.7 }}
              >
                👋 Hallo {user?.fullName || "User"}
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <FaTimes className="text-2xl" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-4 flex-1">
              <MobileItem
                icon={<FaSearch />}
                text="Search"
                onClick={() => {
                  navigate("/properties");
                  setIsMobileMenuOpen(false);
                }}
              />
              {isLogin && (
                <MobileItem
                  icon={<FaSuitcase />}
                  text="Host"
                  onClick={() => {
                    navigate("/Host/MyResort");
                    setIsMobileMenuOpen(false);
                  }}
                />
              )}
              <MobileItem
                icon={<FaHeart />}
                text="Likes"
                onClick={() => {
                  navigate("/wishlist/:propertyId");
                  setIsMobileMenuOpen(false);
                }}
              />

              <MobileItem
                icon={<FaSuitcase />}
                text="Trips"
                onClick={() => {
                  navigate("*");
                  setIsMobileMenuOpen(false);
                }}
              />

              <MobileItem
                icon={<FiMessageSquare />}
                text="Messages"
                onClick={() => {
                  navigate("*");
                  setIsMobileMenuOpen(false);
                }}
              />

              <MobileItem
                icon={<IoSettingsOutline />}
                text="Account Settings"
                onClick={() => {
                  navigate("*");
                  setIsMobileMenuOpen(false);
                }}
              />

              <MobileItem
                icon={<FiHelpCircle />}
                text="Help Center"
                onClick={() => {
                  navigate("*");
                  setIsMobileMenuOpen(false);
                }}
              />

              {isLogin && (
                <MobileItem
                  icon={<FaUserCircle />}
                  text="Profile"
                  onClick={() => {
                    navigate("/profile");
                    setIsMobileMenuOpen(false);
                  }}
                />
              )}
            </div>

            {!isLogin && (
              <div className="p-4 border-t">
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2 rounded-md"
                  style={{
                    backgroundColor: "#bfa98a",
                    color: "white",
                  }}
                >
                  Sign In
                </button>
              </div>
            )}

            {/* Footer / Logout */}
            {isLogin && (
              <div className="p-4 border-t">
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2 rounded-md"
                  style={{
                    backgroundColor: "#bfa98a",
                    color: "white",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Floating Button */}
      <Link
        className="fixed bottom-6 right-6 px-6 py-3 shadow-md transition-all duration-300 hover:-translate-y-2"
        to="/properties"
        style={{
          backgroundColor: "#5b4636",
          color: "#f6f1e7",
          fontWeight: "600",
          borderRadius: "8px",
          zIndex: "39",
        }}
      >
        Book Now
      </Link>

      <Outlet />
    </div>
  );
}

const MobileItem = ({ text, onClick, icon }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3 mb-2 px-3 py-2 rounded-lg cursor-pointer text-lg hover:bg-gray-100"
    style={{ color: "#5b4636" }}
  >
    {icon && <span className="text-xl font-medium">{icon}</span>}
    {text}
  </div>
);

export default Navbar;
