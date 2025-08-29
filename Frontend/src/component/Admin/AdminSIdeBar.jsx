import React from 'react'
import { FaBoxOpen, FaClipboardList, FaUser } from 'react-icons/fa'
import { FaShop } from 'react-icons/fa6'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const AdminSIdeBar = () => {
const nav = useNavigate()
    const handleLogout = (e)=>{
        nav("/")
}
    return (
    <div className='p-6'>
        <div className='mb-6'>
            <Link to={'/admin'} className='text-2xl font-medium'>
            Clothify
            </Link> 
        </div>
        <h1 className='text-lg font-medium mb-6 text-center'>Admin DashBoard</h1>
         <nav className='flex-col flex space-y-4'>
            <NavLink to={'/admin/user'} 
            
            className={({isActive})=>isActive ? "bg-gray-600 text-white py-3 px-4 rounded flex items-center space-x-2":"text-gray-300 hover:bg-gray-600 py-3 px-4 rounded flex items-center space-x-2"}>
            <FaUser/>
           <span>User</span> 
            </NavLink>
            <NavLink to={'/admin/product'} 
            className={({isActive})=>isActive ? "bg-gray-600 text-white py-3 px-4 rounded flex items-center space-x-2":"text-gray-300 hover:bg-gray-600 py-3 px-4 rounded flex items-center space-x-2"}>
            <FaBoxOpen/>
           <span>Product</span> 
            </NavLink>
            <NavLink to={'/admin/order'} 
            
            className={({isActive})=>isActive ? "bg-gray-600 text-white py-3 px-4 rounded flex items-center space-x-2":"text-gray-300 hover:bg-gray-600 py-3 px-4 rounded flex items-center space-x-2"}>
            <FaClipboardList/>
           <span>Order</span> 
            </NavLink>
            <NavLink to={'/'} 
            
            className={({isActive})=>isActive ? "bg-gray-600 text-white py-3 px-4 rounded flex items-center space-x-2":"text-gray-300 hover:bg-gray-600 py-3 px-4 rounded flex items-center space-x-2"}>
            <FaShop/>
           <span>Shop</span> 
            </NavLink>
         </nav>
         <button className='mt-6 bg-red-600 text-white px-2 py-3 rounded w-full hover:bg-red-800 flex justify-center items-center' onClick={handleLogout}>
            Logout
         </button>
    </div>
  )
}

export default AdminSIdeBar