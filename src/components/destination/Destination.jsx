import React from "react";
import { Star, MapPin } from "lucide-react";
function Destination({ place }) {
  return (
    <div
      key={place.id}
      className="bg-white rounded-2xl shadow-sm overflow-hidden border hover:shadow-md transition-all duration-300"
    >
      <img
        src={place.image}
        alt={place.title}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center text-sm text-gray-500 mb-1">
          <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs font-medium">
            {place.type}
          </span>
          <div className="flex items-center text-pink-500">
            <Star size={14} className="fill-pink-500 mr-1" />
            <span className="font-medium text-gray-700">{place.rating}</span>
          </div>
        </div>
        <h3 className="font-semibold text-gray-900 text-lg truncate">
          {place.title}
        </h3>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <MapPin size={14} className="mr-1" />
          {place.location}
        </div>
        <div className="flex items-baseline mt-3">
          <span className="text-pink-600 font-bold text-xl">{place.price}</span>
          <span className="text-gray-500 text-sm ml-1">/ night</span>
        </div>
      </div>
    </div>
  );
}

export default Destination;
