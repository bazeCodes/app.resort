import React from "react";
import HostSidebar from "../../components/HostSidebar";
import Navbar from "../../components/Navbar";

const AddResort = () => {
  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen bg-background">
        <HostSidebar />
        <main className="flex-1 p-4 sm:p-6 md:p-20">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold">Add New Resort</h1>
              <p className="text-gray-500 text-sm md:text-base">
                Fill in the details of your property
              </p>
            </div>

            {/* Property Details Form */}
            <div className="bg-white border rounded-xl shadow-sm p-5">
              <h2 className="text-lg md:text-xl font-semibold mb-4">
                Property Details
              </h2>

              <form className="space-y-4">
                {/* Property Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Title
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    placeholder="Describe your property..."
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                    rows="3"
                  ></textarea>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Place"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Price and Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price per Night ($)
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Guests
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                {/* Bedrooms and Bathrooms */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amenities (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="WiFi, Pool, Beach Access, Spa"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                {/* Image */}
                <div>
                  <label className="block text-gray-700 mb-1">
                    Product Image
                  </label>
                  <input
                    type="file"
                    name="imageFile"
                    onChange=""
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                  <button
                    type="submit"
                    className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-4 py-2 rounded-md w-full sm:w-auto"
                  >
                    Add Resort
                  </button>
                  <button
                    type="button"
                    className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium px-4 py-2 rounded-md w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddResort;
