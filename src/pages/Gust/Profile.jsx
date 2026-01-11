import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [message, setMessage] = useState("");

  // 🟦 Load user on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      const res = await fetch("http://localhost:4000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        setUpdatedName(data.user.name);
      } else {
        navigate("/login");
      }
    };

    fetchProfile();
  }, []);

  // 🟨 Update user
  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:4000/api/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: updatedName }),
    });

    const data = await res.json();

    if (data.success) {
      setUser(data.user);
      setEditMode(false);
    }
  };

  // 🧠 Prevent rendering before user loads
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        

        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-[#10b5cb] mb-6">
            Profile
          </h2>

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              {editMode ? (
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#10b5cb] focus:outline-none"
                />
              ) : (
                <p className="p-3 border border-gray-200 rounded-md bg-gray-50">
                  {user.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <p className="p-3 border border-gray-200 rounded-md bg-gray-50">
                {user.email}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              {editMode ? (
                <>
                  <button
                    onClick={handleUpdate}
                    className="bg-[#10b5cb] text-white px-4 py-2 rounded-md hover:opacity-90"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="bg-gray-300 px-4 py-2 rounded-md hover:opacity-80"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-[#10b5cb] text-white px-4 py-2 rounded-md hover:opacity-90"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {message && (
              <p className="text-center mt-4 text-gray-700 text-sm font-medium">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
