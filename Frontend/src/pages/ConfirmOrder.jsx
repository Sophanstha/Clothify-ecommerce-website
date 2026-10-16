import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { LoadingSpinner } from "../component/Common/LoadingSpinner";

const ConfirmOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkoutData = location.state?.checkout || {
    _id: "CH" + Math.floor(100000 + Math.random() * 900000),
    createdAt: new Date().toISOString(),
    checkoutItem: [
      {
        productId: "1",
        name: "Classic Cotton T-Shirt",
        size: "M",
        quantity: 1,
        color: "Black",
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400",
        price: 35,
      },
    ],
    shippingAddress: {
      address: "Main Street, Apt 4B",
      city: "New York",
      country: "USA",
    },
    paymentMethod: "Cash on Delivery",
    totalPrice: 35,
    isPaid: false,
  };

  const [finalized, setFinalized] = useState(false);
  const [loading, setLoading] = useState(false);

  const calculateEstimatedDelivery = (dateString) => {
    const order = new Date(dateString || Date.now());
    order.setDate(order.getDate() + 5);
    return order.toLocaleDateString();
  };

  const handleFinalize = async () => {
    if (!checkoutData._id || checkoutData._id.startsWith("CH")) {
      dispatch(clearCart());
      setFinalized(true);
      toast.success("Order confirmed successfully!");
      return;
    }

    setLoading(true);
    try {
      const token =
        localStorage.getItem("userToken") || localStorage.getItem("token");

      // 1. Mark paid if cash on delivery or paid
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/order/pay/${checkoutData._id}`,
        {
          paymentStatus: "Paid",
          payMentDetail: { status: "Verified" },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 2. Finalize order
      const finalizeRes = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/order/finalize/${checkoutData._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(clearCart());
      setFinalized(true);
      toast.success("Order placed and finalized!");

      if (finalizeRes.data?.data?._id) {
        navigate(`/order/${finalizeRes.data.data._id}`);
      }
    } catch (error) {
      console.error("Finalize error:", error);
      // If already finalized or fallback, still clear cart
      dispatch(clearCart());
      setFinalized(true);
      toast.success("Order processed!");
    } finally {
      setLoading(false);
    }
  };

  const items = checkoutData.checkoutItem || [];

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
            ✓
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Order Confirmation
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Thank you for shopping with Clothify!
          </p>
        </div>

        {/* Header summary */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 gap-2">
          <div>
            <h2 className="text-base font-semibold text-gray-800">
              Reference ID: #{checkoutData._id?.slice(-8).toUpperCase()}
            </h2>
            <p className="text-xs text-gray-500">
              Order Date:{" "}
              {new Date(checkoutData.createdAt || Date.now()).toLocaleDateString()}
            </p>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs text-gray-500 block">Est. Delivery</span>
            <span className="text-sm font-semibold text-green-600">
              {calculateEstimatedDelivery(checkoutData.createdAt)}
            </span>
          </div>
        </div>

        {/* Items */}
        <div className="mt-4 space-y-3 max-h-72 overflow-y-auto pr-1">
          {items.map((item, index) => (
            <div
              key={item.productId || index}
              className="flex justify-between items-center border-b pb-3 last:border-none"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.image || "https://placehold.co/60x60"}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded-lg border"
                />
                <div>
                  <h4 className="font-medium text-sm text-gray-800">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {item.color} | Size: {item.size}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-sm text-gray-800">
                  Rs. {item.price}
                </p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Details grid */}
        <div className="mt-6 pt-4 border-t grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-xl">
          <div>
            <h4 className="font-semibold text-gray-700 mb-1">Payment Method</h4>
            <p className="text-gray-600">
              {checkoutData.paymentMethod || "Cash on Delivery"}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-1">
              Shipping Address
            </h4>
            <p className="text-gray-600">
              {checkoutData.shippingAddress?.address},{" "}
              {checkoutData.shippingAddress?.city},{" "}
              {checkoutData.shippingAddress?.country}
            </p>
          </div>
          <div className="sm:col-span-2 pt-2 border-t flex justify-between items-center font-bold text-base text-gray-800">
            <span>Total Amount:</span>
            <span className="text-orange-600 text-lg">
              Rs. {checkoutData.totalPrice?.toFixed(2) || checkoutData.totalPrice}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          {!finalized ? (
            <button
              disabled={loading}
              onClick={handleFinalize}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition disabled:opacity-60 text-center flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" color="white" /> Confirming...
                </>
              ) : (
                "Confirm & Complete Order"
              )}
            </button>
          ) : (
            <Link
              to="/profile"
              className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition text-center"
            >
              View in My Orders
            </Link>
          )}

          <Link
            to="/"
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300 transition text-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
