import React, { useState, useEffect } from "react";
import OrderTable from "../component/Layout/OrderTable";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateProfile } from "../redux/slices/authSlices";
import { clearCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LoadingSpinner } from "../component/Common/LoadingSpinner";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineLockClosed,
  HiOutlineShoppingBag,
  HiOutlinePencilAlt,
  HiOutlineLogout,
  HiOutlineCheckCircle,
} from "react-icons/hi";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState("orders");
  const [loading, setLoading] = useState(false);

  // Profile Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        password: "",
        confirmPassword: "",
        address: user.address?.address || "",
        city: user.address?.city || "",
        postalCode: user.address?.postalCode || "",
        country: user.address?.country || "",
      });
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Name and Email are required");
      return;
    }

    if (formData.password) {
      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: {
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      },
    };

    if (formData.password) {
      payload.password = formData.password;
    }

    try {
      setLoading(true);
      await dispatch(updateProfile(payload)).unwrap();
      toast.success("Profile updated successfully!");
      setFormData((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));
    } catch (err) {
      toast.error(err || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            My Account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your profile, view orders, and update delivery addresses
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              {/* User Avatar & Name */}
              <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white font-bold text-3xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                    {user.name ? user.name[0].toUpperCase() : "U"}
                  </div>
                  <span className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <h2 className="text-lg font-bold text-gray-800 mt-3">
                  {user.name}
                </h2>
                <p className="text-xs text-gray-500 truncate max-w-[200px]">
                  {user.email}
                </p>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="bg-orange-50 text-orange-700 text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider border border-orange-200">
                    {user.role || "Customer"}
                  </span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="mt-6 space-y-1.5">
                <button
                  type="button"
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all text-left ${
                    activeTab === "orders"
                      ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <HiOutlineShoppingBag className="text-xl" />
                  <span>My Orders</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all text-left ${
                    activeTab === "profile"
                      ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <HiOutlinePencilAlt className="text-xl" />
                  <span>Edit Profile</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("address")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all text-left ${
                    activeTab === "address"
                      ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <HiOutlineLocationMarker className="text-xl" />
                  <span>Shipping Address</span>
                </button>
              </nav>

              {/* Saved Address Preview snippet */}
              {user.address?.address && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-2">
                    Default Delivery
                  </p>
                  <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-600 space-y-1">
                    <p className="font-medium text-gray-800 truncate">
                      {user.address.address}
                    </p>
                    <p>
                      {user.address.city && `${user.address.city}, `}
                      {user.address.postalCode}
                    </p>
                    <p>{user.address.country}</p>
                    {user.phone && <p className="text-gray-500">📞 {user.phone}</p>}
                  </div>
                </div>
              )}

              {/* Logout button */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 py-2.5 px-4 rounded-xl text-sm font-semibold transition"
                >
                  <HiOutlineLogout className="text-lg" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="flex-1 min-w-0">
            {activeTab === "orders" && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <HiOutlineShoppingBag className="text-orange-500" />
                    Order History
                  </h2>
                  <OrderTable />
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="mb-6 pb-4 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-800">
                    Edit Profile Details
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Keep your personal information and contact credentials up to date
                  </p>
                </div>

                <form onSubmit={handleSubmitProfile} className="space-y-6">
                  {/* Personal details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <HiOutlineUser className="text-lg" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <HiOutlineMail className="text-lg" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <HiOutlinePhone className="text-lg" />
                        </div>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                          className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password section */}
                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="text-base font-bold text-gray-800 mb-1">
                      Change Password
                    </h3>
                    <p className="text-xs text-gray-500 mb-4">
                      Leave these fields blank if you do not wish to update your password
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                          New Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <HiOutlineLockClosed className="text-lg" />
                          </div>
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Min 6 characters"
                            className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <HiOutlineLockClosed className="text-lg" />
                          </div>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Re-enter new password"
                            className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-2 disabled:opacity-60 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <LoadingSpinner size="sm" color="white" /> Saving...
                        </>
                      ) : (
                        <>
                          <HiOutlineCheckCircle className="text-lg" /> Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "address" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="mb-6 pb-4 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-800">
                    Shipping & Delivery Address
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    This default address is automatically loaded during checkout for express ordering
                  </p>
                </div>

                <form onSubmit={handleSubmitProfile} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Main Street, Apt / Suite 4B"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="New York"
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                          Postal / Zip Code
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          placeholder="10001"
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          placeholder="United States"
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-2 disabled:opacity-60 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <LoadingSpinner size="sm" color="white" /> Saving...
                        </>
                      ) : (
                        <>
                          <HiOutlineCheckCircle className="text-lg" /> Save Address
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
