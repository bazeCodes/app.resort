import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Upload, X, Plus, Trash2 } from "lucide-react";
import { toast, Toaster } from "sonner";

export default function AddResort() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    PropertyName: "",

    guests: 0,
    bedrooms: 0,
    beds: 0,
    bathrooms: 0,

    propertyType: "",

    address: "",
    landmark: "",
    locality: "",
    city: "",
    state: "",
    pincode: "",
    country: "",

    photos: [],

    basePrice: "",
    weekendPrice: "",
  });

  const submitProperty = async () => {
    const fd = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key !== "photos") {
        fd.append(key, formData[key]);
      }
    });

    formData.photos.forEach((p) => {
      fd.append("photos", p.file);
    });

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login again");
      return;
    }

    const res = await fetch("http://localhost:4000/api/property/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, 
      },
      body: fd,
    });

    const data = await res.json();
    console.log(data);
  };

  const totalSteps = 6;
  const progress = Math.round((currentStep / totalSteps) * 100);

  useEffect(() => {
    return () => {
      formData.photos.forEach((p) => {
        if (p && p.previewUrl) URL.revokeObjectURL(p.previewUrl);
      });
    };
  }, []);

  const handleNext = async () => {
    if (!stepReady) return;

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      navigate("/Host/ConfirmProperty", {
        state: formData,
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
    else navigate("/Host/MyResort");
  };

  let stepReady = false;

  if (currentStep === 1) {
    stepReady = !!formData.PropertyName?.trim();
  }

  if (currentStep === 2) {
    stepReady =
      formData.guests > 0 &&
      formData.bedrooms > 0 &&
      formData.beds > 0 &&
      formData.bathrooms > 0;
  }

  if (currentStep === 3) {
    stepReady = !!formData.propertyType;
  }

  const propertyTypes = [
    { id: "villa", label: "Villa", icon: "🏰" },
    { id: "Tent", label: "Tent", icon: "⛺" },
    { id: "Homestay", label: "Home Stay", icon: "🏠" },
    { id: "Bamboo-hut", label: "Bamboo Hut", icon: "🛖" },
    { id: "Apartment", label: "Apartment", icon: "🏢" },
    { id: "Cottage", label: "Cottage", icon: "🏡" },
    { id: "Resort", label: "Resort", icon: "🏝️" },
    { id: "Hotel", label: "Hotel", icon: "🏨" },
  ];

  if (currentStep === 4) {
    stepReady =
      !!formData.address?.trim() &&
      !!formData.city?.trim() &&
      !!formData.country?.trim() &&
      !!formData.landmark?.trim() &&
      !!formData.state?.trim() &&
      !!formData.pincode?.trim();
  }

  if (currentStep === 5) {
    stepReady = formData.photos.length >= 5 && formData.photos.length <= 10;
  }

  if (currentStep === 6) {
    stepReady = !!formData.basePrice?.trim() && !!formData.weekendPrice?.trim();
  }

  const MAX_PHOTOS = 10;

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setFormData((prev) => {
      const remainingSlots = MAX_PHOTOS - prev.photos.length;

      if (remainingSlots <= 0) {
        toast.error("Maximum 10 photos allowed");
        return prev;
      }

      const filesToAdd = files.slice(0, remainingSlots);

      const mapped = filesToAdd.map((f) => ({
        file: f,
        previewUrl: URL.createObjectURL(f),
        name: f.name,
      }));

      return {
        ...prev,
        photos: [...prev.photos, ...mapped],
      };
    });

    e.target.value = "";
  };

  const removePhoto = (index) => {
    setFormData((prev) => {
      const newPhotos = prev.photos.slice();
      const removed = newPhotos.splice(index, 1)[0];
      if (removed && removed.previewUrl)
        URL.revokeObjectURL(removed.previewUrl);
      return { ...prev, photos: newPhotos };
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-gray-900">
                What's the name of your Property?
              </h2>
              <p className="text-gray-500">This will be shown to guests</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="PropertyName" className="font-medium">
                Property Name
              </label>
              <input
                id="PropertyName"
                placeholder=" Sunset Paradise Resort"
                value={formData.PropertyName}
                onChange={(e) =>
                  setFormData({ ...formData, PropertyName: e.target.value })
                }
                className="text-lg border p-3 rounded w-full"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-gray-900">
                Share some basics about your place
              </h2>
              <p className="text-gray-500">
                You'll add more details later, such as bed types.
              </p>
            </div>

            <div className="space-y-6 max-w-xl mx-auto">
              {[
                { key: "guests", label: "Guests" },
                { key: "bedrooms", label: "Bedrooms" },
                { key: "beds", label: "Beds" },
                { key: "bathrooms", label: "Bathrooms" },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between py-4 border-t"
                >
                  <span className="text-lg text-gray-700">{item.label}</span>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          [item.key]: Math.max((prev[item.key] || 0) - 1, 0),
                        }))
                      }
                      className="h-10 w-10 flex items-center justify-center rounded-full border text-gray-700 hover:bg-gray-50"
                    >
                      –
                    </button>

                    <span className="text-xl font-medium w-8 text-center">
                      {formData[item.key] || 0}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          [item.key]: (prev[item.key] || 0) + 1,
                        }))
                      }
                      className="h-10 w-10 flex items-center justify-center rounded-full border text-gray-700 hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">
                What type of property is this?
              </h2>
              <p className="text-gray-500">
                Choose the category that best fits
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 items-center">
              {propertyTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, propertyType: type.id }))
                  }
                  className={`p-6 rounded-lg border-2 text-left transition ${
                    formData.propertyType === type.id
                      ? "border-[#10b5cb] bg-[#e6fbfc]"
                      : "border-gray-300"
                  }`}
                >
                  <div className="text-4xl mb-2">{type.icon}</div>
                  <div className="font-medium text-gray-900">{type.label}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-10">
            {/* Header */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-gray-900">
                Confirm your address
              </h2>
              <p className="text-gray-500">
                Your address is only shared with guests after they've made a
                reservation.
              </p>
            </div>

            {/* Country / Region */}
            <div className="space-y-2 max-w-xl mx-auto">
              <label className="font-medium text-gray-700">
                Country/Region
              </label>

              <select
                className="w-full border p-3 rounded-lg text-gray-900"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
              >
                <option value="">Select Country</option>
                <option value="India - IN">India - IN</option>
                <option value="USA - US">USA - US</option>
                <option value="UK - GB">United Kingdom - GB</option>
                <option value="Bali - ID">Bali - ID</option>
              </select>
            </div>

            {/* Address Fields */}
            <div className="space-y-0 max-w-xl mx-auto border rounded-xl overflow-hidden">
              {/* Street address */}
              <input
                type="text"
                placeholder="Street address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full border-b p-4 focus:outline-none"
              />

              {/* Landmark */}
              <input
                type="text"
                placeholder="Nearby landmark (if applicable)"
                value={formData.landmark || ""}
                onChange={(e) =>
                  setFormData({ ...formData, landmark: e.target.value })
                }
                className="w-full border-b p-4 focus:outline-none"
              />

              {/* District / Locality */}
              <input
                type="text"
                placeholder="District/locality (if applicable)"
                value={formData.locality || ""}
                onChange={(e) =>
                  setFormData({ ...formData, locality: e.target.value })
                }
                className="w-full border-b p-4 focus:outline-none"
              />

              {/* City */}
              <input
                type="text"
                placeholder="City/town"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full border-b p-4 focus:outline-none"
              />

              {/* State */}
              <input
                type="text"
                placeholder="State/union territory"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                className="w-full border-b p-4 focus:outline-none"
              />

              {/* Pincode */}
              <input
                type="text"
                placeholder="PIN code"
                value={formData.pincode}
                maxLength={6} 
                onChange={(e) => {
                  const value = e.target.value;

                  if (/^\d*$/.test(value)) {
                    setFormData({ ...formData, pincode: value });
                  }
                }}
                className="w-full p-4 focus:outline-none"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">
                Add photos of your property
              </h2>
              <p className="text-gray-500">
                Upload at least <b>5 photos</b>. You can add up to{" "}
                <b>10 photos</b>.
              </p>
            </div>

            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <input
                type="file"
                id="photo-upload"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <label
                htmlFor="photo-upload"
                className="cursor-pointer inline-block"
              >
                <Upload className="mx-auto h-12 w-12 mb-4 text-gray-500" />
                <p className="text-gray-600">
                  Click to upload or drag and drop
                  <br />
                  PNG, JPG, WEBP up to 10MB
                </p>
              </label>
            </div>

            {formData.photos.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {formData.photos.map((p, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={p.previewUrl}
                      alt={p.name || `photo-${idx}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(idx)}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-gray-900">
                Set your pricing
              </h2>
              <p className="text-gray-500">
                Define your base rate and any weekend price
              </p>
            </div>

            <div className="space-y-4 max-w-xl mx-auto">
              <div>
                <label htmlFor="basePrice" className="font-medium">
                  Base Price/Night (₹) *
                </label>
                <input
                  id="basePrice"
                  type="number"
                  placeholder=" 2500"
                  value={formData.basePrice}
                  onChange={(e) =>
                    setFormData({ ...formData, basePrice: e.target.value })
                  }
                  className="w-full border rounded-lg p-3"
                />
              </div>
              {/* Weekend Price (Single Field) */}
              <div>
                <label className="font-medium">Weekend Price</label>
                <input
                  type="number"
                  placeholder="3500"
                  value={formData.weekendPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, weekendPrice: e.target.value })
                  }
                  className="w-full border rounded-lg p-3"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toaster for toast messages (you can remove if you prefer global Toaster in App) */}
      <Toaster position="top-center" />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-[#10b5cb] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-8 pt-12 pb-32">
        {/* Step Indicators */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    index + 1 === currentStep
                      ? "bg-[#10b5cb] text-white"
                      : index + 1 < currentStep
                      ? "bg-[#f0e6d5c3] text-black"
                      : "bg-gray-300"
                  }`}
                >
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-md rounded-lg p-8">
          {renderStepContent()}
        </div>

        {/* Navigation (Fixed Bottom Bar) */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
          <div className="max-w-4xl mx-auto flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 rounded-md border flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!stepReady}
              className={`px-6 py-3 rounded-md flex items-center gap-2 transition 
    ${
      stepReady
        ? "bg-[#10b5cb] text-white hover:bg-[#0e9ab1]"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }
  `}
            >
              {currentStep === totalSteps ? "Submit" : "Next"}
              {currentStep < totalSteps && <ArrowRight className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
