import React, { useEffect, useRef, useState } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const NewArival = () => {
  const newA = [
    {
      id: 1,
      name: "Hoodie",
      price: "99.99",
      image: {
        url: "https://i.pinimg.com/1200x/6a/58/0c/6a580cc3c6800bdc4cb02ba38e83e20d.jpg",
        altName: "Black wireless headphones on a table",
      },
    },
    {
      id: 2,
      name: "one piece",
      price: "699.99",
      image: {
        url: "https://i.pinimg.com/1200x/74/35/f6/7435f69eb9fff585fb7e10e02d6c42e6.jpg",
        altName: "Modern smartphone with a glowing screen",
      },
    },
    {
      id: 3,
      name: "liner paints",
      price: "1299.99",
      image: {
        url: "https://i.pinimg.com/736x/15/d2/11/15d2115fa87dbf76da27339a2151efc4.jpg",
        altName: "Gaming laptop with RGB keyboard",
      },
    },
    {
      id: 4,
      name: "overSize Shirts",
      price: "89.99",
      image: {
        url: "https://i.pinimg.com/736x/0a/cc/ee/0accee0529ac648adafca5446a72568d.jpg",
        altName: "Pair of blue sports running shoes",
      },
    },
    {
      id: 5,
      name: "down",
      price: "199.99",
      image: {
        url: "https://i.pinimg.com/1200x/51/cf/69/51cf69795832e13d243fb64f3b0e5a61.jpg",
        altName: "Black smartwatch with digital display",
      },
    },
  ];

  const ScrollRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDraggable, setIsDraggable] = useState(false);
  const [startX, setStartX] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    ScrollRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const updateScrollButton = () => {
    const container = ScrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScroll =
        container.scrollWidth > leftScroll + container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScroll);

      console.log({
        scrollLeft: container.scrollLeft,
        clientWidth: container.clientWidth,
        containerScrollWidth: container.scrollWidth,
        offsetLeft: ScrollRef.current.offsetLeft,
      });
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
  }, []);

  const handleMouseDown = (e) => {
    setIsDraggable(true);
    setStartX(e.pageX - ScrollRef.current.offsetLeft);
    setScrollLeft(ScrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDraggable) return;
    const x = e.pageX - ScrollRef.current.offsetLeft;
    const walk = x - startX;
    ScrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => setIsDraggable(false);
  const handleMouseUp = () => setIsDraggable(false);

  return (
    <div>
      <section className="container m-auto text-center relative mb-10">
        <h2 className="text-3xl font-bold mb-4">Explore new arrivals</h2>
        <p className="text-gray-600 mb-6">
          Discover the latest trends and styles in our new arrivals section.
        </p>

        {/* scroll buttons */}
        <div className="absolute right-0 flex space-x-2 bottom-[-30px]">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded border ${
              canScrollLeft
                ? "text-black"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            <FaCaretLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded border ${
              canScrollRight
                ? "text-black"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            <FaCaretRight className="text-2xl" />
          </button>
        </div>
      </section>

      {/* scrollable container */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        ref={ScrollRef}
        className={`container m-auto overflow-x-auto flex space-x-6 relative hide-scrollbar ${
          isDraggable ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {newA.map((item) => (
          <div
            key={item.id}
            className="min-w-full sm:min-w-1/2 lg:min-w-[30%] relative "
          >
            <img
              className="w-full rounded-lg h-[300px] object-cover object-center"
              src={item.image.url}
              alt={item.image.altName}
              draggable={false}
            />
            <div className="absolute bottom-0 left-0 bg-black/50 backdrop-blur-md text-white p-4 rounded-b-lg">
              <Link to={`product/${item.id}`} className="block">
                <h4 className="font-medium">{item.name}</h4>
                <p className="mt-1">${item.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArival;
