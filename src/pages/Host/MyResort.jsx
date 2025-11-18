import React from "react";

import { MapPin, Users, Bed, Bath, Edit, Trash2 } from "lucide-react";
import HostSidebar from "../../components/HostSidebar";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

function AddResort() {
  return (
    <div>
      <Navbar/>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <HostSidebar />

        {/* Main Content */}
        <main className="flex-1 p-5 sm:p-8 md:p-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl sm:text-3xl font-bold">My Resorts</h1>
              <p className="text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl w-full ">
                Manage your properties and track their performance
              </p>
            </div>
            <Link
              to="/Host/AddResort"
              className="bg-[#10b5cb] text-white px-4 py-2 rounded-md hover:bg-[#10b5cb] text-sm sm:text-base"
            >
              + Add New Resort
            </Link>
          </div>

          {/* Resort Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
                    alt="Resort"
                    className="w-full h-45 object-cover"
                  />
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <span className="bg-[#10b5cb] text-white text-xs px-2 py-1 rounded-md">
                      Active
                    </span>
                    <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-md">
                      Pending
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h2 className="font-semibold text-lg sm:text-xl mb-1">
                    Palm Glade
                  </h2>
                  <p className="flex items-center text-gray-500 text-sm sm:text-base mb-3">
                    <MapPin className="h-4 w-4 mr-1" /> Bali
                  </p>

                  <div className="flex space-x-4 text-gray-600 text-sm sm:text-base mb-3">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" /> 16
                    </span>
                    <span className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" /> 8
                    </span>
                    <span className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" /> 4
                    </span>
                  </div>

                  <p className="text-[#10b5cb] font-semibold text-lg sm:text-xl mb-4">
                    $358{" "}
                    <span className="text-gray-500 text-sm sm:text-base">
                      / night
                    </span>
                  </p>

                  <div className="flex justify-between border-gray-300 border-t pt-4 gap-2">
                    <button className="border flex items-center justify-center p-2 border-gray-300 flex-1 rounded-md hover:bg-gray-100 text-sm sm:text-base">
                      <Edit className="h-4 w-4 mr-2" /> Edit
                    </button>
                    <button className="border flex items-center justify-center border-gray-300 flex-1 rounded-md hover:bg-gray-100 text-sm sm:text-base">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddResort;
