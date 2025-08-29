import React from "react";

const OrderManagment = () => {
  const order = [{
    _id: "45612",
    user: {
      name: "john doe",
    },
    status: "processing",
    totalPrice: 1235,
  }
]

const handleSelect = (id,status)=>{
    console.log('====================================');
    console.log(status);
    console.log('====================================');
}

const handleDerived=(id,status)=>{
    console.log('====================================');
    console.log(id);
    console.log('====================================');
}

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Order Management</h2>

      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 border">Order ID</th>
            <th className="p-3 border">Customer</th>
            <th className="p-3 border">Total Price</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>
        <tbody>
            {
                order.map((order)=>(
            
          <tr
          key={order._id}
          className="text-center">
            <td className="p-3 border">{order._id}</td>
            <td className="p-3 border capitalize">{order.user.name}</td>
            <td className="p-3 border">${order.totalPrice}</td>
            <td className="p-3 border">
              <select
              onChange={(e)=>handleSelect(order._id,e.target.value)}
                defaultValue={order.status}
                className="border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="processing">Processing</option>
                <option value="cancel">Cancel</option>
                <option value="accepted">Derivered</option>
                <option value="accepted">Shipping</option>
              </select>
            </td>
            <td className="p-3 border">
              <button
              onClick={()=>handleDerived(order._id,"Deriverd")}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                Mark Order Delivered
              </button>
            </td>
          </tr>
                ))
}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagment;
