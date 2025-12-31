import React from "react";
import linkedinLogo from "../../assets/linkedin-logo.png";
import instagramLogo from "../../assets/instagram-logo.png";
import whatsappLogo from "../../assets/whatsapp-logo.svg";
import gmailLogo from "../../assets/gmail-logo.svg"

function Footer() {
  return (
    <>
      <section
        className=" py-20 px-6 bg-[#f0e6d5c3] "
        style={{
          background: "linear-gradient(180deg, #f0e6d5c3 0%, #faf7f2 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Ready to Find Your Paradise?
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Get in touch with our team to discover your perfect property in you
            location.
          </p>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-16">
            {/* WhatsApp */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-2xl bg-[#10b5cb] shadow-xl flex items-center justify-center">
                <img
                  src={whatsappLogo}
                  alt="WhatsApp"
                  className="w-12 h-12 mx-auto"
                />
              </div>
              <p className="font-semibold mt-4">WhatsApp Booking</p>
              <p className="text-gray-600 text-sm">+91 123 456 7890</p>
            </div>

            {/* Gmail */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-2xl bg-[#10b5cb] shadow-xl flex items-center justify-center">
                <img
                  src={gmailLogo}
                  alt="Gmail"
                  className="w-12 h-12 mx-auto"
                />
              </div>
              <p className="font-semibold mt-4">Email</p>
              <p className="text-gray-600 text-sm">StayEasegroup@gmail.com</p>
            </div>

            {/* Instagram */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-2xl bg-[#10b5cb] shadow-xl flex items-center justify-center">
                <img
                  src={instagramLogo}
                  alt="Instagram"
                  className="w-12 h-12 mx-auto"
                />
              </div>
              <p className="font-semibold mt-4">Follow Us</p>
              <p className="text-gray-600 text-sm">@StayEase</p>
            </div>

            {/* LinkedIn */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-2xl bg-[#10b5cb] shadow-xl flex items-center justify-center">
                <img
                  src={linkedinLogo}
                  alt="LinkedIn"
                  className="w-12 h-12 mx-auto"
                />
              </div>
              <p className="font-semibold mt-4">LinkedIn</p>
              <p className="text-gray-600 text-sm">Stay Ease Group</p>
            </div>
          </div>
        </div>
      </section>

      <footer
        className="text-white py-16 px-6"
        style={{
          background: "linear-gradient(180deg, #10b5cb 0%, #1b6f7a 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo + Description */}
          <div>
            <h2 className="text-3xl font-bold">
              Stay Ease
              <br />
              GROUP
            </h2>
            <p className="text-gray-200 mt-4 leading-relaxed">
              Your trusted partner for luxury properties in your destinations.
              Discover paradise with our expert guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-200">
              <li className="hover:text-white cursor-pointer">Properties</li>
              <li className="hover:text-white cursor-pointer">About</li>
              <li className="hover:text-white cursor-pointer">Services</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-200">
              <li>Villa Development</li>
              <li>Sourcing & Sales</li>
              <li>Property Investment</li>
              <li>Full Service Management</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-white text-3xl">
                <img src={linkedinLogo} alt="LinkedIn" className="w-8 h-8" />
              </a>
              <a href="#" className="text-white text-3xl">
                <img src={instagramLogo} alt="Instagram" className="w-8 h-8" />
              </a>
            </div>
          </div>
          {/* <div className="  items-center  justify-center border-t">
            <p className="text-gray-200 text-sm">
              © 2025 Stay Ease Group. All rights reserved.
            </p>
          </div> */}
        </div>
      </footer>
    </>
  );
}

export default Footer;
