import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaArrowLeft, FaImage, FaTrash } from "react-icons/fa";
import { LoadingSpinner, LoadingState } from "../Common/LoadingSpinner";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    discountPrice: 0,
    sku: "",
    countInStock: 0,
    brand: "",
    category: "",
    sizes: "",
    colors: "",
    material: "",
    gender: "Unisex",
    images: [],
  });

  const token = localStorage.getItem("userToken") || localStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/product/singleProduct/${id}`
        );
        const p = res.data?.product || res.data?.data || res.data;
        if (p) {
          setProductData({
            name: p.name || "",
            description: p.description || "",
            price: p.price || 0,
            discountPrice: p.discountPrice || 0,
            sku: p.sku || "",
            countInStock: p.countInStock || 0,
            brand: p.brand || "",
            category: p.category || "",
            sizes: Array.isArray(p.sizes) ? p.sizes.join(", ") : p.sizes || "",
            colors: Array.isArray(p.colors) ? p.colors.join(", ") : p.colors || "",
            material: p.material || "",
            gender: p.gender
              ? p.gender.charAt(0).toUpperCase() + p.gender.slice(1).toLowerCase()
              : "Unisex",
            images: p.images || [],
          });
        }
      } catch (err) {
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("image", file);

    try {
      setUploadingImage(true);
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/upload`, data);
      if (res.data?.imageUrl) {
        setProductData((prev) => ({
          ...prev,
          images: [...prev.images, { url: res.data.imageUrl, altText: prev.name }],
        }));
        toast.success("Image uploaded!");
      }
    } catch (err) {
      toast.error("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = (index) => {
    setProductData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const payload = {
        name: productData.name,
        description: productData.description,
        price: Number(productData.price),
        discountPrice: productData.discountPrice ? Number(productData.discountPrice) : undefined,
        sku: productData.sku,
        countInStock: Number(productData.countInStock),
        brand: productData.brand,
        category: productData.category,
        material: productData.material,
        gender: productData.gender,
        sizes: typeof productData.sizes === "string" ? productData.sizes.split(",").map((s) => s.trim()) : productData.sizes,
        colors: typeof productData.colors === "string" ? productData.colors.split(",").map((c) => c.trim()) : productData.colors,
        images: productData.images,
      };

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/product/Product/${id}`,
        payload,
        config
      );

      toast.success("Product updated successfully!");
      navigate("/admin/product");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update product");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-12">
        <LoadingState text="Loading product details..." subtext="Retrieving attributes, media, and pricing" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/admin/product"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition font-medium"
        >
          <FaArrowLeft size={12} /> Back to Products
        </Link>
        <span className="text-xs font-mono bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
          ID: {id}
        </span>
      </div>

      <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 md:p-8">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-6">
          Edit Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Details */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
              Product Name
            </label>
            <input
              value={productData.name}
              onChange={handleChange}
              type="text"
              name="name"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={productData.description}
              onChange={handleChange}
              name="description"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              rows="3"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Price (Rs.)
              </label>
              <input
                onChange={handleChange}
                value={productData.price}
                type="number"
                step="0.01"
                required
                name="price"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Discount Price (Rs.)
              </label>
              <input
                onChange={handleChange}
                value={productData.discountPrice}
                type="number"
                step="0.01"
                name="discountPrice"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                SKU Code
              </label>
              <input
                onChange={handleChange}
                value={productData.sku}
                type="text"
                name="sku"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Stock Count
              </label>
              <input
                onChange={handleChange}
                value={productData.countInStock}
                type="number"
                name="countInStock"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Brand
              </label>
              <input
                value={productData.brand}
                onChange={handleChange}
                type="text"
                name="brand"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Size & Color */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Available Sizes (comma separated)
              </label>
              <input
                onChange={handleChange}
                value={productData.sizes}
                type="text"
                name="sizes"
                placeholder="e.g. S, M, L, XL"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Available Colors (comma separated)
              </label>
              <input
                value={productData.colors}
                onChange={handleChange}
                type="text"
                name="colors"
                placeholder="e.g. Red, Blue, Black"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Category, Material, Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Category
              </label>
              <input
                onChange={handleChange}
                value={productData.category}
                type="text"
                name="category"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Material
              </label>
              <input
                onChange={handleChange}
                value={productData.material}
                type="text"
                name="material"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Gender
              </label>
              <select
                onChange={handleChange}
                value={productData.gender}
                name="gender"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>
          </div>

          {/* Product Images */}
          <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/50">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-2">
              <FaImage /> Product Gallery
            </label>

            <div className="flex items-center gap-4 mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"
              />
              {uploadingImage && (
                <span className="text-xs text-orange-600 font-medium inline-flex items-center gap-1.5">
                  <LoadingSpinner size="xs" color="orange" /> Uploading to Cloudinary...
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              {productData.images.map((img, index) => (
                <div key={index} className="relative group w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={img.url || "https://placehold.co/100"}
                    alt={img.altText || `Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove Image"
                  >
                    <FaTrash size={10} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <Link
              to="/admin/product"
              className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting || uploadingImage}
              className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-bold shadow-md transition disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
            >
              {submitting ? (
                <>
                  <LoadingSpinner size="sm" color="white" /> Saving...
                </>
              ) : (
                "Save Product Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;