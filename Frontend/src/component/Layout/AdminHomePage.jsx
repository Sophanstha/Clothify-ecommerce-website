import React from "react";
import { Link } from "react-router-dom";

const AdminHomePage = () => {
  const order = {
    _id: "12336",
    user: {
      name: "hohn doe",
    },
    totalprice: 110,
    status: "pending",
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-medium">Revenue</h2>
          <p className="text-2xl font-bold">${order.totalprice}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-medium">Total Orders</h2>
          <p className="text-2xl font-bold">1</p>
          <Link to={"/admin/order"} className="text-blue-500 text-sm">
            Manage Orders
          </Link>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-medium">Total Products</h2>
          <p className="text-2xl font-bold">0</p>
          <Link to={'/admin/product'} className="text-blue-500 text-sm">
            Manage Products
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b">ORDER ID</th>
              <th className="p-3 border-b">USER</th>
              <th className="p-3 border-b">TOTAL PRICE</th>
              <th className="p-3 border-b">STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="p-3 border-b">{order._id}</td>
              <td className="p-3 border-b">{order.user.name}</td>
              <td className="p-3 border-b">${order.totalprice}</td>
              <td className="p-3 border-b capitalize">{order.status}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHomePage;
