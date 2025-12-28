import React, { useState, useEffect } from "react";
import { Star, Heart } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function ResortDetails({ place }) {
  // Ensure scroll starts at top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const demoPlace = {
    title: "Modern Downtown Loft",
    location: "New York, USA",
    price: "$120",
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    ],
  };

  const currentPlace = place || demoPlace;

  const [liked, setLiked] = useState(false);

  // Calendar
  const [selectedRange, setSelectedRange] = useState({ from: null, to: null });

  const pricePerNight = 8.999; // Example price (IND)
  const nights =
    selectedRange.from && selectedRange.to
      ? (selectedRange.to - selectedRange.from) / (1000 * 60 * 60 * 24)
      : 0;
  const totalCost = nights * pricePerNight;

  const formatDate = (date) =>
    date
      ? date.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "Select date";

  // Back button
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-white/80 p-2 rounded-full shadow hover:bg-white transition"
      >
        <FaArrowLeft className="text-gray-700" size={18} />
      </button>
      <div className="max-w-6xl mx-auto bg-gray-200 rounded-2xl shadow-md overflow-hidden mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Half: Images */}
          <div className="grid grid-rows-2 gap-2 h-[400px] md:h-[600px] relative">
            <div className="row-span-1">
              <img
                src={currentPlace.images[0]}
                alt={currentPlace.title}
                className="w-full h-full object-cover rounded-t-2xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <img
                src={currentPlace.images[1]}
                alt={`${currentPlace.title} view 2`}
                className="w-full h-full object-cover rounded-bl-2xl"
              />
              <img
                src={currentPlace.images[2]}
                alt={`${currentPlace.title} view 3`}
                className="w-full h-full object-cover rounded-br-2xl"
              />
            </div>
            <button
              onClick={() => setLiked(!liked)}
              className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow hover:bg-white transition"
            >
              <Heart
                size={22}
                className={liked ? "fill-red-500 text-red-500" : "text-gray-600"}
              />
            </button>
            <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1.5 rounded-lg flex items-center space-x-2 shadow">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-gray-800">
                {currentPlace.rating} / 5
              </span>
            </div>
          </div>

          {/* Right Half: Calendar and Details */}
          <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10 px-4">
            <div className="bg-white rounded-2xl shadow-md p-4">
              <DayPicker
                mode="range"
                selected={selectedRange}
                onSelect={setSelectedRange}
                numberOfMonths={1}
                pagedNavigation
                fixedWeeks
                showOutsideDays
                fromYear={2024}
                toYear={2030}
                styles={{
                  caption: { textAlign: "center", fontWeight: 600 },
                  day_selected: { backgroundColor: "#10b5cb", color: "white" },
                }}
              />
            </div>

            <div className="bg-white rounded-2xl shadow-md p-4 mt-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-3">Your Selection</h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Check-in:</span>
                  <span>{formatDate(selectedRange.from)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Check-out:</span>
                  <span>{formatDate(selectedRange.to)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total nights:</span>
                  <span>{nights}</span>
                </div>
                <div className="flex justify-between">
                  <span>Price per night:</span>
                  <span>IND {pricePerNight.toLocaleString("id-ID")}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 border-t pt-2 font-semibold">
                <span>Total cost:</span>
                <span className="text-[#10b5cb]">
                  {totalCost > 0
                    ? `IND ${totalCost.toLocaleString("id-ID")}`
                    : ""}
                </span>
              </div>
            </div>

            <button className="mt-6 w-full max-w-md bg-[#10b5cb] hover:bg-[#27c1d5] text-white py-3 rounded-md font-semibold transition">
              Book Now on WhatsApp
            </button>

            <div className="bg-white rounded-2xl shadow-md p-4 mt-6 w-full max-w-md text-sm text-gray-700">
              <p className="font-medium mb-2">Legend:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-[#10b5cb] rounded"></span>
                  <span>Selected dates</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-gray-300 rounded"></span>
                  <span>Unavailable</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 border border-gray-400 rounded"></span>
                  <span>Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </div>
  );
}

export default ResortDetails;
