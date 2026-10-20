import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const GenderCollection = () => {
  return (
    <section className="py-12 sm:py-16 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Men's Collection Card */}
          <Link
            to="/collection/all?gender=Men"
            className="group relative h-[420px] sm:h-[460px] rounded-2xl overflow-hidden block shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
            aria-label="View Men's Collection"
          >
            <img
              src="https://i.pinimg.com/1200x/71/11/bd/7111bde86a43351904b8f6fc92224596.jpg"
              alt="Men Collection"
              className="w-full h-full object-cover object-top sm:object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent transition-opacity group-hover:opacity-90" />

            {/* Content Overlay Box */}
            <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-black/60 backdrop-blur-md p-5 sm:p-6 rounded-xl border border-white/15 transition-all duration-300 group-hover:bg-black/75 group-hover:border-orange-500/40">
              <span className="text-xs uppercase font-semibold tracking-wider text-orange-400 block mb-1">
                Explore Wardrobe
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white tracking-tight group-hover:text-orange-400 transition-colors">
                Men Collection
              </h2>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-200 group-hover:text-white group-hover:gap-3 transition-all">
                <span className="underline-offset-4 group-hover:underline">Shop Now</span>
                <FaArrowRight className="text-xs text-orange-400 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Women's Collection Card */}
          <Link
            to="/collection/all?gender=Women"
            className="group relative h-[420px] sm:h-[460px] rounded-2xl overflow-hidden block shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
            aria-label="View Women's Collection"
          >
            <img
              src="https://i.pinimg.com/736x/1c/f5/5b/1cf55b40379e86f92442c62f3e48c576.jpg"
              alt="Women Collection"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent transition-opacity group-hover:opacity-90" />

            {/* Content Overlay Box */}
            <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-black/60 backdrop-blur-md p-5 sm:p-6 rounded-xl border border-white/15 transition-all duration-300 group-hover:bg-black/75 group-hover:border-orange-500/40">
              <span className="text-xs uppercase font-semibold tracking-wider text-orange-400 block mb-1">
                Explore Wardrobe
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white tracking-tight group-hover:text-orange-400 transition-colors">
                Women Collection
              </h2>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-200 group-hover:text-white group-hover:gap-3 transition-all">
                <span className="underline-offset-4 group-hover:underline">Shop Now</span>
                <FaArrowRight className="text-xs text-orange-400 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GenderCollection;
