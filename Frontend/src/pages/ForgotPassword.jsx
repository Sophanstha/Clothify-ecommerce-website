import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { LoadingSpinner } from "../component/Common/LoadingSpinner";
import { HiOutlineMail, HiArrowLeft, HiOutlineCheckCircle } from "react-icons/hi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/forgot-password`,
        { email }
      );
      toast.success(response.data?.message || "Reset link generated!");
      setSubmitted(true);
      if (response.data?.resetToken) {
        setResetToken(response.data.resetToken);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to process forgot password request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative px-4 py-12">
      {/* Background with orange overlay */}
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
            <HiOutlineMail />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Forgot Password?
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            No worries! Enter your registered email address and we'll generate your password reset link.
          </p>
        </div>

        {submitted ? (
          <div className="space-y-4">
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl flex items-start gap-3">
              <HiOutlineCheckCircle className="text-2xl text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-orange-800">
                  Password reset request created!
                </p>
                <p className="text-xs text-orange-700 mt-1">
                  A reset request has been processed for <strong>{email}</strong>.
                </p>
              </div>
            </div>

            {resetToken && (
              <div className="p-4 bg-gray-50 border rounded-xl text-center">
                <p className="text-xs text-gray-500 mb-2 font-medium">
                  Direct Reset Link (Local Testing):
                </p>
                <Link
                  to={`/reset-password/${resetToken}`}
                  className="inline-block bg-orange-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-orange-600 transition shadow-sm"
                >
                  Set New Password Now &rarr;
                </Link>
              </div>
            )}

            <div className="text-center pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-orange-600 font-medium transition"
              >
                <HiArrowLeft className="text-base" /> Back to Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <HiOutlineMail className="text-lg" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm bg-white"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" color="white" /> Generating Link...
                </>
              ) : (
                "Send Reset Link"
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
        )}
      </div>
    </div>
  );
}
