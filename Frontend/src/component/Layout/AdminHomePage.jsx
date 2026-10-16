import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaBoxOpen, FaClipboardList, FaRupeeSign, FaUser } from "react-icons/fa";
import { LoadingSpinner, LoadingState } from "../Common/LoadingSpinner";

const AdminHomePage = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("userToken") || localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [ordersRes, productsRes] = await Promise.allSettled([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/getAllOrder`, config),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/getAllProduct`, config),
        ]);

        if (ordersRes.status === "fulfilled") {
          setOrders(ordersRes.value.data?.data || []);
        }
        if (productsRes.status === "fulfilled") {
          setProducts(productsRes.value.data?.data || []);
        }
      } catch (err) {
        setError(err.message || "Failed to load dashboard statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  const totalRevenue = orders.reduce((sum, item) => sum + (Number(item.totalPrice) || 0), 0);
  const recentOrders = orders.slice(0, 8);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancel":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Overview of your store sales, inventory, and recent activity</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/product"
            className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            Manage Products
          </Link>
          <Link
            to="/admin/order"
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            Manage Orders
          </Link>
        </div>
      </div>

      {/* Dashboard KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Card */}
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-gray-400">Total Revenue</span>
            <div className="text-3xl font-extrabold text-gray-900 mt-2 flex items-center gap-2">
              {loading ? (
                <LoadingSpinner size="sm" color="orange" />
              ) : (
                `Rs. ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              )}
            </div>
            <span className="text-xs text-green-600 font-medium mt-1 inline-block">From {orders.length} orders</span>
          </div>
          <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-2xl">
            <FaRupeeSign />
          </div>
        </div>

        {/* Total Orders Card */}
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-gray-400">Total Orders</span>
            <div className="text-3xl font-extrabold text-gray-900 mt-2 flex items-center gap-2">
              {loading ? <LoadingSpinner size="sm" color="orange" /> : orders.length}
            </div>
            <Link to="/admin/order" className="text-xs text-orange-600 hover:underline font-medium mt-1 inline-block">
              View all orders &rarr;
            </Link>
          </div>
          <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center text-2xl">
            <FaClipboardList />
          </div>
        </div>

        {/* Total Products Card */}
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-gray-400">Total Products</span>
            <div className="text-3xl font-extrabold text-gray-900 mt-2 flex items-center gap-2">
              {loading ? <LoadingSpinner size="sm" color="orange" /> : products.length}
            </div>
            <Link to="/admin/product" className="text-xs text-blue-600 hover:underline font-medium mt-1 inline-block">
              Manage inventory &rarr;
            </Link>
          </div>
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-2xl">
            <FaBoxOpen />
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Customer Orders</h2>
          <Link to="/admin/order" className="text-sm text-orange-600 hover:underline font-semibold">
            View All ({orders.length})
          </Link>
        </div>

        {loading ? (
          <div className="py-6">
            <LoadingState text="Loading dashboard statistics..." subtext="Syncing store sales and recent transactions" />
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="py-12 text-center text-gray-400">No orders placed yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-400 bg-gray-50/50">
                  <th className="p-3 font-semibold">Order ID</th>
                  <th className="p-3 font-semibold">Customer</th>
                  <th className="p-3 font-semibold">Total</th>
                  <th className="p-3 font-semibold">Payment</th>
                  <th className="p-3 font-semibold">Status</th>
                  <th className="p-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {recentOrders.map((ord) => (
                  <tr key={ord._id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-3 font-mono text-xs font-semibold text-gray-700">
                      {ord._id}
                    </td>
                    <td className="p-3">
                      <div className="font-medium text-gray-900">{ord.user?.name || "Guest / Anonymous"}</div>
                      <div className="text-xs text-gray-400">{ord.user?.email || "No email"}</div>
                    </td>
                    <td className="p-3 font-bold text-gray-900">
                      Rs. {Number(ord.totalPrice).toFixed(2)}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${ord.isPaid ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {ord.isPaid ? "Paid" : "Pending"}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(ord.status)}`}>
                        {ord.status || "Processing"}
                      </span>
                    </td>
                    <td className="p-3 text-xs text-gray-500">
                      {ord.createdAt ? new Date(ord.createdAt).toLocaleDateString() : "Recent"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHomePage;
