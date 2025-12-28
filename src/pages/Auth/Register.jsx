import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage("Account created successfully");
        setTimeout(() => navigate("/login"), 1200);
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* CLOSE BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold"
        >
          ×
        </button>
        

        {/* LEFT IMAGE */}
        <div
          className="hidden md:flex flex-col justify-center items-center text-white p-8"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=1200)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2 className="text-3xl font-bold mb-4">Create Account</h2>
          <p className="text-center text-sm max-w-xs">
            Register to access all features and stay connected with us.
          </p>
        </div>

        {/* RIGHT FORM */}
        <div className="p-8 md:p-10">
          <h2 className="text-2xl font-bold text-center mb-6">REGISTER</h2>



          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#10b5cb] outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#10b5cb] outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#10b5cb] outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-gray-400" : "bg-[#10b5cb]"
              } text-white py-3 rounded-md font-semibold`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-center text-sm mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#10b5cb] font-semibold cursor-pointer"
            >
              Login
            </span>
          </p>

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

export default Register;
