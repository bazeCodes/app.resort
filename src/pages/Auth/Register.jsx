import React, { useState } from "react";
import { FaApple, FaGoogle, FaFacebookF } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import applelogo from "../../assets/apple-logo.png";
import facebooklogo from "../../assets/facebook-logo.png";
import googlelogo from "../../assets/google-logo.png";
import { Eye, EyeOff } from "lucide-react";

function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
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
      <div
        className="min-h-screen absolute inset-0 bg-cover bg-center "
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
        }}
      />
      {/*  */}
      <div className="relative bg-white rounded-[32px] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-[520px_350px]">
        {/* CLOSE BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold"
        >
          ×
        </button>

        {/* LEFT IMAGE */}
        <div
          className="hidden md:flex flex-col justify-center items-center text-white p-8 m-3 rounded-[32px]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
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
          <h2 className="text-2xl font-bold text-center mb-6 text-[#10b5cb]">
            stay easy
          </h2>
          <p className="text-2xl font-bold text-center mb-15 leading-tight">
            <span className="block">Find Your</span>
            <span className="block">Perfect Location</span>
          </p>

          <div className="flex mb-6 justify-center items-center">
            <a
              href="*"
              className="w-10 h-10 bg-gray-100 items-center flex justify-center rounded-full"
            >
              <img
                src={applelogo}
                alt="apple logo"
                className="w-5 h-5 object-contain"
              />
            </a>
            <a
              href="*"
              className="w-10 h-10 bg-gray-100 items-center flex justify-center rounded-full"
            >
              <img
                src={googlelogo}
                alt="gmail logo"
                className="w-5 h-5 object-contain"
              />
            </a>
            <a
              href="*"
              className="w-10 h-10 bg-gray-100 items-center flex justify-center rounded-full"
            >
              <img
                src={facebooklogo}
                alt="facebook logo"
                className="w-5 h-5 object-contain"
              />
            </a>
          </div>
          <div className="text-center text-gray-400 text-sm mb-4">or</div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-100 rounded-[32px] focus:ring-1 focus:ring-[#10b5cb] outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-100 rounded-[32px] focus:ring-1 focus:ring-[#10b5cb] outline-none"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 pr-12 bg-gray-100 rounded-[32px]
               focus:ring-1 focus:ring-[#10b5cb] outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2
               text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-gray-400" : "bg-[#10b5cb]"
              } text-white py-3 rounded-[32px] font-semibold`}
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
