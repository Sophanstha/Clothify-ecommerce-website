import React from 'react'
import { FaShoppingBag} from "react-icons/fa";
import { HiMiniArrowPathRoundedSquare } from "react-icons/hi2";
import { FaRegCreditCard } from "react-icons/fa";
const FeatureSection = () => {
  return (
    <section className='py-16 px-4 bg-white'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 text-center gap-8'>
          <div className='flex flex-col items-center'>
            <div className='p-4 rounded-lg mb-4'>
            <FaShoppingBag />
            </div>
            <h1 className='tracking-tight mb-2'>Free international Shopping</h1>
            <p className='text-gray-600 tracking-tighter text-sm'>on all order over $1000.00</p>
          </div>
          <div className='flex flex-col items-center'>
            <div className='p-4 rounded-lg mb-4'>
            <HiMiniArrowPathRoundedSquare />
            </div>
            <h1 className='tracking-tight mb-2'>45 DAYS RETRUN</h1>
            <p className='text-gray-600 tracking-tighter text-sm'>
              Money Back Gurantee
            </p>
          </div>
          <div className='flex flex-col items-center'>
            <div className='p-4 rounded-lg mb-4'>
            <FaRegCreditCard />
            </div>
            <h1 className='tracking-tight mb-2'>SECURE CHECKOUT</h1>
            <p className='text-gray-600 tracking-tighter text-sm'>
              100% secure checkout
            </p>
          </div>

        </div>
    </section>
  )
}

export default FeatureSection