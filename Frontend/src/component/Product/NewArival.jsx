import React, { useEffect, useRef, useState } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const defaultNewArrivals = [
  {
    _id: "1",
    name: "Hoodie",
    price: 2499,
    images: [
      {
        url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500",
        altText: "Hoodie",
      },
    ],
  },
  {
    _id: "2",
    name: "One Piece Dress",
    price: 3899,
    images: [
      {
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500",
        altText: "One piece",
      },
    ],
  },
  {
    _id: "3",
    name: "Linen Pants",
    price: 1999,
    images: [
      {
        url: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=500",
        altText: "Linen pants",
      },
    ],
  },
  {
    _id: "4",
    name: "Oversized Shirt",
    price: 1699,
    images: [
      {
        url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500",
        altText: "Oversized shirt",
      },
    ],
  },
];

const NewArival = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const ScrollRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDraggable, setIsDraggable] = useState(false);
  const [startX, setStartX] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const fetchArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/product/getNewLyArrival`
        );
        if (response.data?.data && response.data.data.length > 0) {
          setNewArrivals(response.data.data);
        } else {
          setNewArrivals(defaultNewArrivals);
        }
      } catch {
        setNewArrivals(defaultNewArrivals);
      }
    };
    fetchArrivals();
  }, []);

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -350 : 350;
    if (ScrollRef.current) {
      ScrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const updateScrollButton = () => {
    const container = ScrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScroll =
        container.scrollWidth > leftScroll + container.clientWidth + 1;

      setCanScrollLeft(leftScroll > 5);
      setCanScrollRight(rightScroll);
    }
  };

  useEffect(() => {
    const container = ScrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButton);
      updateScrollButton();
      return () =>
        container.removeEventListener("scroll", updateScrollButton);
    }
  }, [newArrivals]);

  const handleMouseDown = (e) => {
    setIsDraggable(true);
    setStartX(e.pageX - ScrollRef.current.offsetLeft);
    setScrollLeft(ScrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDraggable) return;
    const x = e.pageX - ScrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    ScrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => setIsDraggable(false);
  const handleMouseUp = () => setIsDraggable(false);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 relative mb-6">
        <div className="text-center">
          <span className="text-xs uppercase tracking-widest text-orange-600 font-bold bg-orange-50 px-3 py-1 rounded-full border border-orange-200 inline-block mb-2">
            Just Dropped
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Explore New Arrivals
          </h2>
          <p className="text-gray-500 text-sm mt-1 max-w-lg mx-auto">
            Discover the latest trends and styles in our new arrivals collection.
          </p>
        </div>

        {/* Scroll Buttons */}
        <div className="flex justify-end gap-2 mt-4 sm:mt-0 sm:absolute sm:right-4 sm:bottom-0">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition cursor-pointer ${
              canScrollLeft
                ? "border-gray-300 text-gray-800 hover:bg-orange-500 hover:text-white hover:border-orange-500 shadow-sm"
                : "border-gray-200 text-gray-300 cursor-not-allowed"
            }`}
          >
            <FaCaretLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition cursor-pointer ${
              canScrollRight
                ? "border-gray-300 text-gray-800 hover:bg-orange-500 hover:text-white hover:border-orange-500 shadow-sm"
                : "border-gray-200 text-gray-300 cursor-not-allowed"
            }`}
          >
            <FaCaretRight size={18} />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Container */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        ref={ScrollRef}
        className={`container mx-auto px-4 overflow-x-auto flex space-x-6 pb-4 select-none hide-scrollbar ${
          isDraggable ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {newArrivals.map((item) => {
          const imgUrl =
            item.images?.[0]?.url ||
            item.image?.url ||
            item.image ||
            "https://placehold.co/400x300?text=Product";

          return (
            <div
              key={item._id || item.id}
              className="min-w-[260px] sm:min-w-[300px] lg:min-w-[320px] relative rounded-2xl overflow-hidden shadow-md border border-gray-100 group bg-white hover:shadow-xl transition-all duration-300"
            >
              <div className="h-[340px] w-full overflow-hidden relative bg-gray-50">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  src={imgUrl}
                  alt={item.images?.[0]?.altText || item.name}
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <Link to={`/product/${item._id || item.id}`} className="block">
                    <span className="text-xs text-orange-300 font-bold uppercase tracking-wider block mb-1">
                      {item.brand || "Clothify"}
                    </span>
                    <h4 className="font-bold text-base truncate">{item.name}</h4>
                    <p className="mt-1 font-extrabold text-orange-400 text-lg">
                      Rs. {Number(item.price).toFixed(2)}
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default NewArival;
