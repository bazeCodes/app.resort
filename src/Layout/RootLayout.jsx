import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { Outlet, Link } from "react-router-dom";
import More from "../pages/Gust/More";
import { useAuth } from "../context/AuthContext";


function RootLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null); // 👈 reference for click detection

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { isLogin, user } =  useAuth();  // ← get login state
  
  return (
    <div>
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-6 bg-white shadow-sm sticky top-0 z-50 ">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div style={{ color: "hsl(187, 85%, 43%)" }} className="text-2xl">
            🏠
          </div>
          <Link
            to="/"
            style={{ color: "hsl(187, 85%, 43%)" }}
            className="text-xl font-semibold"
          >
            StayEase
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-gray-700">
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("/")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hover:text-[#10b5cb] text-lg"
          >
            Home
          </a>
          <Link to="/search" className="hover:text-[#10b5cb] text-lg">
            Search
          </Link>
          <Link to="/host/myresort" className="hover:text-[#10b5cb] text-lg">
            Host
          </Link>
          <a
            href="#About"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("About")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hover:text-[#10b5cb] text-lg"
          >
            About
          </a>
        </nav>

        {/* Desktop User & Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {/* User Dropdown When Logged In */}
          {isLogin && (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="text-gray-600 text-2xl hover:text-black"
              >
                <FaUserCircle />
              </button>

              {isUserMenuOpen && <More />}
            </div>
          )}

          {/* Login & Register Buttons When Not Logged In */}
          {!isLogin && (
            <>
              <Link
                to="/login"
                className="text-gray-700 px-4 py-2 rounded-md hover:bg-[#10b5cb] hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-700 px-4 py-2 rounded-md hover:bg-[#10b5cb] hover:text-white transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 text-2xl focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-6 md:hidden z-40">
          <Link
            to="/"
            className="hover:text-[#10b5cb]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/search"
            className="hover:text-[#10b5cb]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Search
          </Link>
          <Link
            to="/host/myresort"
            className="hover:text-[#10b5cb]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Become a Host
          </Link>

          <div className="flex flex-col items-center space-y-3">
            <Link
              to="/login"
              className="text-gray-700 hover:text-[#10b5cb]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="text-gray-700 px-6 py-2 rounded-md hover:bg-[#10b5cb] hover:text-white transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
      {/* Floating Button */}
      <button
        style={{ backgroundColor: "#10b5cb" }}
        className="fixed bottom-6 right-6 px-6 py-3 text-white font-semibold rounded-full shadow-xl flex items-center gap-2 z-100"
      >
        <span>📅</span> Book Now
      </button>
      {/* Page Content */}
      <Outlet />
    </div>
  );
}

export default RootLayout;
