import React, { useState } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserFriends,
  FaStar,
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Home, Trees, Gem, Wrench } from "lucide-react";
import instagramLogo from "../../assets/instagram-logo.png";
import linkedinLogo from "../../assets/linkedin-logo.png";
import gmailLogo from "../../assets/gmail-logo.svg";
import whatsappLogo from "../../assets/whatsapp-logo.svg";

const services = [
  { icon: <Home size={22} />, title: "Villa Development" },
  { icon: <Trees size={22} />, title: "Land Sourcing & Sales" },
  { icon: <Gem size={22} />, title: "Property Investment" },
  { icon: <Wrench size={22} />, title: "Full Service Villa Management" },
];

const destinations = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    type: "Apartment",
    title: "Modern Downtown Loft",
    location: "New York, USA",
    price: "$120",
    rating: 4.8,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    type: "House",
    title: "Cozy Beach House",
    location: "Malibu, USA",
    price: "$250",
    rating: 4.9,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800",
    type: "Villa",
    title: "Luxury Villa with Pool",
    location: "Bali, Indonesia",
    price: "$180",
    rating: 5.0,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800",
    type: "Villa",
    title: "Luxury Villa with Pool",
    location: "Bali, Indonesia",
    price: "$180",
    rating: 5.0,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    type: "Cabin",
    title: "Mountain Cabin Retreat",
    location: "Aspen, USA",
    price: "$200",
    rating: 4.7,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    type: "House",
    title: "Cozy Beach House",
    location: "Malibu, USA",
    price: "$250",
    rating: 4.9,
  },
];

function Destination({ place }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  // When user clicks the button, navigate to ResortDetails
  const handleSeeAvailability = () => {
    navigate(`/resortdetails`); // dynamic route for each place
  };
  return (
    <div className=" relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="relative">
        <img
          src={place.image}
          alt={place.title}
          className="w-full h-64 object-cover"
        />

        {/* Rating bottom-left */}
        <div className="absolute bottom-3 left-3 bg-black/70 text-white text-sm px-2 py-1 rounded-full flex items-center gap-1">
          <FaStar className="text-yellow-400" size={14} />
          {place.rating}
        </div>

        {/* Like button top-right */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow hover:bg-white transition"
        >
          <Heart
            size={20}
            className={liked ? "fill-red-500 text-red-500" : "text-gray-600"}
          />
        </button>
      </div>

      {/* Text content */}
      <div className="p-4 text-left">
        <p className="text-sm text-[#10b5cb] font-medium mb-1">{place.type}</p>
        <h3 className="text-lg font-semibold">{place.title}</h3>
        <p className="text-gray-500 text-sm">{place.location}</p>
        <p className="text-[#10b5cb] font-bold mt-2">{place.price}/night</p>
        <button
          onClick={handleSeeAvailability}
          className="mt-4 w-full bg-[#10b5cb] text-white py-2 rounded-md 
                     font-medium hover:bg-[hsl(187,85%,38%)] transition"
        >
          See Availability
        </button>
      </div>
    </div>
  );
}

function Index() {
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

          {/* Search Card */}
          <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-4">
              <div className="text-left">
                <label className="flex items-center text-gray-600 font-medium mb-1">
                  <FaMapMarkerAlt className="mr-2" /> Location
                </label>
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#10b5cb]"
                />
              </div>

              <div className="text-left">
                <label className="flex items-center text-gray-600 font-medium mb-1">
                  <FaCalendarAlt className="mr-2" /> Check In
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#10b5cb]"
                />
              </div>

              <div className="text-left">
                <label className="flex items-center text-gray-600 font-medium mb-1">
                  <FaCalendarAlt className="mr-2" /> Check Out
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#10b5cb]"
                />
              </div>

              <div className="text-left">
                <label className="flex items-center text-gray-600 font-medium mb-1">
                  <FaUserFriends className="mr-2" /> Guests
                </label>
                <input
                  type="number"
                  placeholder="0"
                  min="1"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#10b5cb]"
                />
              </div>
            </div>

            <button className="w-full bg-[#10b5cb] text-white py-3 rounded-md font-medium flex items-center justify-center hover:bg-[hsl(187,85%,38%)] transition">
              <FaSearch className="mr-2" /> Search
            </button>
          </div>
        </div>
      </section>

      {/* Destination Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
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
            <Destination key={place.id} place={place} />
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

      <section
        className=" py-20 px-6 bg-[#f0e6d5c3] "
        style={{
          background: "linear-gradient(180deg, #f0e6d5c3 0%, #faf7f2 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Ready to Find Your Paradise?
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Get in touch with our team to discover your perfect property in you
            location.
          </p>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-16">
            {/* WhatsApp */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-2xl bg-[#10b5cb] shadow-xl flex items-center justify-center">
                <img
                  src={whatsappLogo}
                  alt="WhatsApp"
                  className="w-12 h-12 mx-auto"
                />
              </div>
              <p className="font-semibold mt-4">WhatsApp Booking</p>
              <p className="text-gray-600 text-sm">+91 123 456 7890</p>
            </div>

            {/* Gmail */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-2xl bg-[#10b5cb] shadow-xl flex items-center justify-center">
                <img
                  src={gmailLogo}
                  alt="Gmail"
                  className="w-12 h-12 mx-auto"
                />
              </div>
              <p className="font-semibold mt-4">Email</p>
              <p className="text-gray-600 text-sm">StayEasegroup@gmail.com</p>
            </div>

            {/* Instagram */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-2xl bg-[#10b5cb] shadow-xl flex items-center justify-center">
                <img
                  src={instagramLogo}
                  alt="Instagram"
                  className="w-12 h-12 mx-auto"
                />
              </div>
              <p className="font-semibold mt-4">Follow Us</p>
              <p className="text-gray-600 text-sm">@StayEase</p>
            </div>

            {/* LinkedIn */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-2xl bg-[#10b5cb] shadow-xl flex items-center justify-center">
                <img
                  src={linkedinLogo}
                  alt="LinkedIn"
                  className="w-12 h-12 mx-auto"
                />
              </div>
              <p className="font-semibold mt-4">LinkedIn</p>
              <p className="text-gray-600 text-sm">Stay Ease Group</p>
            </div>
          </div>
        </div>
      </section>

      <footer
        className="text-white py-16 px-6"
        style={{
          background: "linear-gradient(180deg, #10b5cb 0%, #1b6f7a 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo + Description */}
          <div>
            <h2 className="text-3xl font-bold">
              Stay Ease
              <br />
              GROUP
            </h2>
            <p className="text-gray-200 mt-4 leading-relaxed">
              Your trusted partner for luxury properties in your destinations.
              Discover paradise with our expert guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-200">
              <li className="hover:text-white cursor-pointer">Properties</li>
              <li className="hover:text-white cursor-pointer">About</li>
              <li className="hover:text-white cursor-pointer">Services</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-200">
              <li>Villa Development</li>
              <li>Sourcing & Sales</li>
              <li>Property Investment</li>
              <li>Full Service Management</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-white text-3xl">
                <img src={linkedinLogo} alt="LinkedIn" className="w-8 h-8" />
              </a>
              <a href="#" className="text-white text-3xl">
                <img src={instagramLogo} alt="Instagram" className="w-8 h-8" />
              </a>
            </div>
          </div>
          {/* <div className="  items-center  justify-center border-t">
            <p className="text-gray-200 text-sm">
              © 2025 Stay Ease Group. All rights reserved.
            </p>
          </div> */}
        </div>
      </footer>
    </div>
  );
}

export default Index;
