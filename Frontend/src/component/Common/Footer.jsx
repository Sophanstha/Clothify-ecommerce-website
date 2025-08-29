import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10 border border-gray-200 ">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand / Logo */}
        <div className="text-xl font-bold text-orange-500">Clothify</div>

        {/* Links */}
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-orange-400">Home</a>
          <a href="#" className="hover:text-orange-400">Men</a>
          <a href="#" className="hover:text-orange-400">Women</a>
          <a href="#" className="hover:text-orange-400">Top wear</a>
          <a href="#" className="hover:text-orange-400">Bottom wear</a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-lg">
          <a href="#" className="hover:text-orange-400"><FaFacebookF /></a>
          <a href="#" className="hover:text-orange-400"><FaInstagram /></a>
          <a href="#" className="hover:text-orange-400"><FaTwitter /></a>
          <a href="#" className="hover:text-orange-400"><FaLinkedinIn /></a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-gray-400 text-sm mt-6">
        © {new Date().getFullYear()} Clothify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
