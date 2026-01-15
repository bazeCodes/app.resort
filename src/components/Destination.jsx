import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Destination({ place }) {
  const [liked, setLiked] = useState({});
  const navigate = useNavigate();

  const toggleWishlist = async (propertyId) => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:4000/api/wishlist/toggle/${propertyId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    setLiked((prev) => ({
      ...prev,
      [propertyId]: data.liked,
    }));
  };

  return (
    <div className="relative bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
      
      {/* Image section */}
      <div className="relative">
        <img
          src={`http://localhost:4000/uploads/properties/${place.photos[0]}`}
          alt={place.PropertyName}
          className="w-full h-64 object-cover rounded-3xl"
        />

        {/* Rating */}
        <div className="absolute bottom-3 left-3 bg-black/70 text-white text-sm px-2 py-1 rounded-full flex items-center gap-1">
          <FaStar className="text-yellow-400" size={14} />
          {place.rating}
        </div>

        {/* Like button */}
        <button
          onClick={() => toggleWishlist(place._id)}
          className="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow cursor-pointer"
        >
          <Heart
            size={20}
            className={
              liked[place._id]
                ? "fill-red-500 text-red-500"
                : "text-gray-600"
            }
          />
        </button>
      </div>  

      {/* Text content */}
      <div className="p-4 text-left">
        <p className="text-sm text-[#10b5cb] font-medium mb-1">
          {place.propertyType}
        </p>

        <h3 className="text-lg font-semibold">
          {place.PropertyName}
        </h3>

        <p className="text-gray-500 text-sm">
          {place.city}
        </p>

        <p className="text-[#10b5cb] font-bold mt-2">
          ₹{place.basePrice}/night
        </p>

        <button
          onClick={() => navigate(`/ResortDetails/${place._id}`)}
          className="mt-4 w-full bg-[#10b5cb] text-white py-2 rounded-xl cursor-pointer transition-all duration-300 hover:-translate-y-2"
        >
          See Availability
        </button>
      </div>
    </div>
  );
}

export default Destination;
