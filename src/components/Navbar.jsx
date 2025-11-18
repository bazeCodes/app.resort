import React, { useState } from "react";
import { CiHome } from "react-icons/ci";
import { LuPlus } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { RxPerson } from "react-icons/rx";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="md:hidden top-0 left-0 w-full h-20 bg-white shadow-md p-4 flex justify-between items-center relative scroll-m-2">
      {/* Navbar Header */}
      <Link to="/" className="text-lg font-semibold text-gray-800">Host Dashboard</Link>

      {/* Menu Toggle Button */}
      <button
        className="text-gray-700 text-2xl focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="absolute w-full top-20 bg-white shadow-md flex flex-col items-start space-y-4 py-4 px-6 z-50">
          <Link
            to="/Host/MyResort"
            className="flex items-center space-x-2 text-gray-700 hover:text-[#10b5cb]"
            onClick={() => setMenuOpen(false)}
          >
            <CiHome className="text-2xl" />
            <span>My Resorts</span>
          </Link> 

          <Link
            to="/Host/AddResort"
            className="flex items-center space-x-2 text-gray-700 hover:text-[#10b5cb]"
            onClick={() => setMenuOpen(false)}
          >
            <LuPlus className="text-2xl" />
            <span>Add Resort</span>
          </Link>

          <Link
            to="/Host/HostProfile"
            className="flex items-center space-x-2 text-gray-700 hover:text-[#10b5cb]"
            onClick={() => setMenuOpen(false)}
          >
            <RxPerson className="text-2xl" />
            <span>Profile</span>
          </Link>

          <button
            className="flex items-center space-x-2 text-gray-700 hover:text-[#10b5cb]"
            onClick={() => setMenuOpen(false)}
          >
            <IoSettingsOutline className="text-2xl" />
            <span>Settings</span>
          </button>
        </div>
      )}
     <Outlet />
    </div>
  );
}

export default Navbar;
