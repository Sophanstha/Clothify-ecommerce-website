import React from 'react'
import { Link } from 'react-router-dom'

const Feature = () => {
  return (
    <section className='py-16 px-4 lg:px-0'>
        <div className='container mx-auto rounded-lg flex flex-col-reverse lg:flex-row items-center' style={{background:"#EBFCF2"}}>
            <div className='flex flex-col lg:w-1/2 p-8 text-center lg:text-left'>
                <h2 className='text-lg font-semibold text-gray-700'>Style and Confort</h2>
                <h2 className='text-4xl lg:text-5xl mb-6 font-bold'>
                    Apparel made for your evevyday life
                </h2>
                <p className='mb-6 text-gray-400 text-lg'>
                    "Discover high-quality, comfortable clothing that effortlessly blends fashion and function. Designed to make you look and feel great every day."
                </p>
                <Link 
                className='bg-black px-6 py-3 text-white w-1/3 hover:bg-gray-500'
                to={'collections/all'}>
                Shop Now
                </Link>
            </div>

            <div className=' w-full lg:w-1/2 '>
            <img src="https://plus.unsplash.com/premium_photo-1727943457605-4bbd7d37f5fb?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />


            </div>

        </div>

    </section>
  )
}

export default Feature