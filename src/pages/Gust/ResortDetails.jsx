import { useEffect, useState } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function ResortDetails() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [liked, setLiked] = useState(false);
  const [place, setPlace] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();

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

  useEffect(() => {
    const fetchResort = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/property/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch property");
        }

        setPlace(data.property);
      } catch (err) {
        console.error("Failed to load resort", err);
      }
    };

    if (id) fetchResort();
  }, [id]);

  const [selectedRange, setSelectedRange] = useState({ from: null, to: null });
  const pricePerNight = place?.basePrice ?? 0;

  const nights =
    selectedRange?.from && selectedRange?.to
      ? Math.ceil(
          (selectedRange.to - selectedRange.from) / (1000 * 60 * 60 * 24)
        )
      : 0;

  const totalCost = nights * pricePerNight;

  const formatDate = (date) =>
    date
      ? date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "Select date";

  if (!place) {
    return <div className="p-6 text-center">Loading resort details...</div>;
  }

  const photos = place.photos;
  const totalPhotos = photos.length;

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPhotos - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === totalPhotos - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef5fb] to-white px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-4"
      >
        <ChevronLeft size={20} />
        <span className="text-sm font-medium">Back</span>
      </button>
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold mb-4">
          {place?.PropertyName}
        </h1>
      </div>
      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 lg:gap-10">
        {/* LEFT SECTION */}
        <div>
          {/* IMAGE CARD */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src={`http://localhost:4000/uploads/properties/${photos[currentIndex]}`}
              className="w-full h-[220px] sm:h-[300px] md:h-[380px] lg:h-[420px] object-contain transition-all duration-500"
              alt={`Property image ${currentIndex + 1}`}
            />

            {/* LEFT */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 cursor-pointer"
            >
              <ChevronLeft />
            </button>

            {/* RIGHT */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 cursor-pointer"
            >
              <ChevronRight />
            </button>

            {/* LIKE */}
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

            {/* IMAGE COUNTER */}
            <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
              {currentIndex + 1} / {totalPhotos}
            </div>
          </div>

          {/* DETAILS */}
          <div className="mt-6  ">
            <h2 className="text-lg sm:text-xl font-semibold">
              {place?.PropertyType} {place?.city}, {place?.country}
            </h2>
            <p className="text-gray-600 mt-1">
              {place?.guests}Guests · {place?.bedrooms}Bedrooms · {place?.beds}
              Beds · {place?.bathrooms}Bathrooms
            </p>

            {/* HOST */}
            {place?.hostId && (
              <div className="flex items-center gap-4 mt-6">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  className="w-12 h-12 rounded-full"
                  alt=""
                />
                {/* <img
                  src={
                    place.hostId.avatar ||
                    `https://ui-avatars.com/api/?name=${place.hostId.name}`
                  }
                  className="w-12 h-12 rounded-full object-cover"
                  alt={place.hostId.name}
                /> */}
                <div>
                  <p className="font-semibold">{place?.hostId.name}</p>
                  <p className="text-sm text-gray-500">
                    Joined {new Date(place?.hostId.createdAt).getFullYear()}
                  </p>
                </div>
              </div>
            )}

            {/* BIO */}
            <div className="mt-6 bg-white rounded-xl p-5 shadow">
              <p className="text-gray-700">
                (Bio: Experienced host, passionate about hospitality and
                travel.)
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="space-y-6">
          {/* SELECTION CARD */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Your Selection</h3>

            <div className="space-y-3 text-gray-700">
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
            </div>

            <hr className="my-4" />

            <div className="flex justify-between text-lg font-semibold">
              <span>Total cost:</span>
              <span>
                ₹{totalCost > 0 ? ` ${totalCost.toLocaleString("id-ID")}` : ""}
              </span>
            </div>
          </div>

          {/* WHATSAPP BUTTON */}
          <button className="w-full bg-[#4f87a3] hover:bg-[#3f738d] text-white  rounded-xl py-3 sm:py-4 text-base sm:text-lg font-semibold shadow cursor-pointer">
            Book Now on WhatsApp
          </button>

          {/* CALENDAR */}
          <div className="bg-white rounded-2xl shadow p-3 sm:p-4 md:p-6 w-full overflow-x-auto flex justify-center">
            <DayPicker
              mode="range"
              selected={selectedRange}
              onSelect={setSelectedRange}
              numberOfMonths={1}
              fromYear={2024}
              toYear={2030}
              showOutsideDays={false}
              pagedNavigation
              fixedWeeks={false}
              className="custom-calendar"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
