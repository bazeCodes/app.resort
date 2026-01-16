import React, { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import HostSidebar from "../../components/HostSidebar";
import Navbar from "../../components/HostNavbar";

function MyResort() {
  const [resorts, setResorts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyResorts = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "http://localhost:4000/api/property/my-resorts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to load resorts");

        const data = await res.json();
        setResorts(data.properties);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyResorts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this property?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:4000/api/property/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      setResorts((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen bg-gray-50">
        <HostSidebar />

        <main className="flex-1 p-5 sm:p-8 md:p-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl sm:text-3xl font-bold">My Resorts</h1>
              <p className="text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl">
                Manage your properties and track their performance
              </p>
            </div>

            <Link
              to="/Host/AddResort"
              className="bg-[#10b5cb] text-white px-4 py-2 rounded-md text-sm sm:text-base"
            >
              + Add New Resort
            </Link>
          </div>

          {/* STATES */}
          {loading && <p>Loading...</p>}

          {!loading && resorts.length === 0 && (
            <p className="text-gray-500">No resorts added yet.</p>
          )}

          {/* RESORT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resorts.map((resort) => (
              <div
                key={resort._id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={`http://localhost:4000/uploads/properties/${resort.photos[0]}`}
                    alt={resort.PropertyName}
                    className="w-full h-48 object-cover"
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
                  <h2 className="font-semibold text-lg">
                    {resort.PropertyName}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    {resort.city}, {resort.country}
                  </p>

                  <div className="flex space-x-4 text-gray-600 text-sm mb-3">
                    <span>👥 {resort.guests}</span>
                    <span>🛏 {resort.bedrooms}</span>
                    <span>🛁 {resort.bathrooms}</span>
                  </div>

                  <p className="capitalize">{resort.propertyType}</p>

                  <p className="text-[#10b5cb] font-semibold mt-2 mb-4">
                    ₹{resort.basePrice} / night
                  </p>

                  <div className="flex border-t pt-4 gap-2">
                    <Link
                      to={`/host/edit-resort/${resort._id}`}
                      className="border flex-1 flex items-center justify-center p-2 rounded-md hover:bg-gray-100"
                    >
                      <Edit className="h-4 w-4 mr-2" /> Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(resort._id)}
                      className="border flex-1 flex items-center justify-center p-2 rounded-md hover:bg-gray-100"
                    >
                      <Trash2 className="h-4 w-4 mr-2" /> Delete
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

export default MyResort;
