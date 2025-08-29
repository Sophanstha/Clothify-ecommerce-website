import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Login() {
    
    const[email,setemail] = useState("");
    const[password,setpassword] = useState("");

    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
      {/* Background with orange overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1521335629791-ce4aec67dd53"
          alt="clothing background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-orange-500/30" />
      </div>

      {/* Card */}
      <div className="bg-white/95 backdrop-blur-md shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome Back to <span className="text-orange-500">Clothify</span>
        </h2>

        <form className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
            value={email}
            onChange={(e)=>setemail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>

        {/* Extra Options */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <a href="/forgot-password" className="hover:text-orange-500">
            Forgot Password?
          </a>
          <NavLink to={"/register"} className="hover:text-orange-500">
            Create Account
          </NavLink>
        </div>
      </div>
    </div>
  );
}
