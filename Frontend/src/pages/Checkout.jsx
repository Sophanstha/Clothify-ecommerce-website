import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { LoadingSpinner } from "../component/Common/LoadingSpinner";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const cartProducts = cart?.products || [];
  const totalPrice = cart?.totalPrice || 0;

  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    firstname: user?.name ? user.name.split(" ")[0] : "",
    lastname: user?.name ? user.name.split(" ").slice(1).join(" ") : "",
    address: user?.address?.address || "",
    phone: user?.phone || "",
    city: user?.address?.city || "",
    postcode: user?.address?.postalCode || "",
    country: user?.address?.country || "",
  });

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to proceed with checkout");
      navigate("/login");
      return;
    }

    if (!cartProducts.length) {
      toast.error("Your cart is empty");
      return;
    }

    if (
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.country ||
      !shippingAddress.phone
    ) {
      toast.error("Please fill in all required shipping fields");
      return;
    }

    setLoading(true);
    try {
      const token =
        localStorage.getItem("userToken") || localStorage.getItem("token");

      const checkoutPayload = {
        checkoutItem: cartProducts.map((p) => ({
          productId: p.productId,
          name: p.name,
          image: p.image || p.imageUrl || (p.images && p.images[0]?.url) || "https://placehold.co/100x100?text=Product",
          price: p.price,
          size: p.size,
          color: p.color,
          quantity: p.quantity,
        })),
        shippingAddress: {
          address: `${shippingAddress.firstname} ${shippingAddress.lastname}, ${shippingAddress.address}`,
          city: shippingAddress.city,
          postalCode: shippingAddress.postcode || "00000",
          country: shippingAddress.country,
        },
        totalPrice,
        paymentMethod,
        payMentDetail: {
          method: paymentMethod,
          phone: shippingAddress.phone,
        },
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/order/checkout`,
        checkoutPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Checkout created successfully!");
      navigate("/confrimOrder", {
        state: { checkout: response.data },
      });
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(
        error.response?.data?.message || "Failed to create checkout"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!cartProducts.length) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white shadow-md rounded-2xl text-center">
        <h2 className="text-2xl font-bold mb-3 text-gray-800">
          Your Cart is Empty
        </h2>
        <p className="text-gray-500 mb-6">
          Add items to your cart before checking out.
        </p>
        <Link
          to="/collection/all"
          className="inline-block bg-orange-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-orange-600 transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-6 p-6 max-w-6xl mx-auto">
      {/* Shipping Form */}
      <div className="flex-1 bg-white shadow-md rounded-2xl p-6 border border-gray-100">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Shipping & Contact Details
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Email Address
            </label>
            <input
              value={user?.email || "Guest Checkout"}
              disabled
              type="text"
              className="border bg-gray-50 rounded-lg p-2.5 w-full text-gray-600 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              First Name *
            </label>
            <input
              required
              value={shippingAddress.firstname}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  firstname: e.target.value,
                })
              }
              type="text"
              placeholder="First Name"
              className="border rounded-lg p-2.5 w-full text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Last Name *
            </label>
            <input
              required
              value={shippingAddress.lastname}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  lastname: e.target.value,
                })
              }
              type="text"
              placeholder="Last Name"
              className="border rounded-lg p-2.5 w-full text-sm"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Street Address *
            </label>
            <input
              required
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              type="text"
              placeholder="Street Address, Apt, Suite"
              className="border rounded-lg p-2.5 w-full text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              City *
            </label>
            <input
              required
              value={shippingAddress.city}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  city: e.target.value,
                })
              }
              type="text"
              placeholder="City"
              className="border rounded-lg p-2.5 w-full text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Postal Code
            </label>
            <input
              value={shippingAddress.postcode}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  postcode: e.target.value,
                })
              }
              type="text"
              placeholder="Postal Code"
              className="border rounded-lg p-2.5 w-full text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Country *
            </label>
            <input
              required
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              type="text"
              placeholder="Country"
              className="border rounded-lg p-2.5 w-full text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Phone Number *
            </label>
            <input
              required
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              type="text"
              placeholder="Phone Number"
              className="border rounded-lg p-2.5 w-full text-sm"
            />
          </div>

          <div className="col-span-2 mt-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="border rounded-lg p-2.5 w-full text-sm bg-white"
            >
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="PayPal">PayPal</option>
              <option value="Card">Debit / Credit Card</option>
            </select>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="col-span-2 mt-4 w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" color="white" /> Processing Order...
              </>
            ) : (
              "Place Order"
            )}
          </button>
        </form>
      </div>

      {/* Product Summary */}
      <div className="w-full md:w-1/3 bg-white shadow-md rounded-2xl p-6 border border-gray-100 h-fit">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {cartProducts.map((item, index) => (
            <div
              key={`${item.productId}-${index}`}
              className="flex items-center gap-4 border-b pb-4 last:border-none"
            >
              <img
                src={item.image || "https://placehold.co/80x80"}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg border"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm text-gray-800 truncate">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500">
                  Size: {item.size} | Color: {item.color}
                </p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold text-sm text-gray-800">
                Rs. {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t flex justify-between font-bold text-lg text-gray-900">
          <span>Total:</span>
          <span className="text-orange-600">Rs. {totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
