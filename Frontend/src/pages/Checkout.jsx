import React, { useState } from "react";
import {toast} from "react-hot-toast"
import {useNavigate} from "react-router-dom"
const Checkout = () => {

  const product = [
    {
      id: 101,
      name: "Classic Blue T-Shirt",
      size: "M",
      quantity: 10,
      color: "Cobalt Blue",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400",
      price: 19.99,
    },
    {
      id: 102,
      name: "Black Hooded Sweatshirt",
      size: "L",
      quantity: 5,
      color: "Black",
      image:
        "https://images.unsplash.com/photo-1520975918318-5f7f5f79a8f7?w=400",
      price: 29.99,
    },
  ];
    const [shippingAddress, setShippingAddress] = useState({
    firstname: "",
    lastname: "",
    address: "",
    phone: "",
    city: "",
    postcode: "",
    country: "",
  });

  const nav =useNavigate()
  const handleFrom=(e)=>{
    e.preventDefault();
    console.log('====================================');
    console.log(shippingAddress);
    console.log('====================================');
    toast.success("submited")

    nav("/confrimOrder")


  }
  

  return (
    <div className="flex flex-col-reverse md:flex-row gap-6 p-6 max-w-6xl mx-auto">
      {/* Shipping Form */}
      <div className="flex-1 bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
        <form onSubmit={handleFrom} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
          value={"sophan@gmail.com"}
          disabled
            type="text"
            placeholder="emai"
            className="border rounded-lg p-2 w-full col-span-2"
          />
         
         
          <input
          value={shippingAddress.firstname}
          onChange={(e)=>setShippingAddress({
            ...shippingAddress,firstname :e.target.value
          })}
            type="text"
            placeholder="First Name"
            className="border rounded-lg p-2 w-full"
          />
          <input
          value={setShippingAddress.lastname}
          onChange={(e)=>setShippingAddress({
            ...shippingAddress,lastname:e.target.value
          })}

            type="text"
            placeholder="Last Name"
            className="border rounded-lg p-2 w-full"
          />
          <input
          value={shippingAddress.address}
          onChange={(e)=>setShippingAddress({
            ...shippingAddress,address:e.target.value
          })}
            type="text"
            placeholder="Address"
            className="border rounded-lg p-2 w-full col-span-2"
          />
          <input
          value={shippingAddress.city}
          onChange={(e)=>setShippingAddress({
            ...shippingAddress,city:e.target.value
          })}
            type="text"
            placeholder="City"
            className="border rounded-lg p-2 w-full"
          />
          <input
          value={setShippingAddress.postcode}
          onChange={(e)=>setShippingAddress({
            ...shippingAddress,postcode:e.target.value
          })}
            type="text"
            placeholder="Post Code"
            className="border rounded-lg p-2 w-full"
          />
          <input
          value={shippingAddress.country}
          onChange={(e)=>setShippingAddress({...shippingAddress,country:e.target.value})}
            type="text"
            placeholder="Country"
            className="border rounded-lg p-2 w-full"
          />
          <input
          value={shippingAddress.phone}
          onChange={(e)=>setShippingAddress({...shippingAddress,phone:e.target.value})}
            type="text"
            placeholder="Phone Number"
            className="border rounded-lg p-2 w-full col-span-2"
          />

          {/* Place Order Button inside form */}
          <button
        
            type="submit"
            className="col-span-2 mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Place Order
          </button>
        </form>
      </div>

      {/* Product Summary */}
      <div className="w-full md:w-1/3 bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {product.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b pb-4 last:border-none"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  Size: {item.size} | Color: {item.color}
                </p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold">${item.price}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between font-semibold text-lg">
          <span>Total:</span>
          <span>
            $
            {product.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
