import React from "react";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import HostSidebar from "../../components/HostSidebar";
import Navbar from "../../components/HostNavbar";
import { useAuth } from "../../context/AuthContext";

const HostProfile = () => {

 
  return (
    <div>
      <Navbar/>
      <div className="flex min-h-screen bg-background">
        <HostSidebar />

        <main className="flex-1 p-4 sm:p-6 md:p-10">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold">Host Profile</h1>
              <p className="text-gray-500 text-sm md:text-base">
                Manage your account information
              </p>
            </div>

            {/* Profile Information */}
            <div className="bg-white border rounded-xl shadow-sm mb-6 p-5">
              <h2 className="text-lg md:text-xl font-semibold mb-4">
                Profile Information
              </h2>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gray-100 rounded-full">
                    <FaUser className="text-gray-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">Status</p>
                    <span className="text-sm bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium">
                      Verified Host
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-gray-700 font-medium">Member since</p>
                  <p className="font-semibold">10/13/2025</p>
                </div>
              </div>
            </div>

            {/* Edit Profile */}
            <div className="bg-white border rounded-xl shadow-sm p-5">
              <h2 className="text-lg md:text-xl font-semibold mb-4">
                Edit Profile
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Ruhais"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      value="sajadwork6@gmail.com"
                      disabled
                      className="w-full border border-gray-300 rounded-md px-10 py-2 bg-gray-50 text-gray-500 focus:outline-none"
                    />
                  </div>
                  <p className="text-gray-400 text-xs mt-1">
                    Email cannot be changed
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      defaultValue="+91 9745091254"
                      className="w-full border border-gray-300 rounded-md px-10 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    placeholder="Tell guests about yourself..."
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                    rows="3"
                  />
                </div>

                <button className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-4 py-2 rounded-md">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HostProfile;
