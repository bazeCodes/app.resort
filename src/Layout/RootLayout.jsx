import React from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function RootLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm sticky top-0 z-50 ">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="text-pink-600 text-2xl">🏠</div>
          <h1 className="text-xl font-semibold text-pink-600">StayEase</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-gray-700">
          <a href="#" className="hover:text-pink-600">
            Home
          </a>
          <a href="#" className="hover:text-pink-600">
            Search
          </a>
          <a href="#" className="hover:text-pink-600">
            Become a Host
          </a>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <FaUserCircle className="text-gray-600 text-xl" />
          <button className="text-gray-700 hover:text-pink-600">Sign In</button>
          <button className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-6 md:hidden">
            <a href="#" className="hover:text-pink-600">
              Home
            </a>
            <a href="#" className="hover:text-pink-600">
              Search
            </a>
            <a href="#" className="hover:text-pink-600">
              Become a Host
            </a>
            <div className="flex flex-col items-center space-y-3">
              <button className="text-gray-700 hover:text-pink-600">
                Sign In
              </button>
              <button className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </header>
      <Outlet />
    </div>
  );
}

export default RootLayout;
