import React from "react";

const ConfirmOrder = () => {
  const checkout = {
    _id: 12345,
    createdDate: new Date(),
    checkoutItem: [
      {
        id: 101,
        name: "Classic Blue T-Shirt",
        size: "M",
        quantity: 2,
        color: "Black",
        image:
          "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400",
        price: 120,
      },
      {
        id: 102,
        name: "Jacket",
        size: "M",
        quantity: 1,
        color: "Black",
        image:
          "https://images.unsplash.com/photo-1520975918318-5f7f5f79a8f7?w=400",
        price: 150,
      },
    ],
    shippingAddress: {
      address: "123 Fashion Street",
      city: "New York",
      country: "USA",
    },
    paymentMethod: "PayPal",
  };

  const calculateEstimatedDelivery = (createdDate) => {
    const order = new Date(createdDate);
    order.setDate(order.getDate() + 10);
    return order.toLocaleDateString();
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg">
    <h1 className="text-center text-2xl text-green-500 font-bold mb-3">Thank you</h1>

        {/* Header */}
        <div className="flex justify-between items-start border-b pb-4">
          <div>
            <h2 className="text-lg font-semibold">
              Order ID: {checkout._id}
            </h2>
            <p className="text-sm text-gray-500">
              Order date: {checkout.createdDate.toLocaleDateString()}
            </p>
          </div>
          <h3 className="text-green-600 font-semibold">
            Estimated Delivery: {calculateEstimatedDelivery(checkout.createdDate)}
          </h3>
        </div>

        {/* Items */}
        <div className="mt-4 space-y-4">
          {checkout.checkoutItem.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded-md"
                />
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.color} | {item.size}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">${item.price}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold">Payment</h4>
            <p className="text-gray-600">{checkout.paymentMethod}</p>
          </div>
          <div>
            <h4 className="font-semibold">Delivery</h4>
            <p className="text-gray-600">
              {checkout.shippingAddress.address}, {checkout.shippingAddress.city},{" "}
              {checkout.shippingAddress.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
