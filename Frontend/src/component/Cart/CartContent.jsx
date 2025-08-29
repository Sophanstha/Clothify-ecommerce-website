import React from "react";
import { FiTrash2 } from "react-icons/fi"; // delete icon

const products = [
  {
    id: 101,
    name: "Classic Blue T-Shirt",
    size: "M",
    quantity: 2,
    color: "Cobalt Blue",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400",
    price: 19.99,
  },
  {
    id: 102,
    name: "Black Hooded Sweatshirt",
    size: "L",
    quantity: 1,
    color: "Black",
    image: "https://images.unsplash.com/photo-1520975918318-5f7f5f79a8f7?w=400",
    price: 29.99,
  },
];

const CartContent = () => {
  // calculate total price
  const totalPrice = products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-2xl mx-auto mt-6 space-y-3">
      {/* Cart items */}
      {products.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200"
        >
          {/* Left side - image and details */}
          <div className="flex items-center gap-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-14 h-14 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-xs text-gray-600">Size: {item.size}</p>
              <p className="text-xs text-gray-600">Color: {item.color}</p>
            </div>
          </div>

          {/* Right side - price, quantity & delete */}
          <div className="flex flex-col items-end gap-2">
            <span className="text-base font-bold text-orange-600">
              ${(item.price * item.quantity).toFixed(2)}
            </span>

            <div className="flex items-center gap-2">
              {/* Quantity buttons */}
              <button className="px-2 py-1 text-sm font-bold bg-gray-200 rounded hover:bg-gray-300">
                –
              </button>
              <span className="text-sm font-medium text-gray-700">
                {item.quantity}
              </span>
              <button className="px-2 py-1 text-sm font-bold bg-gray-200 rounded hover:bg-gray-300">
                +
              </button>

              {/* Delete button */}
              <button className="p-1 text-red-500 hover:text-red-700">
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
          ${totalPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CartContent;
