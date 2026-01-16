import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:4000/api/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setLists(data);
    };

    fetchWishlist();
  }, []);
  
  const removeFromWishlist = async (propertyId, e) => {
    e.stopPropagation();

    const token = localStorage.getItem("token");

    await fetch(`http://localhost:4000/api/wishlist/toggle/${propertyId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setLists((prev) => prev.filter((item) => item.property._id !== propertyId));
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-25">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <button onClick={() => navigate(-1)}>←</button>
        <h1 className="text-lg font-semibold">Wishlist</h1>
        <span className="rounded-full border p-2 hover:bg-gray-100">✎</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {lists.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/ResortDetails/${item.property._id}`)}
            className=" cursor-pointer rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-2"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-2xl">
              <img
                src={`http://localhost:4000/uploads/properties/${item.property.photos[0]}`}
                className="h-full w-full object-cover"
                alt=""
              />
            </div>

            <div className="px-2 pt-2 pb-3 relative">
              <h3 className="text-sm font-medium leading-snug">
                {item.property.PropertyName}
              </h3>
              <p className="text-xs text-gray-500">{item.property.city}</p>
              <p className="text-xs text-gray-500">Saved</p>
              <button
                onClick={(e) => removeFromWishlist(item.property._id, e)}
                className="absolute right-2 top-2 z-10   p-1.5   "
                title="Remove from wishlist"
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
