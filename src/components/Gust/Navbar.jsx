import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { Outlet, Link } from "react-router-dom";
import ProfileDrawer from "../../pages/Gust/ProfileDrawer";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

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
    <div style={{ fontFamily: "'Playfair Display', serif" }}>
      {/* HEADER */}
      <header
        className="flex items-center justify-between px-10 py-6 shadow-sm sticky top-0 z-50"
        style={{
          backgroundColor: "#f6f1e7",
          borderBottom: "1px solid #c2b8a3",
        }}
      >
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="text-3xl" style={{ color: "#5b4636" }}>
            🏰
          </div>
          <Link
            to="/"
            className="text-2xl font-semibold tracking-wide"
            style={{ color: "#5b4636" }}
          >
            StayEase
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10 text-lg">
          <Link
            to="/"
            className="transition"
            style={{ color: "#5b4636", fontWeight: "500" }}
          >
            Home
          </Link>

          <Link
            to="*"
            className="transition"
            style={{ color: "#5b4636", fontWeight: "500" }}
          >
            Search
          </Link>

          <Link
            to="/host/myresort"
            className="transition"
            style={{ color: "#5b4636", fontWeight: "500" }}
          >
            Host
          </Link>

          <Link
            to="*"
            className="transition"
            style={{ color: "#5b4636", fontWeight: "500" }}
          >
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
          className="md:hidden text-3xl"
          style={{ color: "#5b4636" }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div
          className="absolute top-16 left-0 w-full flex flex-col items-center space-y-4 py-6 md:hidden z-40"
          style={{
            backgroundColor: "#f6f1e7",
            borderBottom: "1px solid #c2b8a3",
          }}
        >
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg"
            style={{ color: "#5b4636" }}
          >
            Home
          </Link>

          <Link
            to=""
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg"
            style={{ color: "#5b4636" }}
          >
            Search
          </Link>

          <Link
            to="/host/myresort"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg"
            style={{ color: "#5b4636" }}
          >
            Host
          </Link>

          {/* AUTH AREA */}
          {!isLogin ? (
            <div className="flex flex-col items-center space-y-3">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg"
                style={{ color: "#5b4636" }}
              >
                Sign In
              </Link>
            </div>
          ) : (
            <>
              <div
                className="text-lg"
                style={{ color: "#5b4636", opacity: 0.7 }}
              >
                Welcome, {user?.fullName || "User"}
              </div>

              {/* MOBILE LOGOUT BUTTON */}
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="px-6 py-2"
                style={{
                  backgroundColor: "#bfa98a",
                  color: "white",
                  borderRadius: "6px",
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}

      {/* Floating Button */}
      <button
        className="fixed bottom-6 right-6 px-6 py-3 shadow-md"
        style={{
          backgroundColor: "#5b4636",
          color: "#f6f1e7",
          fontWeight: "600",
          borderRadius: "8px",
          zIndex: "39",
        }}
      >
        Book Now
      </button>

      <Outlet />
    </div>
  );
}

export default Navbar;
