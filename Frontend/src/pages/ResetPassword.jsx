import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { LoadingSpinner } from "../component/Common/LoadingSpinner";
import { HiOutlineLockClosed, HiArrowLeft, HiOutlineCheck } from "react-icons/hi";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill in both password fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/reset-password/${token}`,
        { password }
      );

      toast.success(response.data?.message || "Password reset successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Invalid or expired reset token"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative px-4 py-12">
      {/* Background with overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1521335629791-ce4aec67dd53"
          alt="clothing background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-orange-500/25 backdrop-blur-[2px]" />
      </div>

      <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md border border-orange-100">
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-2xl shadow-sm">
            <HiOutlineLockClosed />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Reset Password
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter your new secure password below to complete the reset.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <HiOutlineLockClosed className="text-lg" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm bg-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <HiOutlineCheck className="text-lg" />
              </div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm bg-white"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg mt-2"
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" color="white" /> Resetting Password...
              </>
            ) : (
              "Save New Password"
            )}
          </button>

          <div className="text-center pt-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-orange-600 font-medium transition"
            >
              <HiArrowLeft className="text-base" /> Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
