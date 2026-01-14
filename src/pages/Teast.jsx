import React from "react";

const wishlistData = [
  {
    id: 1,
    title: "The florence experience",
    saved: 6,
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c",
  },
  {
    id: 2,
    title: "Rooms in france",
    saved: 2,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  },
  {
    id: 3,
    title: "United states December 2023",
    saved: 4,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },
  {
    id: 4,
    title: "Cabins Wishlist",
    saved: 1,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
  },
  {
    id: 5,
    title: "Rooms Wishlist",
    saved: 3,
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c",
  },
];

function  teast() {
  return (
    <div className="min-h-screen bg-white px-4 py-6 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Wishlist</h1>
        <button className="rounded-full border p-2 hover:bg-gray-100">
          ✎
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {wishlistData.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-white shadow-sm transition hover:shadow-md"
          >
            {/* Image */}
            <div className="aspect-[4/3] overflow-hidden rounded-2xl">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="px-2 pt-2 pb-3">
              <h2 className="text-sm font-medium leading-snug">
                {item.title}
              </h2>
              <p className="text-xs text-gray-500">
                {item.saved} Saved
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default  teast;
