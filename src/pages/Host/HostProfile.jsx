import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import HostSidebar from "../../components/HostSidebar";
import Navbar from "../../components/HostNavbar";

const HostProfile = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "http://localhost:4000/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        setUser(data.user);
        setForm({
          name: data.user.name || "",
          phone: data.user.phone || "",
          bio: data.user.bio || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:4000/api/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      setUser(data.user);
      alert("Profile updated");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen bg-background">
        <HostSidebar />

        <main className="flex-1 p-4 sm:p-6 md:p-10">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold">Host Profile</h1>
              <p className="text-gray-500">
                Manage your account information
              </p>
            </div>

            {/* INFO */}
            <div className="bg-white border rounded-xl shadow-sm mb-6 p-5">
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <FaUser className="text-xl text-gray-600" />
                  <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full">
                    Verified Host
                  </span>
                </div>

                <div>
                  <p className="text-gray-700 font-medium">Member since</p>
                  <p className="font-semibold">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* EDIT */}
            <div className="bg-white border rounded-xl shadow-sm p-5">
              <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

              <div className="space-y-4">
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Full Name"
                />

                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                  <input
                    value={user.email}
                    disabled
                    className="w-full border px-10 py-2 bg-gray-50"
                  />
                </div>

                <div className="relative">
                  <FaPhone className="absolute left-3 top-3 text-gray-400" />
                  <input
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full border px-10 py-2 rounded"
                  />
                </div>

                <textarea
                  value={form.bio}
                  onChange={(e) =>
                    setForm({ ...form, bio: e.target.value })
                  }
                  rows="3"
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Tell guests about yourself..."
                />

                <button
                  onClick={handleSubmit}
                  className="bg-teal-500 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HostProfile;
