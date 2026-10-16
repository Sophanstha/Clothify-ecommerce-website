import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { LoadingState } from "../component/Common/LoadingSpinner";

const OrderDetail = () => {
  const { id } = useParams();
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      setLoading(true);
      try {
        const token =
          localStorage.getItem("userToken") || localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/order/singleOrder/${id}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        setOrderDetail(response.data?.data);
      } catch (err) {
        console.error("Failed to fetch order:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrderDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-12 max-w-4xl mx-auto">
        <LoadingState text="Loading order details..." subtext="Retrieving order verification and shipment status" />
      </div>
    );
  }

  if (error || !orderDetail) {
    return (
      <div className="p-12 text-center max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-red-500 mb-2">Order Not Found</h2>
        <p className="text-gray-500 mb-6">{error || "Could not find the requested order."}</p>
        <Link
          to="/profile"
          className="bg-orange-500 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-orange-600 transition"
        >
          Back to My Orders
        </Link>
      </div>
    );
  }

  const items = orderDetail.orderItem || orderDetail.orderItems || [];
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Order Details</h1>
        <Link
          to="/profile"
          className="text-orange-600 hover:text-orange-700 font-semibold text-sm"
        >
          ← Back to Orders
        </Link>
      </div>

      {/* ORDER INFO CARD */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Order #{orderDetail._id}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Placed on:{" "}
              {new Date(orderDetail.createdAt || Date.now()).toLocaleString()}
            </p>
          </div>
          <span
            className={`mt-3 md:mt-0 px-4 py-1.5 text-sm font-semibold rounded-full ${
              orderDetail.isPaid
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {orderDetail.isPaid ? "Paid" : "Pending Payment"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-gray-700 text-sm border-t pt-4">
          <p>
            <span className="font-semibold text-gray-900">Payment Method:</span>{" "}
            {orderDetail.paymentMethod || "Cash on Delivery"}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Delivery Status:</span>{" "}
            {orderDetail.isDeliverd ? "Delivered" : "In Progress"}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Customer:</span>{" "}
            {orderDetail.user?.name || "Customer"} ({orderDetail.user?.email || "N/A"})
          </p>
          <p>
            <span className="font-semibold text-gray-900">Shipping Address:</span>{" "}
            {orderDetail.shippingAddress?.address || "N/A"},{" "}
            {orderDetail.shippingAddress?.city || ""},{" "}
            {orderDetail.shippingAddress?.country || ""}
          </p>
        </div>
      </div>

      {/* ORDER ITEMS */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {items.map((item, index) => (
          <Link
            to={item.productId ? `/product/${item.productId}` : "#"}
            key={item.productId || index}
            className="flex items-center bg-white shadow-sm border border-gray-100 rounded-2xl p-4 hover:shadow-md transition"
          >
            <img
              src={item.image || "https://placehold.co/100x100"}
              alt={item.name}
              className="w-20 h-20 rounded-xl object-cover mr-4 border"
            />
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Size: {item.size || "Standard"} | Color: {item.color || "Default"}
              </p>
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              <p className="mt-1 font-bold text-gray-900">
                Rs. {(item.price * (item.quantity || 1)).toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* ORDER SUMMARY */}
      <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 max-w-md ml-auto">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Order Summary
        </h2>
        <div className="flex justify-between text-gray-600 text-sm mb-2">
          <span>Subtotal</span>
          <span>Rs. {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600 text-sm mb-2">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <hr className="my-3" />
        <div className="flex justify-between text-base font-bold text-gray-900">
          <span>Total</span>
          <span className="text-orange-600">
            Rs. {orderDetail.totalPrice?.toFixed(2) || subtotal.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
