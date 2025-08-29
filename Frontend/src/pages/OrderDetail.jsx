import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const OrderDetail = () => {
  const { id } = useParams(); // ✅ Correct useParams
  const [orderDetail, setOrderDetail] = useState(null);

  useEffect(() => {
    const mockData = {
      _id: "A12345",
      createdAt: "2025-08-26T00:00:00.000Z",
      isPaid: true,
      isDelivered: false,
      paymentMethod: "PayPal",
      shippingMethod: "Standard",
      shippingAddress: {
        city: "New York",
        country: "USA",
      },
      orderItems: [
        {
          productId: "1",
          name: "Jacket",
          price: 120,
          quantity: 1,
          image: "https://picsum.photos/200",
        },
        {
          productId: "2",
          name: "Shirt",
          price: 80,
          quantity: 2,
          image: "https://picsum.photos/300",
        },
      ],
    };
    setOrderDetail(mockData);
  }, [id]);

  if (!orderDetail) return <p className="text-center mt-10">Loading...</p>;

  // calculate total
  const total = orderDetail.orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Order Details
      </h1>

      {/* ORDER INFO CARD */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Order #{orderDetail._id}
            </h2>
            <p className="text-gray-500 text-sm">
              Placed on:{" "}
              {new Date(orderDetail.createdAt).toLocaleDateString()}
            </p>
          </div>
          <span
            className={`mt-3 md:mt-0 px-4 py-2 text-sm font-medium rounded-full ${
              orderDetail.isPaid
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {orderDetail.isPaid ? "Paid" : "Pending Payment"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-gray-600">
          <p>
            <span className="font-semibold">Payment Method:</span>{" "}
            {orderDetail.paymentMethod}
          </p>
          <p>
            <span className="font-semibold">Delivery:</span>{" "}
            {orderDetail.isDelivered ? "Delivered" : "Not Delivered"}
          </p>
          <p>
            <span className="font-semibold">Shipping:</span>{" "}
            {orderDetail.shippingMethod}
          </p>
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {orderDetail.shippingAddress.city},{" "}
            {orderDetail.shippingAddress.country}
          </p>
        </div>
      </div>

      {/* ORDER ITEMS */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        Order Items
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orderDetail.orderItems.map((item) => (
          <Link to={`/product/${item.productId}`}

            key={item.productId}
            className="flex items-center bg-white shadow-md rounded-2xl p-4 hover:shadow-xl transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-28 h-28 rounded-xl object-cover mr-4"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              <p className="mt-1 font-bold text-gray-900">
                ${item.price * item.quantity}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* ORDER SUMMARY */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Order Summary
        </h2>
        <div className="flex justify-between text-gray-600 mb-2">
          <span>Subtotal</span>
          <span>${total}</span>
        </div>
        <div className="flex justify-between text-gray-600 mb-2">
          <span>Shipping</span>
          <span>$10</span>
        </div>
        <div className="flex justify-between text-gray-600 mb-2">
          <span>Tax</span>
          <span>${(total * 0.1).toFixed(2)}</span>
        </div>
        <hr className="my-3" />
        <div className="flex justify-between text-lg font-bold text-gray-800">
          <span>Total</span>
          <span>${(total + 10 + total * 0.1).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
