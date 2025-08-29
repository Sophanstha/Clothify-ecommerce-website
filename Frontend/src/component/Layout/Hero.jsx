import React from 'react'
import hero from "../../assets/Hero.jpg";
import { NavLink } from 'react-router-dom';
const Hero = () => {
  return (
    <section className='relative'>
        <img src={hero}alt="hero" className='w-full h-[200px] md:h-[400px] lg:h-[500px] object-cover
        brightness-75' loading='lazy' style={{ filter: 'brightness(0.7)' }}
         />        
    <div
    className='absolute inset-0 bg-transparent bg-opacity-40 flex items-center justify-center'
    >
        <div
        className='text-center text-white px-4 md:px-8 lg:px-16'
        >
            <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold mb-4'>Welcome to Clothify</h1>
            <p className='text-sm md:text-lg lg:text-xl mb-6'>Discover the latest trends in fashion and shop from the comfort of your home.</p>
            <NavLink to={'#'} className='bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors'>
                Shop Now
            </NavLink>
        </div>
    </div>
    
    </section>
  )
}

export default Hero