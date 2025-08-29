import React from 'react'
import { IoMdClose } from "react-icons/io";
import CartContent from './CartContent';
import { useNavigate } from 'react-router-dom';
const CartDrawer = ({cartopen,toogleOpen}) => {
    const nav = useNavigate();

    const handleCheckout = ()=>{
        nav("/checkout")
        toogleOpen()
    }
  return (
    <div
    className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${cartopen ? 'translate-x-0' : 'translate-x-full'}`}
    >
        {/* close button */}
        <div className='flex justify-end p-4'>
            <button onClick={toogleOpen} className='focus:outline-none'>
                <IoMdClose className='h-6 w-6 text-gray-500' />
            </button>
        </div>
        {/* Cart Content */}
        <div
        className='flex-grow p-4 overflow-y-auto '
        >
            <h2 className='text-xl font-bold mb-4'>Your Cart</h2>
            {/* Cart Items will go here */}
            <CartContent/>
        </div>
        {/* check out button fixed at bootom */}
        <div
        className='sticky bottom-0 '
        >
            <button
            onClick={handleCheckout}
            className='w-full bg-orange-500 rounded-b-lg text-white py-2 font-bold hover:bg-orange-600 transition-colors'>
                CheckOut
            </button>
            <p className='text-sm text-gray-500 mt-2'>
                Shipping ,discout and taxes calculated at checkout.
            </p>
        </div>










    </div>
  )
}

export default CartDrawer