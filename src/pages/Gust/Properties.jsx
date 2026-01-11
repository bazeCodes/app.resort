import React, { useEffect, useState } from "react";
import Destination from "../../components/Gust/Destination";
import { useNavigate } from "react-router-dom";

function Properties() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/property/resorts");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch properties");
        }

        // ⚠️ adjust depending on backend response shape
        setDestinations(data.properties || data);
      } catch (err) {
        console.error("Failed to load properties", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading properties...</div>;
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col">
      {/* ===== PAGE HEADER ===== */}
      <section className="px-4 sm:px-6 lg:px-16 py-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          All Properties
        </h1>
        <p className="text-gray-500 mt-2">
          Explore all available stays and destinations
        </p>

        {/* ACTION BUTTON */}
        <div className="mt-6">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-[#10b5cb] text-white rounded-lg font-semibold shadow hover:opacity-90 transition"
          >
            Back to Home
          </button>
        </div>
      </section>

      {/* PROPERTIES GRID */}
      <div className="px-4 sm:px-6 lg:px-16 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((place) => (
            <Destination key={place._id} place={place} />
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Resort Booking. All rights reserved.
      </footer>
    </div>
  );
}

export default Properties;
