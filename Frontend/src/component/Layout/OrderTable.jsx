import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoadingState } from "../Common/LoadingSpinner";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const fetchMyOrders = async () => {
      setLoading(true);
      try {
        const token =
          localStorage.getItem("userToken") || localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/order/my-orders`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        setOrders(response.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  const handleNav = (orderId) => {
    nav(`/order/${orderId}`);
  };

  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-xl p-8">
        <LoadingState text="Loading your orders..." subtext="Fetching recent transactions and purchase history" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow-md rounded-xl p-8 text-center text-red-500">
        Failed to load orders: {error}
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="bg-white shadow-md rounded-xl p-8 text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No orders found</h3>
        <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100">
      <h2 className="text-xl font-bold p-4 border-b border-gray-100 text-gray-800">
        My Orders ({orders.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-gray-50 text-gray-600 font-semibold border-b">
            <tr>
              <th className="p-3">Item</th>
              <th className="p-3">Order ID</th>
              <th className="p-3">Created</th>
              <th className="p-3">Shipping Address</th>
              <th className="p-3">Items</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const firstItem = order.orderItem?.[0] || order.orderItems?.[0];
              const totalItems =
                order.orderItem?.length || order.orderItems?.length || 0;
              return (
                <tr
                  key={order._id}
                  onClick={() => handleNav(order._id)}
                  className="border-b hover:bg-gray-50 cursor-pointer transition"
                >
                  <td className="p-3">
                    <img
                      src={
                        firstItem?.image ||
                        "https://placehold.co/50x50?text=Order"
                      }
                      alt={firstItem?.name || "Order item"}
                      className="w-12 h-12 rounded-lg object-cover border"
                    />
                  </td>
                  <td className="p-3 font-semibold text-gray-800">
                    #{order._id?.slice(-6).toUpperCase()}
                  </td>
                  <td className="p-3 text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-gray-600">
                    {order.shippingAddress?.city},{" "}
                    {order.shippingAddress?.country}
                  </td>
                  <td className="p-3 text-gray-600">{totalItems}</td>
                  <td className="p-3 font-semibold text-gray-800">
                    Rs. {order.totalPrice?.toFixed(2) || order.totalPrice}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        order.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
