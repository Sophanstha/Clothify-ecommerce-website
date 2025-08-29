import React from "react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const Topbar = () => {
  return (
    <div className="bg-orange-500 text-white px-4 py-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 text-center sm:text-left">
      {/* Left - Social icons */}
      <div className="flex justify-center sm:justify-start items-center">
        <FaInstagram className="cursor-pointer hover:scale-110 transition" />
        <FaFacebook className="ml-3 sm:ml-2 cursor-pointer hover:scale-110 transition" />
        <FaTwitter className="ml-3 cursor-pointer hover:scale-110 transition" />
      </div>

      {/* Center - Welcome text */}
      <h2 className="text-sm font-bold">
        Welcome to our E-commerce Store
      </h2>

      {/* Right - Contact */}
      <div className="flex justify-center sm:justify-end items-center">
        <span className="text-sm"> 9808005044</span>
      </div>
    </div>
  );
};

export default Topbar;
