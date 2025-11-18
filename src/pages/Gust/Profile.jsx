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
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      navigate("/login");
      return;
    }

    const userObj = JSON.parse(savedUser);
    fetchUserData(userObj.email);
  }, [navigate]);

  // 🟩 Fetch user data from backend
 const fetchUserData = async (email) => {
  try {
    const token = localStorage.getItem("token"); // 🪪 Get token
    const res = await fetch(`http://localhost:4000/api/profile/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`, // 🪪 Send JWT
      },
    });

    const data = await res.json();
    if (data.success) {
      setUser(data.user);
      setUpdatedName(data.user.fullName);
    } else {
      setMessage(data.message);
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    setMessage("Error fetching profile data.");
  }
};


  // 🟨 Update user
  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/user/profile/${user.email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName: updatedName }),
        }
      );

      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        setMessage("Profile updated successfully!");
        setEditMode(false);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Update error:", error);
      setMessage("Failed to update profile.");
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
                {user.fullName}
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

            <button
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:opacity-90"
            >
              Logout
            </button>
          </div>

          {message && (
            <p className="text-center mt-4 text-gray-700 text-sm font-medium">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
