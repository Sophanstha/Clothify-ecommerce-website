import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import FilterBar from "../component/Layout/FilterBar";
import ShortOption from "../component/Layout/ShortOption";
import { useSearchParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import { LoadingState } from "../component/Common/LoadingSpinner";

const Collection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);

  const openFilterRef = useRef(null);
  const [isFilterBarOpen, setIsFilterOpen] = useState(false);

  const toggleFilterBar = () => {
    setIsFilterOpen(!isFilterBarOpen);
  };

  const handleClickOutSide = (e) => {
    if (
      openFilterRef.current &&
      !openFilterRef.current.contains(e.target) &&
      !e.target.closest("button")
    ) {
      setIsFilterOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  // Fetch products whenever ANY searchParam changes
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    const activeFilters = {
      gender: params.gender || "",
      category: params.category || "",
      color: params.color || "",
      size: params.size || "",
      material: params.material || "",
      brand: params.brand || "",
      minPrice: params.minPrice || "",
      maxPrice: params.maxPrice || "",
      sortBy: params.sortBy || "",
      search: params.search || "",
    };

    dispatch(fetchProducts(activeFilters));
  }, [searchParams, dispatch]);

  const searchTerm = searchParams.get("search");
  const gender = searchParams.get("gender");
  const category = searchParams.get("category");

  const clearSearch = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("search");
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Mobile filter toggle bar */}
      <div className="lg:hidden p-4 pb-0 flex justify-between items-center bg-white border-b">
        <button
          onClick={toggleFilterBar}
          className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 font-medium bg-white text-sm shadow-sm"
        >
          <FaFilter size={14} /> Filter Products
        </button>
        <span className="text-xs text-gray-500 font-medium">
          {products?.length || 0} items
        </span>
      </div>

      {/* Filter Sidebar */}
      <div
        ref={openFilterRef}
        className={`${
          isFilterBarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed z-50 inset-y-0 left-0 w-72 sm:w-80 bg-white shadow-xl overflow-y-auto transition-transform duration-300 lg:sticky lg:translate-x-0 lg:top-0 lg:h-screen lg:shadow-none lg:border-r border-gray-200`}
      >
        <div className="lg:hidden p-4 flex justify-between items-center border-b">
          <h2 className="font-bold text-gray-800">Filters</h2>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="text-gray-500 text-sm font-semibold p-1"
          >
            ✕ Close
          </button>
        </div>
        <FilterBar />
      </div>

      {/* Main Collection Content */}
      <div className="flex-grow p-4 lg:p-6 max-w-7xl">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b pb-4">
          <div>
            <h1 className="uppercase font-extrabold text-2xl lg:text-3xl text-gray-900 tracking-tight">
              {gender ? `${gender}'s Collection` : category ? category : "All Collection"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Showing {products?.length || 0} {products?.length === 1 ? "product" : "products"}
            </p>
          </div>

          {/* Sort Option */}
          <div className="w-full sm:w-auto">
            <ShortOption />
          </div>
        </div>

        {/* Active Search Badge */}
        {searchTerm && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-medium text-gray-500">Search results for:</span>
            <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full font-semibold">
              "{searchTerm}"
              <button
                onClick={clearSearch}
                className="hover:text-orange-900 cursor-pointer ml-1 text-sm leading-none"
                title="Clear search"
              >
                ×
              </button>
            </span>
          </div>
        )}

        {/* Product Grid */}
        {loading ? (
          <div className="col-span-full py-16">
            <LoadingState text="Loading collection..." subtext="Curating the latest styles for you" />
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {products.map((item) => {
              const imgUrl =
                item.images?.[0]?.url ||
                item.image?.[0]?.url ||
                item.image?.url ||
                "https://placehold.co/300x400?text=Product";
              return (
                <Link
                  key={item._id || item.id}
                  to={`/product/${item._id || item.id}`}
                  className="group"
                >
                  <div className="flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition duration-200 h-full">
                    <div className="w-full h-56 sm:h-64 bg-gray-100 overflow-hidden relative">
                      <img
                        src={imgUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      {item.countInStock <= 0 ? (
                        <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                          OUT OF STOCK
                        </span>
                      ) : item.discountPrice && item.discountPrice < item.price ? (
                        <span className="absolute top-2 left-2 bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                          SALE
                        </span>
                      ) : null}
                    </div>
                    <div className="p-3.5 flex flex-col flex-grow justify-between">
                      <div>
                        {item.brand && (
                          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-0.5">
                            {item.brand}
                          </span>
                        )}
                        <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 group-hover:text-orange-500 transition">
                          {item.name}
                        </h3>
                        {item.rating > 0 && (
                          <div className="flex items-center gap-1 mt-1 text-xs text-amber-500 font-semibold">
                            <span>★</span>
                            <span>{Number(item.rating).toFixed(1)}</span>
                            <span className="text-[10px] text-gray-400 font-normal">
                              ({item.numReview || 0})
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="mt-2.5 flex items-baseline gap-2">
                        <span className="text-base font-bold text-gray-900">
                          Rs. {item.price}
                        </span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-xs text-gray-400 line-through">
                            Rs. {item.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm my-6 max-w-lg mx-auto">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">No products found</h3>
            <p className="text-sm text-gray-500 mb-6">
              We couldn't find any products matching your current filters.
            </p>
            <button
              onClick={clearAllFilters}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition shadow-sm cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;