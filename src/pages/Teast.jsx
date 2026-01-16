import React from "react";
import { FaApple, FaGoogle, FaFacebookF } from "react-icons/fa";

export default function AuthHero() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black/40 relative">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-[2px] scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
        }}
      />

      {/* Main card */}
      <div className="relative z-10 w-[92%] max-w-6xl bg-white rounded-[32px] overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">
        {/* LEFT – FORM */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <span className="text-sm font-semibold text-green-700 mb-4">
            voyager
          </span>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
            Start your <br /> perfect trip
          </h1>

          {/* Social buttons */}
          <div className="flex gap-3 mb-6">
            <SocialIcon icon={<FaApple />} />
            <SocialIcon icon={<FaGoogle />} />
            <SocialIcon icon={<FaFacebookF />} />
          </div>

          <div className="text-center text-gray-400 text-sm mb-4">or</div>

          {/* Inputs */}
          <div className="space-y-4">
            <Input placeholder="Full name" />
            <Input placeholder="Email" type="email" />
            <Input placeholder="Password" type="password" />
          </div>

          <button className="mt-6 bg-[#3f6f57] hover:bg-[#365f4b] transition text-white py-3 rounded-full font-medium">
            Start
          </button>

          <p className="text-sm text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <span className="font-semibold text-black cursor-pointer">
              Log in
            </span>
          </p>
        </div>

        {/* RIGHT – IMAGE MAP */}
        <div className="relative hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
            alt="trail"
            className="w-full h-full object-cover"
          />

          {/* Overlay pins */}
          <Pin
            top="30%"
            left="35%"
            title="Garcia Village"
            subtitle="Villa Mexico"
          />

          <Pin
            top="48%"
            left="62%"
            title="1.2 km"
            subtitle="left to your accommodation"
            small
          />

          <Pin top="75%" left="50%" title="Gringo Trail" />
        </div>
      </div>
    </div>
  );
}

/* ---------- Helpers ---------- */

function SocialIcon({ icon }) {
  return (
    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 cursor-pointer hover:bg-gray-200 transition">
      {icon}
    </div>
  );
}

function Input({ placeholder, type = "text" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full bg-gray-100 px-5 py-3 rounded-full outline-none focus:ring-2 focus:ring-green-600"
    />
  );
}

function Pin({ top, left, title, subtitle, small }) {
  return (
    <div className="absolute" style={{ top, left }}>
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow text-sm">
        <div className="w-2 h-2 bg-green-700 rounded-full" />
        <div>
          <div className={`font-semibold ${small ? "text-sm" : ""}`}>
            {title}
          </div>
          {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
        </div>
      </div>
    </div>
  );
}
