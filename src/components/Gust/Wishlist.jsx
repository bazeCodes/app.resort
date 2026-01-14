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
            className="cursor-pointer rounded-2xl bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-2xl">
              <img
                src={`http://localhost:4000/uploads/properties/${item.property.photos[0]}`}
                className="h-full w-full object-cover"
                alt=""
                
              />
            </div>

            <div className="px-2 pt-2 pb-3">
              <h3 className="text-sm font-medium leading-snug">
                {item.property.PropertyName}
              </h3>
              <p className="text-xs text-gray-500">{item.property.city}</p>
              <p className="text-xs text-gray-500">Saved</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
