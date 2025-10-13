import React from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserFriends,
} from "react-icons/fa";

import Destination from "../../components/destination/Destination";

const destinations = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      type: "Apartment",
      title: "Modern Downtown Loft",
      location: "New York, USA",
      price: "$120",
      rating: 4.8,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      type: "House",
      title: "Cozy Beach House",
      location: "Malibu, USA",
      price: "$250",
      rating: 4.9,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800",
      type: "Villa",
      title: "Luxury Villa with Pool",
      location: "Bali, Indonesia",
      price: "$180",
      rating: 5.0,
    },
    {
      id: 4,
      image:
        "https://unsplash.com/photos/an-old-wooden-house-with-shutters-on-the-windows-g-CXX2Yz4O0",
      type: "Cabin",
      title: "Mountain Cabin Retreat",
      location: "Aspen, USA",
      price: "$200",
      rating: 4.7,
    },
  ];

function Index() {
  return (
    <div>
      <section className=" text-center py-20 px-4">
        {/* Title */}
        <h1 className="text-5xl font-bold text-pink-600 mb-4">
          Find Your Perfect Stay
        </h1>
        <p className="text-gray-500 text-lg mb-10">
          Discover unique accommodations and experiences around the world
        </p>

        {/* Search Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-4">
            {/* Location */}
            <div className="text-left">
              <label className="flex items-center text-gray-600 font-medium mb-1">
                <FaMapMarkerAlt className="mr-2" /> Location
              </label>
              <input
                type="text"
                placeholder="Where are you going?"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Check In */}
            <div className="text-left">
              <label className="flex items-center text-gray-600 font-medium mb-1">
                <FaCalendarAlt className="mr-2" /> Check In
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Check Out */}
            <div className="text-left">
              <label className="flex items-center text-gray-600 font-medium mb-1">
                <FaCalendarAlt className="mr-2" /> Check Out
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Guests */}
            <div className="text-left">
              <label className="flex items-center text-gray-600 font-medium mb-1">
                <FaUserFriends className="mr-2" /> Guests
              </label>
              <input
                type="number"
                placeholder="0"
                min="1"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          {/* Search Button */}
          <button className="w-full bg-pink-600 text-white py-3 rounded-md font-medium flex items-center justify-center hover:bg-pink-700 transition">
            <FaSearch className="mr-2" /> Search
          </button>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Popular Destinations
          </h2>
          <p className="text-gray-500 mt-1">
            Explore our most loved properties
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((place) => (
           <Destination place={place}/>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Index;
