import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const Carousel_001 = ({
  items = [],
  images = [],
  className,
  showPagination = true,
  showNavigation = true,
  loop = true,
  autoplay = true,
  spaceBetween = 30,
}) => {
  // Support either raw images or full product items
  const displayItems =
    items.length > 0
      ? items
      : images.map((img, i) => ({
          _id: i,
          name: img.alt || "Product",
          image: img.src,
          price: 49.99,
        }));

  const customCss = `
    .skiper47-carousel {
      padding-top: 20px !important;
      padding-bottom: 50px !important;
    }
    .skiper47-carousel .swiper-pagination-bullet {
      background: #ea580c !important;
      opacity: 0.4;
      width: 10px;
      height: 10px;
      transition: all 0.3s ease;
    }
    .skiper47-carousel .swiper-pagination-bullet-active {
      opacity: 1 !important;
      width: 24px !important;
      border-radius: 9999px !important;
      background: #ea580c !important;
    }
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("w-full relative max-w-6xl mx-auto px-4", className)}
    >
      <style>{customCss}</style>

      <Swiper
        spaceBetween={spaceBetween}
        autoplay={
          autoplay
            ? {
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={loop}
        slidesPerView="auto"
        breakpoints={{
          320: {
            slidesPerView: 1.2,
            spaceBetween: 15,
          },
          640: {
            slidesPerView: 2.1,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 35,
          },
        }}
        coverflowEffect={{
          rotate: 0,
          slideShadows: false,
          stretch: 0,
          depth: 120,
          modifier: 2,
        }}
        pagination={
          showPagination
            ? {
                clickable: true,
              }
            : false
        }
        navigation={
          showNavigation
            ? {
                nextEl: ".skiper-next-btn",
                prevEl: ".skiper-prev-btn",
              }
            : false
        }
        className="skiper47-carousel"
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
      >
        {displayItems.map((item, index) => {
          const imgUrl =
            item.images?.[0]?.url ||
            item.image?.[0]?.url ||
            item.image?.url ||
            item.image ||
            item.src ||
            "https://placehold.co/400x500?text=Fashion";

          return (
            <SwiperSlide
              key={item._id || index}
              className="!w-[280px] sm:!w-[320px] rounded-2xl overflow-hidden transition-all duration-300"
            >
              <Link
                to={item._id ? `/product/${item._id}` : "/collection/all"}
                className="block group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition duration-300"
              >
                <div className="h-[340px] w-full overflow-hidden relative bg-gray-50">
                  <img
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    src={imgUrl}
                    alt={item.name || item.alt || "Product"}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    {item.brand && (
                      <span className="text-[11px] font-bold uppercase tracking-wider text-orange-300 block mb-1">
                        {item.brand}
                      </span>
                    )}
                    <h3 className="font-bold text-lg leading-snug line-clamp-1 drop-shadow-sm">
                      {item.name || item.alt}
                    </h3>
                    {item.price !== undefined && (
                      <p className="mt-1.5 font-extrabold text-orange-400 text-base drop-shadow-sm">
                        Rs. {item.price}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}

        {showNavigation && (
          <>
            <button
              aria-label="Previous slide"
              className="skiper-prev-btn absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-orange-500 text-gray-800 hover:text-white rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-colors backdrop-blur-sm"
            >
              <FaChevronLeft size={16} />
            </button>
            <button
              aria-label="Next slide"
              className="skiper-next-btn absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-orange-500 text-gray-800 hover:text-white rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-colors backdrop-blur-sm"
            >
              <FaChevronRight size={16} />
            </button>
          </>
        )}
      </Swiper>
    </motion.div>
  );
};

export default Carousel_001;
