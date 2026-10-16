import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../redux/slices/authSlices";
import toast from "react-hot-toast";
import { LoadingSpinner } from "../component/Common/LoadingSpinner";

export default function Register() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const result = await dispatch(registerUser({ name, email, password })).unwrap();
      toast.success(`Account created! Welcome, ${result.name || "Customer"}!`);
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(typeof err === "string" ? err : err?.message || "Registration failed");
    }
  };
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
      {/* Background with orange overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1520975922071-a7f992034fec"
          alt="clothing background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-orange-500/30" />
      </div>

      {/* Card */}
      <div className="bg-white/95 backdrop-blur-md shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Register to <span className="text-orange-500">Clothify</span>
        </h2>

        <form className="space-y-4" onSubmit={handleRegister}>
          {/* Name */}
          <div>
            <label className="block text-gray-600 mb-1">Full Name</label>
            <input
                value={name}
                onChange={(e)=>setname(e.target.value)}
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

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
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" color="white" /> Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to={"/login"} className="text-orange-500 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
