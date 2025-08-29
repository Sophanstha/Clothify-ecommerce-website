import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const YouMayLike = () => {
    const product =[
  {
    "id": 1,
    "name": "Classic Denim Jacket",
    "price": 85.00,
    "image": [
      {
        "url": "https://i.pinimg.com/1200x/1c/db/0b/1cdb0b17a4242365ddab162e0bb10721.jpg",
        "altname": "Blue denim jacket on hanger"
      },
      {
        "url": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
        "altname": "Stylish denim jacket front view"
      }
    ]
  },
  {
    "id": 2,
    "name": "Casual White T-Shirt",
    "price": 25.50,
    "image": [
      {
        "url": "https://plus.unsplash.com/premium_photo-1674343821308-9c1bc5427489?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHdvbWVuJTIwZHJlc3NzfGVufDB8fDB8fHww",
        "altname": "Plain white t-shirt on hanger"
      },
      {
        "url": "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
        "altname": "White t-shirt flat lay"
      }
    ]
  },
  {
    "id": 3,
    "name": "Hooded Sweatshirt",
    "price": 60.00,
    "image": [
      {
        "url": "https://i.pinimg.com/1200x/f5/81/d0/f581d0d951ca51cee279a41ee7ee2bce.jpg",
        "altname": "Gray hoodie worn by model"
      },
      {
        "url": "https://images.unsplash.com/photo-1602810318383-e386cc2a3a39",
        "altname": "Gray hoodie front view"
      }
    ]
  },
  {
    "id": 4,
    "name": "T-Shirt",
    "price": 150.00,
    "image": [
      {
        "url": "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "altname": "Black leather jacket on hanger"
      },
      {
        "url": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
        "altname": "Black leather jacket stylish closeup"
      }
    ]
  }
]
const location = useLocation();

    return (
        <div className="flex flex-col gap-5">
          {
            location.pathname == "/"?
  <h2 className="text-center font-bold text-2xl">You May Like</h2>
          : ""}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {product.map((item) => (
      <Link key={item.id} to={`/product/${item.id}`}>
        <div className="flex flex-col gap-2 rounded-lg p-4 shadow hover:shadow-lg transition">
          {/* 👇 Fixed height container */}
          <div className="w-full h-64 bg-white overflow-hidden rounded-lg">
            <img
              src={item.image[0].url}
              alt={item.image[0].altname || item.name}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-lg font-medium">{item.name}</p>
          <p className="mt-2 text-gray-600 font-semibold">${item.price}</p>
        </div>
      </Link>
    ))}
  </div>
</div>
  )
}

export default YouMayLike