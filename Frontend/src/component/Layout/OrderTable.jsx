import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderTable = () => {
  const [mockdata, setMockdata] = useState([]);
  const nav = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      const mockOrders = [
        {
          id: "12345",
          createdAt: "2024-01-15T10:30:00.000Z",
          shippingAddress: { city: "New York", country: "USA" },
          orderItems: [
            { name: "Product 1", image: "https://picsum.photos/500/500?random=1" },
          ],
          totalPrice: 100,
          isPaid: true,
        },
        {
          id: "67890",
          createdAt: "2024-01-16T14:22:00.000Z",
          shippingAddress: { city: "London", country: "UK" },
          orderItems: [
            { name: "Product 2", image: "https://picsum.photos/500/500?random=2" },
            { name: "Product 3", image: "https://picsum.photos/500/500?random=3" },
          ],
          totalPrice: 250,
          isPaid: false,
        },
        {
          id: "54321",
          createdAt: "2024-01-17T09:15:00.000Z",
          shippingAddress: { city: "Toronto", country: "Canada" },
          orderItems: [
            { name: "Product 4", image: "https://picsum.photos/500/500?random=4" },
          ],
          totalPrice: 75,
          isPaid: true,
        },
        {
          id: "98765",
          createdAt: "2024-01-18T16:45:00.000Z",
          shippingAddress: { city: "Sydney", country: "Australia" },
          orderItems: [
            { name: "Product 5", image: "https://picsum.photos/500/500?random=5" },
            { name: "Product 6", image: "https://picsum.photos/500/500?random=6" },
            { name: "Product 7", image: "https://picsum.photos/500/500?random=7" },
          ],
          totalPrice: 420,
          isPaid: true,
        },
        {
          id: "13579",
          createdAt: "2024-01-19T11:30:00.000Z",
          shippingAddress: { city: "Berlin", country: "Germany" },
          orderItems: [
            { name: "Product 8", image: "https://picsum.photos/500/500?random=8" },
          ],
          totalPrice: 199,
          isPaid: false,
        },
      ];
      setMockdata(mockOrders);
    }, 1000);
  }, []);

  const handlenav = (orderid)=>{
    nav(`/order/${orderid}`)
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <h2 className="text-xl font-semibold p-4">My Orders</h2>
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Image</th>
            <th className="p-3">Order ID</th>
            <th className="p-3">Created</th>
            <th className="p-3">Shipping Address</th>
            <th className="p-3">Items</th>
            <th className="p-3">Price</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {mockdata.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="p-3" onClick={()=>handlenav(order.id)}>
                <img
                  src={order.orderItems[0].image}
                  alt={order.orderItems[0].name}
                  className="w-12 h-12 rounded-md object-cover"
                />
              </td>
              <td className="p-3 font-semibold text-gray-800">#{order.id}</td>
              <td className="p-3 text-gray-600">
                {new Date(order.createdAt).toLocaleString()}
              </td>
              <td className="p-3 text-gray-600">
                {order.shippingAddress.city}, {order.shippingAddress.country}
              </td>
              <td className="p-3 text-gray-600">{order.orderItems.length}</td>
              <td className="p-3 text-gray-800">${order.totalPrice}</td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    order.isPaid
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Pending"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
