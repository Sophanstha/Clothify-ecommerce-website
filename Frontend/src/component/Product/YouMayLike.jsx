import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import { Carousel_001 } from "../ui/skiper47";

const fallbackProducts = [
  {
    _id: "1",
    name: "Classic Denim Jacket",
    price: 2999.0,
    images: [
      {
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        altText: "Denim jacket",
      },
    ],
  },
  {
    _id: "2",
    name: "Casual White T-Shirt",
    price: 1550.0,
    images: [
      {
        url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500",
        altText: "White t-shirt",
      },
    ],
  },
  {
    _id: "3",
    name: "Hooded Sweatshirt",
    price: 2400.0,
    images: [
      {
        url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500",
        altText: "Hoodie",
      },
    ],
  },
  {
    _id: "4",
    name: "Summer Linen Shirt",
    price: 1850.0,
    images: [
      {
        url: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500",
        altText: "Shirt",
      },
    ],
  },
  {
    _id: "5",
    name: "Vintage Bomber Jacket",
    price: 3600.0,
    images: [
      {
        url: "https://images.unsplash.com/photo-1544441893-675973e31985?w=500",
        altText: "Bomber jacket",
      },
    ],
  },
];

const YouMayLike = ({ title = "You May Also Like", subtitle = "Curated picks tailored to your style" }) => {
  const dispatch = useDispatch();
  const { products, similarProducts } = useSelector((state) => state.product);

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts({ limit: 12 }));
    }
  }, [dispatch, products]);

  const displayProducts =
    similarProducts && similarProducts.length > 0
      ? similarProducts
      : products && products.length > 0
      ? products
      : fallbackProducts;

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 text-center mb-6">
        <span className="text-xs uppercase tracking-widest text-orange-600 font-bold bg-orange-50 px-3 py-1 rounded-full border border-orange-200 inline-block mb-2">
          Recommended For You
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-500 text-sm mt-1 max-w-lg mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* Skiper47 Perspective Coverflow Carousel Component */}
      <Carousel_001
        items={displayProducts}
        showPagination={true}
        showNavigation={true}
        loop={true}
        autoplay={true}
        spaceBetween={30}
      />
    </section>
  );
};

export default YouMayLike;