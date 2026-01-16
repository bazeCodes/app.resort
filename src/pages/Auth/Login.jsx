import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaApple, FaGoogle, FaFacebookF } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import applelogo from "../../assets/apple-logo.png";
import facebooklogo from "../../assets/facebook-logo.png";
import googlelogo from "../../assets/google-logo.png";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      login(data.user, data.token);

      navigate("/");
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div
        className="min-h-screen absolute inset-0 bg-cover bg-center "
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
        }}
      />
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
          <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
          <p className="text-center text-sm max-w-xs">
            Please log in using your personal information to stay connected with
            us.
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
            {/* Apple */}
            <a
              href="*"
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center
               "
            >
              <img
                src={applelogo}
                alt="apple logo"
                className="w-5 h-5 object-contain"
              />
            </a>

            {/* Google */}
            <a
              href="*"
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center
               "
            >
              <img
                src={googlelogo}
                alt="google logo"
                className="w-5 h-5 object-contain"
              />
            </a>

            {/* Facebook */}
            <a
              href="*"
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center
               "
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
                className="w-full p-3 bg-gray-100 rounded-[32px] focus:ring-1 focus:ring-[#10b5cb] outline-none"
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

            <div className="text-right text-sm text-[#10b5cb] cursor-pointer">
              Forgot password?
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-gray-400" : "bg-[#10b5cb]"
              } text-white py-3 rounded-[32px] font-semibold`}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="text-center text-sm mt-6">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-[#10b5cb] font-semibold cursor-pointer"
            >
              Register
            </span>
          </p>

          {message && (
            <p className="text-center mt-4 text-sm text-red-500">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
