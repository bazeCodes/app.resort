import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
        setMessage(data.message || "Login failed.");
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setMessage("Login successful");
        setTimeout(() => navigate("/"), 700);
      }
    } catch (err) {
      setMessage("Could not connect to server.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
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
          <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
          <p className="text-center text-sm max-w-xs">
            Please log in using your personal information to stay connected with us.
          </p>
        </div>

        {/* RIGHT FORM */}
        <div className="p-8 md:p-10">
          <h2 className="text-2xl font-bold text-center mb-6">LOGIN</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="text-right text-sm text-[#10b5cb] cursor-pointer">
              Forgot password?
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-gray-400" : "bg-[#10b5cb]"
              } text-white py-3 rounded-md font-semibold`}
            >
              {loading ? "Logging in..." : "Log In"}
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
