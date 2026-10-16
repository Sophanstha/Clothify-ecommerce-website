import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCheckCircle, FaTrash, FaSearch } from "react-icons/fa";
import { LoadingState } from "../Common/LoadingSpinner";

const OrderManagment = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const token = localStorage.getItem("userToken") || localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/getAllOrder`,
        config
      );
      setOrders(res.data?.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/admin/updateOrderStatus/${id}`,
        { status: newStatus },
        config
      );
      toast.success(`Order status updated to ${newStatus}`);
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleDeleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/admin/deleteOrder/${id}`,
        config
      );
      toast.success("Order deleted successfully");
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      toast.error("Failed to delete order");
    }
  };

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

  const filteredOrders = orders.filter((o) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      o._id?.toLowerCase().includes(term) ||
      o.user?.name?.toLowerCase().includes(term) ||
      o.user?.email?.toLowerCase().includes(term);

    const matchesStatus =
      filterStatus === "All" || o.status?.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Order Management</h1>
          <p className="text-gray-500 text-sm mt-1">Review orders, update fulfillment statuses, and track deliveries</p>
        </div>
      </div>

      {/* Controls & Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Search by Order ID or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {["All", "Processing", "Shipped", "Delivered", "Cancel"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filterStatus === status
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="py-8">
            <LoadingState text="Loading customer orders..." subtext="Retrieving orders and fulfillment progress" />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-16 text-center text-gray-400">No orders found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Items</th>
                  <th className="p-4">Total Price</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredOrders.map((ord) => (
                  <tr key={ord._id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4 font-mono text-xs font-semibold text-gray-700">
                      {ord._id}
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-gray-900">{ord.user?.name || "Guest Customer"}</div>
                      <div className="text-xs text-gray-400">{ord.user?.email || "No email"}</div>
                    </td>
                    <td className="p-4 text-xs text-gray-600">
                      {ord.orderItem?.length || 0} item(s)
                    </td>
                    <td className="p-4 font-bold text-gray-900">
                      Rs. {Number(ord.totalPrice).toFixed(2)}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${ord.isPaid ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {ord.isPaid ? "Paid" : "Pending"}
                      </span>
                    </td>
                    <td className="p-4">
                      <select
                        value={ord.status || "Processing"}
                        onChange={(e) => handleStatusChange(ord._id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer ${getStatusBadge(ord.status)}`}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancel">Cancel</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {ord.status !== "Delivered" && (
                          <button
                            onClick={() => handleStatusChange(ord._id, "Delivered")}
                            className="bg-green-50 text-green-700 hover:bg-green-600 hover:text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                            title="Mark as Delivered"
                          >
                            <FaCheckCircle size={12} /> Delivered
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteOrder(ord._id)}
                          className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-lg transition"
                          title="Delete Order"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
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

export default OrderManagment;
