import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Home, Trees, Gem, Wrench } from "lucide-react";

import Footer from "../../components/Footer";

const services = [
  { icon: <Home size={22} />, title: "Villa Development" },
  { icon: <Trees size={22} />, title: "Land Sourcing & Sales" },
  { icon: <Gem size={22} />, title: "Property Investment" },
  { icon: <Wrench size={22} />, title: "Full Service Villa Management" },
];

function Destination({ place }) {
  const [liked, setLiked] = useState({});
  const navigate = useNavigate();
  
  return (
    <div className=" relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="relative">
        <img
          src={`http://localhost:4000/uploads/properties/${place.photos[0]}`}
          alt={place.PropertyName}
          className="w-full h-64 object-cover"
        />

        {/* Rating bottom-left */}
        <div className="absolute bottom-3 left-3 bg-black/70 text-white text-sm px-2 py-1 rounded-full flex items-center gap-1">
          <FaStar className="text-yellow-400" size={14} />
          {place.rating}
        </div>

        {/* Like button top-right */}
        <button
          onClick={() =>
            setLiked((prev) => ({ ...prev, [place._id]: !prev[place._id] }))
          }
          className="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow hover:bg-white transition"
        >
          <Heart
            size={20}
            className={
              liked[place._id] ? "fill-red-500 text-red-500" : "text-gray-600"
            }
          />
        </button>
      </div>

      {/* Text content */}
      <div className="p-4 text-left">
        <p className="text-sm text-[#10b5cb] font-medium mb-1">{place.propertyType}</p>
        <h3 className="text-lg font-semibold">{place.PropertyName}</h3>
        <p className="text-gray-500 text-sm">{place.city}</p>
        <p className="text-[#10b5cb] font-bold mt-2">${place.basePrice}/night</p>
        <button
          onClick={() => navigate(`/resort/${place._id}`)}
          className="mt-4 w-full bg-[#10b5cb] text-white py-2 rounded"
        >
          See Availability
        </button>
      </div>
    </div>
  );
}


function Index() {

  const [destinations, setDestinations] = useState([]);

 useEffect(() => {
  fetch("http://localhost:4000/api/property/resorts")
    .then((res) => res.json())
    .then((data) => {
      setDestinations(data.properties || []);
    })
    .catch((err) => console.error("Error fetching resorts:", err));
}, []);

  return (
    <div>
      <section
        id="/"
        className=" relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm"
          style={{ backgroundImage: "url('/Imge/Resort-img-1.webp')" }}
        ></div>

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <h1
            className="text-5xl font-bold mb-4"
            style={{ color: "hsl(187, 85%, 43%)" }}
          >
            Find Your Perfect Stay
          </h1>
          <p className="text-gray-200 text-lg mb-10">
            Discover unique accommodations and experiences around the world
          </p>
        </div>
      </section>

      {/* Destination Section */}
      <section
        className="max-w mx-auto m px-30 py-12 bg-[#f0e6d5c3]"
        style={{
          background: "linear-gradient(150deg, #f0e6d5c3 0%, #faf7f2 100%)",
        }}
      >
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Popular Destinations
          </h2>
          <p className="text-gray-500 mt-1">
            Explore our most loved properties
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((place) => (
            <Destination key={place._id} place={place} />
          ))}
        </div>
        <div className="w-full flex justify-center mt-10">
          <button
            style={{ backgroundColor: "#10b5cb" }}
            className="px-8 py-3 text-white font-semibold rounded-lg shadow hover:opacity-90 transition"
          >
            View More Properties
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="About" className="bg-[#faf7f2] py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              About <br />
              <span style={{ color: "#10b5cb" }}>Stay Ease Group</span>
            </h2>

            <p className="text-gray-700 mt-6 leading-relaxed">
              Stay Ease Group is a real estate brokerage and development company
              based in location, founded in 2025 with a mission to create
              sustainable, nature-connected properties that reflect the spirit
              of the island. We specialize in villa development, land sourcing
              and sales, property investment, and full-service villa management.
            </p>

            <p className="text-gray-700 mt-4 leading-relaxed">
              Every project we take on is designed to blend with its
              surroundings, using eco-friendly materials like bamboo and
              reclaimed wood to build with the land, not over it. Our goal is to
              deliver lasting value by combining smart investment strategies
              with environmentally conscious design.
            </p>

            <button
              style={{ backgroundColor: "#10b5cb" }}
              className="mt-8 px-7 py-3 text-white font-medium rounded-lg shadow hover:opacity-90 transition"
            >
              Learn Our Story
            </button>
          </div>

          {/* RIGHT SIDE – SERVICES LIST */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h3 className="text-2xl font-semibold text-center mb-8 text-gray-900">
              Our Services
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((item, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-3 bg-[#e8e2d6]"
                >
                  <span className="text-[#10b5cb]">{item.icon}</span>
                  <span className="font-medium text-gray-800">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <>
        <Footer />
      </>
    </div>
  );
}

export default Index;
