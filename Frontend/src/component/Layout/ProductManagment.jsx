import React from "react";
import { Link } from "react-router-dom";

const ProductManagment = () => {
  const products = [
    {
      _id: "45",
      name: "Jacket",
      price: "50",
      sku: "1111111223",
    },
    {
      _id: "46",
      name: "T-Shirt",
      price: "20",
      sku: "1111111224",
    },
    {
      _id: "47",
      name: "Shoes",
      price: "80",
      sku: "1111111225",
    },
  ];
  const handleDelete=(userid)=>{
    console.log('====================================');
    console.log(userid);
    console.log('====================================');
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Price ($)</th>
            <th className="px-4 py-2 border">SKU</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item._id} className="text-center hover:bg-gray-50">
              <td className="px-4 py-2 border">{item._id}</td>
              <td className="px-4 py-2 border">{item.name}</td>
              <td className="px-4 py-2 border">{item.price}</td>
              <td className="px-4 py-2 border">{item.sku}</td>
              <td className="px-4 py-2 border space-x-2">
                <Link to={`/admin/product/${item._id}`} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                  Edit
                </Link>
                <button
                onClick={()=> handleDelete(item._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagment;
