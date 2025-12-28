import { useLocation, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";


export default function ConfirmProperty() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="p-6 text-red-600">
        No property data found. Please start again.
      </div>
    );
  }

  const submitProperty = async () => {
  try {
    const fd = new FormData();

    Object.keys(state).forEach((key) => {
      if (key !== "photos") {
        fd.append(key, state[key]);
      }
    });

    state.photos.forEach((p) => {
      fd.append("photos", p.file);
    });

    const res = await fetch(
      "http://localhost:4000/api/property/create",
      {
        method: "POST",
        body: fd,
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Create failed");
    }

    // ✅ SAME LOGIC YOU ASKED FOR
    toast.success("Property listing created successfully!");
    console.log("Form data:", state);

    setTimeout(() => {
      navigate("/Host/MyResort");
    }, 800);

  } catch (err) {
    console.error(err);
    toast.error("Failed to create property");
  }
};

  return (
    <>
    <Toaster position="top-center" />
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">

        <h1 className="text-2xl font-bold">
          Confirm your property details
        </h1>

        {/* BASIC INFO */}
        <div className="space-y-2">
          <p><b>Name:</b> {state.PropertyName}</p>
          <p><b>Type:</b> {state.propertyType}</p>
          <p><b>Guests:</b> {state.guests}</p>
          <p><b>Bedrooms:</b> {state.bedrooms}</p>
          <p><b>Beds:</b> {state.beds}</p>
          <p><b>Bathrooms:</b> {state.bathrooms}</p>
        </div>

        {/* ADDRESS */}
        <div className="space-y-1">
          <p><b>Address:</b> {state.flat}, {state.address}</p>
          <p>{state.landmark}, {state.locality}</p>
          <p>{state.city}, {state.state} – {state.pincode}</p>
          <p>{state.country}</p>
        </div>

        {/* PRICING */}
        <div>
          <p><b>Base Price:</b> ₹{state.basePrice}</p>
          <p><b>Weekend Price:</b> ₹{state.weekendPrice}</p>
        </div>

        {/* PHOTOS */}
        <div className="grid grid-cols-3 gap-3">
          {state.photos.map((p, i) => (
            <img
              key={i}
              src={p.previewUrl}
              className="h-28 w-full object-cover rounded"
              alt=""
            />
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between pt-4">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 border rounded"
          >
            Edit
          </button>

          <button
            onClick={submitProperty}
            className="px-6 py-2 bg-[#10b5cb] text-white rounded"
          >
            Confirm & Publish
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
