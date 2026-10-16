import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCartItemQuantity,
  deleteCartItem,
} from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import { LoadingState } from "../Common/LoadingSpinner";

const CartContent = () => {
  const dispatch = useDispatch();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart, loading } = useSelector((state) => state.cart);

  const products = cart?.products || [];
  const totalPrice = cart?.totalPrice || 0;

  const handleQuantity = (item, newQuantity) => {
    dispatch(
      updateCartItemQuantity({
        guestId,
        userId: user?._id,
        productId: item.productId,
        size: item.size,
        color: item.color,
        quantity: newQuantity,
      })
    );
  };

  const handleDelete = (item) => {
    dispatch(
      deleteCartItem({
        guestId,
        userId: user?._id,
        productId: item.productId,
        size: item.size,
        color: item.color,
      })
    );
  };

  if (loading && !products.length) {
    return (
      <div className="py-8">
        <LoadingState text="Loading cart..." subtext="Syncing your shopping bag" />
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 mb-4">Your cart is currently empty.</p>
        <Link
          to="/collection/all"
          className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-4 space-y-3">
      {/* Cart items */}
      {products.map((item, index) => (
        <div
          key={`${item.productId}-${item.size}-${item.color}-${index}`}
          className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition duration-200"
        >
          {/* Left side - image and details */}
          <div className="flex items-center gap-3">
            <img
              src={item.image || "https://placehold.co/100x100?text=No+Image"}
              alt={item.name}
              className="w-14 h-14 object-cover rounded-lg border border-gray-100"
            />
            <div>
              <Link
                to={`/product/${item.productId}`}
                className="text-base font-semibold text-gray-800 hover:text-orange-500 line-clamp-1"
              >
                {item.name}
              </Link>
              <p className="text-xs text-gray-600">Size: {item.size}</p>
              <p className="text-xs text-gray-600">Color: {item.color}</p>
            </div>
          </div>

          {/* Right side - price, quantity & delete */}
          <div className="flex flex-col items-end gap-2">
            <span className="text-base font-bold text-orange-600">
              Rs. {(item.price * item.quantity).toFixed(2)}
            </span>

            <div className="flex items-center gap-2">
              {/* Quantity buttons */}
              <button
                disabled={loading}
                onClick={() => handleQuantity(item, item.quantity - 1)}
                className="px-2 py-1 text-sm font-bold bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                –
              </button>
              <span className="text-sm font-medium text-gray-700 min-w-[20px] text-center">
                {item.quantity}
              </span>
              <button
                disabled={loading}
                onClick={() => handleQuantity(item, item.quantity + 1)}
                className="px-2 py-1 text-sm font-bold bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                +
              </button>

              {/* Delete button */}
              <button
                disabled={loading}
                onClick={() => handleDelete(item)}
                className="p-1 text-red-500 hover:text-red-700 disabled:opacity-50"
                title="Remove item"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Total price section */}
      <div className="flex justify-between items-center p-4 mt-4 bg-gray-100 rounded-xl shadow-inner">
        <span className="text-lg font-semibold text-gray-700">Total</span>
        <span className="text-lg font-bold text-orange-600">
          Rs. {totalPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CartContent;
