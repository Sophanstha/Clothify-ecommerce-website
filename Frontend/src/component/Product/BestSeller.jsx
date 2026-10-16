import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addToCart } from "../../redux/slices/cartSlice";
import { LoadingSpinner, LoadingState } from "../Common/LoadingSpinner";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaCheckCircle,
  FaBoxOpen,
} from "react-icons/fa";
import { HiOutlineChatAlt2 } from "react-icons/hi";

const fallbackProduct = {
  _id: "default_bestseller",
  name: "Classic Denim Jacket",
  price: 2850,
  originalPrice: 3500,
  countInStock: 8,
  rating: 4.8,
  numReview: 12,
  description:
    "A timeless denim jacket perfect for casual outings and layering. Tailored with premium raw denim and durable reinforced stitching.",
  brand: "Clothify Signature",
  material: "100% Organic Denim",
  sizes: ["S", "M", "L", "XL"],
  colors: ["Blue", "Black"],
  reviews: [
    {
      _id: "rev_1",
      name: "Marcus Vance",
      rating: 5,
      comment: "Outstanding quality and perfect fit! The denim feels substantial and well-crafted.",
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    },
    {
      _id: "rev_2",
      name: "Sophia Chen",
      rating: 4.5,
      comment: "Super stylish jacket. Sleeves are just the right length. Would recommend sizing up if layering with thick hoodies.",
      createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    },
  ],
  images: [
    {
      url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
      altText: "Classic blue denim jacket",
    },
    {
      url: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600",
      altText: "Black denim jacket",
    },
  ],
};

const renderStarIcons = (rating = 0, size = 16) => {
  const stars = [];
  const normalized = Number(rating) || 0;
  for (let i = 1; i <= 5; i++) {
    if (normalized >= i) {
      stars.push(<FaStar key={i} className="text-amber-400" size={size} />);
    } else if (normalized >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-amber-400" size={size} />);
    } else {
      stars.push(<FaRegStar key={i} className="text-gray-300" size={size} />);
    }
  }
  return stars;
};

const BestSeller = ({ trendingSlot = null }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, guestId } = useSelector((state) => state.auth);

  const [product, setProduct] = useState(fallbackProduct);
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  // Review state
  const [reviewRating, setReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        let endpoint = `${import.meta.env.VITE_BACKEND_URL}/product/bestSeller`;
        if (id) {
          endpoint = `${import.meta.env.VITE_BACKEND_URL}/product/singleProduct/${id}`;
        }
        const response = await axios.get(endpoint);
        const data = response.data?.data;
        if (data && data.name) {
          setProduct(data);
          if (data.images && data.images.length > 0) {
            setMainImage(data.images[0].url);
          }
          if (data.colors && data.colors.length > 0) {
            setSelectedColor(data.colors[0]);
          }
          if (data.sizes && data.sizes.length > 0) {
            setSelectedSize(data.sizes[0]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setMainImage(product.images[0].url);
    }
    if (product?.colors?.length > 0 && !selectedColor) {
      setSelectedColor(product.colors[0]);
    }
    if (product?.sizes?.length > 0 && !selectedSize) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  const countInStock =
    product.countInStock !== undefined ? Number(product.countInStock) : 10;

  const handleQuantity = (value) => {
    if (countInStock <= 0) return;

    if (value === "minus") {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    } else if (value === "plus") {
      if (quantity < countInStock) {
        setQuantity((prev) => prev + 1);
      } else {
        toast.error(`Only ${countInStock} item(s) left in stock`);
      }
    }
  };

  const handleAddCart = async () => {
    if (!product?._id) return;
    if (countInStock <= 0) {
      toast.error("This product is currently out of stock");
      return;
    }
    const sizeToUse = selectedSize || product.sizes?.[0] || "M";
    const colorToUse = selectedColor || product.colors?.[0] || "Black";

    try {
      setAddingToCart(true);
      await dispatch(
        addToCart({
          productId: product._id,
          size: sizeToUse,
          quantity,
          color: colorToUse,
          guestId,
          userId: user?._id,
        })
      ).unwrap();
      toast.success("Added to cart!");
    } catch (err) {
      toast.error(err || "Failed to add to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  // Submit product review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to write a review");
      return;
    }

    if (!reviewComment.trim()) {
      toast.error("Please share your feedback in the comment");
      return;
    }

    try {
      setSubmittingReview(true);
      const token =
        localStorage.getItem("userToken") || localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/product/${product._id}/reviews`,
        {
          rating: reviewRating,
          comment: reviewComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data?.message || "Review submitted successfully!");
      if (response.data?.data) {
        setProduct(response.data.data);
      }
      setReviewComment("");
      setReviewRating(5);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to submit review. Try again."
      );
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading && id) {
    return (
      <div className="py-24">
        <LoadingState
          text="Loading product details..."
          subtext="Retrieving gallery, stock status, and customer reviews"
        />
      </div>
    );
  }

  const reviewsList = product.reviews || [];
  const totalReviews = product.numReview || reviewsList.length || 0;
  const averageRating = Number(product.rating || 0).toFixed(1);

  // Calculate rating percentage bars
  const ratingDistribution = [5, 4, 3, 2, 1].map((starLevel) => {
    const count = reviewsList.filter(
      (r) => Math.round(Number(r.rating)) === starLevel
    ).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { starLevel, count, percentage };
  });

  return (
    <div className="py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main Product Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left thumbnail list (desktop) */}
            <div className="hidden md:flex flex-col space-y-4">
              {product.images?.map((image, index) => (
                <img
                  key={index}
                  className={`w-20 h-20 rounded-xl border object-cover cursor-pointer transition ${
                    mainImage === image.url
                      ? "border-orange-500 ring-2 ring-orange-500/30 scale-105"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                  src={image.url}
                  alt={image.altText || "product thumb"}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="md:w-1/2 flex items-center justify-center bg-gray-50 rounded-2xl overflow-hidden p-2 border border-gray-100">
              <img
                className="w-full h-[420px] object-contain rounded-xl hover:scale-105 transition duration-500"
                src={
                  mainImage ||
                  product.images?.[0]?.url ||
                  "https://placehold.co/400x400"
                }
                alt={product.name}
              />
            </div>

            {/* Mobile thumbnails */}
            <div className="md:hidden flex overflow-x-auto space-x-2 my-2 pb-2">
              {product.images?.map((image, index) => (
                <img
                  key={index}
                  className={`w-16 h-16 rounded-lg border object-cover cursor-pointer flex-shrink-0 ${
                    mainImage === image.url ? "border-orange-500" : ""
                  }`}
                  src={image.url}
                  alt={image.altText || "product"}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>

            {/* Product Details Right Column */}
            <div className="w-full md:w-1/2 flex flex-col justify-between">
              <div>
                {/* Brand & Stock Status Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md">
                    {product.brand || "Clothify"}
                  </span>

                  {/* Stock validation badge */}
                  {countInStock <= 0 ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                      Out of Stock
                    </span>
                  ) : countInStock <= 5 ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      Low Stock: Only {countInStock} left!
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      In Stock ({countInStock} available)
                    </span>
                  )}
                </div>

                <h1 className="font-extrabold text-2xl sm:text-3xl text-gray-900 leading-tight">
                  {product.name}
                </h1>

                {/* Rating stars & review counter */}
                <div className="flex items-center gap-2 mt-2 mb-4">
                  <div className="flex items-center">
                    {renderStarIcons(product.rating || 0, 16)}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    {averageRating}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
                  </span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 my-3">
                  <span className="text-3xl font-extrabold text-orange-600">
                    Rs. {product.price}
                  </span>
                  {product.originalPrice &&
                    product.originalPrice > product.price && (
                      <span className="text-lg line-through text-gray-400">
                        Rs. {product.originalPrice}
                      </span>
                    )}
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed my-3">
                  {product.description}
                </p>

                {/* Colors */}
                {product.colors && product.colors.length > 0 && (
                  <div className="my-4">
                    <p className="mb-2 text-xs font-semibold uppercase text-gray-500 tracking-wider">
                      Color: <span className="text-gray-900 font-bold">{selectedColor}</span>
                    </p>
                    <div className="flex gap-2">
                      {product.colors.map((color) => (
                        <button
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1.5 text-xs rounded-lg border capitalize font-medium transition ${
                            selectedColor === color
                              ? "border-orange-500 bg-orange-500 text-white shadow-sm"
                              : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                          }`}
                          key={color}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="my-4">
                    <p className="mb-2 text-xs font-semibold uppercase text-gray-500 tracking-wider">
                      Size: <span className="text-gray-900 font-bold">{selectedSize}</span>
                    </p>
                    <div className="flex gap-2">
                      {product.sizes.map((size) => (
                        <button
                          type="button"
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`border px-3.5 py-1.5 font-semibold text-xs rounded-lg transition ${
                            size === selectedSize
                              ? "border-orange-500 bg-orange-500 text-white shadow-sm"
                              : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="my-4">
                  <p className="text-xs font-semibold uppercase text-gray-500 tracking-wider mb-2">
                    Quantity:
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantity("minus")}
                      disabled={countInStock <= 0 || quantity <= 1}
                      className="w-9 h-9 flex items-center justify-center font-bold bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-700 disabled:opacity-40 transition"
                    >
                      –
                    </button>
                    <span className="font-extrabold text-base min-w-[28px] text-center text-gray-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantity("plus")}
                      disabled={countInStock <= 0 || quantity >= countInStock}
                      className="w-9 h-9 flex items-center justify-center font-bold bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-700 disabled:opacity-40 transition"
                    >
                      +
                    </button>
                    <span className="text-xs text-gray-400 ml-2">
                      {countInStock > 0
                        ? `Max ${countInStock} per order`
                        : "Out of stock"}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddCart}
                  disabled={addingToCart || countInStock <= 0}
                  className={`w-full font-bold rounded-xl py-3.5 mt-2 transition shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                    countInStock <= 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                      : "bg-orange-600 hover:bg-orange-700 text-white hover:shadow-lg shadow-orange-500/20"
                  }`}
                >
                  {countInStock <= 0 ? (
                    <span className="flex items-center gap-2">
                      <FaBoxOpen className="text-lg" /> OUT OF STOCK
                    </span>
                  ) : addingToCart ? (
                    <>
                      <LoadingSpinner size="sm" color="white" /> ADDING TO CART...
                    </>
                  ) : (
                    "ADD TO CART"
                  )}
                </button>
              </div>

              {/* Characteristics */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <h3 className="font-semibold text-gray-800 text-xs uppercase tracking-wider mb-2">
                  Product Details
                </h3>
                <table className="w-full text-xs text-gray-600">
                  <tbody>
                    {product.brand && (
                      <tr className="border-b border-gray-50">
                        <td className="py-1.5 font-medium text-gray-400 w-28">
                          Brand
                        </td>
                        <td className="py-1.5 text-gray-800 font-medium">
                          {product.brand}
                        </td>
                      </tr>
                    )}
                    {product.material && (
                      <tr className="border-b border-gray-50">
                        <td className="py-1.5 font-medium text-gray-400">
                          Material
                        </td>
                        <td className="py-1.5 text-gray-800 font-medium">
                          {product.material}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td className="py-1.5 font-medium text-gray-400">
                        Availability
                      </td>
                      <td className="py-1.5">
                        {countInStock > 0 ? (
                          <span className="text-emerald-600 font-medium">
                            Ready to ship ({countInStock} in stock)
                          </span>
                        ) : (
                          <span className="text-red-500 font-medium">
                            Currently Backordered
                          </span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Slot (Rendered above Customer Reviews) */}
      {trendingSlot}

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Reviews & Ratings Section (Option C) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2.5">
                <HiOutlineChatAlt2 className="text-orange-500" />
                Customer Reviews & Ratings
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Real customer feedback, ratings, and fit impressions
              </p>
            </div>
          </div>

          {/* Rating Summary + Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-8 pb-8 border-b border-gray-100">
            {/* Big Rating Box */}
            <div className="flex flex-col items-center justify-center bg-orange-50/50 rounded-2xl p-6 border border-orange-100 text-center">
              <span className="text-5xl font-black text-gray-900">
                {averageRating}
              </span>
              <div className="flex items-center my-2">
                {renderStarIcons(product.rating || 0, 20)}
              </div>
              <p className="text-xs text-gray-500 font-medium">
                Based on {totalReviews} verified {totalReviews === 1 ? "review" : "reviews"}
              </p>
            </div>

            {/* Distribution Bars */}
            <div className="md:col-span-2 space-y-2 flex flex-col justify-center">
              {ratingDistribution.map((item) => (
                <div key={item.starLevel} className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1 w-12 text-gray-600 font-medium">
                    <span>{item.starLevel}</span>
                    <FaStar className="text-amber-400 text-xs" />
                  </div>
                  <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-400 to-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-gray-400 font-mono">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Write a Review Section */}
          <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-100 mb-10">
            <h3 className="text-base font-bold text-gray-800 mb-1">
              Write a Product Review
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Have you purchased this item? Share your honest review to help other shoppers.
            </p>

            {user ? (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                {/* Interactive Star Picker */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1.5">
                    Your Rating:
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="cursor-pointer transition transform hover:scale-125 focus:outline-none"
                      >
                        <FaStar
                          size={24}
                          className={`${
                            (hoverRating || reviewRating) >= star
                              ? "text-amber-400"
                              : "text-gray-300"
                          } transition-colors`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-xs font-bold text-gray-700">
                      {hoverRating || reviewRating} / 5 Stars
                    </span>
                  </div>
                </div>

                {/* Comment Textarea */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1.5">
                    Your Review:
                  </label>
                  <textarea
                    rows={3}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Tell us about the fabric, sizing, comfort, and how it holds up..."
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-sm transition flex items-center gap-2 disabled:opacity-60 cursor-pointer"
                  >
                    {submittingReview ? (
                      <>
                        <LoadingSpinner size="sm" color="white" /> Submitting...
                      </>
                    ) : (
                      "Submit Review"
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-xl border border-gray-200 gap-3">
                <span className="text-xs text-gray-600">
                  You must be logged in to Clothify to leave a customer rating.
                </span>
                <Link
                  to="/login"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs px-4 py-2 rounded-lg transition shadow-sm"
                >
                  Log In to Review
                </Link>
              </div>
            )}
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-800 mb-4">
              All Customer Reviews ({reviewsList.length})
            </h3>

            {reviewsList.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <FaRegStar className="text-3xl text-gray-300 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-600">
                  No reviews yet for this product.
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Be the first person to share your experience!
                </p>
              </div>
            ) : (
              reviewsList.map((review, idx) => (
                <div
                  key={review._id || idx}
                  className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-orange-100 transition space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-bold text-xs flex items-center justify-center">
                        {review.name ? review.name[0].toUpperCase() : "U"}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-gray-900">
                            {review.name || "Customer"}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                            <FaCheckCircle className="text-[9px]" /> Verified
                          </span>
                        </div>
                        <span className="text-[11px] text-gray-400">
                          {review.createdAt
                            ? new Date(review.createdAt).toLocaleDateString(
                                undefined,
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )
                            : "Recently"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center">
                      {renderStarIcons(review.rating, 14)}
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed pl-10">
                    {review.comment}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSeller;