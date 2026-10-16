import React from 'react'
import hero from "../../assets/Hero.jpg";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className='relative w-full h-[calc(100vh-115px)] sm:h-[calc(100vh-95px)] min-h-[550px] overflow-hidden'>
      <img
        src={hero}
        alt="hero"
        className='w-full h-full object-cover object-center filter brightness-[0.7]'
        loading='eager'
      />        
      <div className='absolute inset-0 bg-black/40 flex items-center justify-center'>
        <div className='text-center text-white px-4 md:px-8 lg:px-16 max-w-3xl'>
          <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold mb-4 drop-shadow-md tracking-tight'>
            Welcome to Clothify
          </h1>
          <p className='text-sm sm:text-lg md:text-xl mb-6 text-gray-200 drop-shadow max-w-2xl mx-auto'>
            Discover the latest trends in fashion and shop from the comfort of your home.
          </p>
          <Link
            to='/collection/all'
            className='inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-all duration-300 hover:shadow-orange-500/40 text-sm sm:text-base cursor-pointer'
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;