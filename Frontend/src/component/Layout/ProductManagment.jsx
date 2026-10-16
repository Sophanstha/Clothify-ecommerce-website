import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaPlus, FaTrash, FaEdit, FaSearch, FaImage } from "react-icons/fa";
import { LoadingSpinner, LoadingState } from "../Common/LoadingSpinner";

const ProductManagment = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // New product form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    sku: "",
    countInStock: 10,
    category: "Top Wear",
    brand: "Clothify",
    material: "Cotton",
    gender: "Unisex",
    sizes: "S, M, L, XL",
    colors: "Black, White, Blue",
    imageUrl: "",
  });

  const token = localStorage.getItem("userToken") || localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/getAllProduct`,
        config
      );
      setProducts(res.data?.data || []);
    } catch {
      // Fallback to public products endpoint if admin route fails
      try {
        const fallback = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product`);
        setProducts(fallback.data?.products || fallback.data?.data || []);
      } catch (err) {
        toast.error("Failed to load products");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/product/deleteProduct/${id}`,
        config
      );
      toast.success("Product deleted successfully");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete product");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("image", file);

    try {
      setUploadingImage(true);
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/upload`, data);
      if (res.data?.imageUrl) {
        setFormData((prev) => ({ ...prev, imageUrl: res.data.imageUrl }));
        toast.success("Image uploaded to Cloudinary!");
      }
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.sku) {
      toast.error("Please provide name, price, and SKU");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const payload = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
        sku: formData.sku,
        countInStock: Number(formData.countInStock) || 0,
        category: formData.category,
        brand: formData.brand,
        material: formData.material,
        gender: formData.gender,
        sizes: typeof formData.sizes === "string" ? formData.sizes.split(",").map((s) => s.trim()) : formData.sizes,
        colors: typeof formData.colors === "string" ? formData.colors.split(",").map((c) => c.trim()) : formData.colors,
        images: formData.imageUrl
          ? [{ url: formData.imageUrl, altText: formData.name }]
          : [
              {
                url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
                altText: formData.name,
              },
            ],
      };

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/product/add-Product`,
        payload,
        config
      );

      toast.success("Product created successfully!");
      setShowAddModal(false);
      setFormData({
        name: "",
        description: "",
        price: "",
        discountPrice: "",
        sku: "",
        countInStock: 10,
        category: "Top Wear",
        brand: "Clothify",
        material: "Cotton",
        gender: "Unisex",
        sizes: "S, M, L, XL",
        colors: "Black, White, Blue",
        imageUrl: "",
      });
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create product");
    }
  };

  const filteredProducts = products.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.name?.toLowerCase().includes(term) ||
      p.sku?.toLowerCase().includes(term) ||
      p.category?.toLowerCase().includes(term) ||
      p.brand?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Product Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage catalog, upload items, and control pricing/stock</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-semibold shadow-sm transition"
        >
          <FaPlus size={14} /> Add New Product
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Search by name, SKU, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div className="text-xs text-gray-500 font-medium">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="py-8">
            <LoadingState text="Loading product inventory..." subtext="Retrieving store catalog from database" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 text-center text-gray-400">No products found matching your search.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">SKU</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredProducts.map((item) => {
                  const imgUrl = item.images?.[0]?.url || "https://placehold.co/100?text=No+Img";
                  return (
                    <tr key={item._id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={imgUrl}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg border border-gray-100 bg-gray-50 flex-shrink-0"
                          />
                          <div>
                            <div className="font-bold text-gray-900 line-clamp-1">{item.name}</div>
                            <div className="text-xs text-gray-400">{item.brand || "Clothify"}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs font-medium">
                          {item.category || "General"}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-gray-900">
                        Rs. {Number(item.price).toFixed(2)}
                      </td>
                      <td className="p-4">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            (item.countInStock || 0) > 0
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {item.countInStock || 0} in stock
                        </span>
                      </td>
                      <td className="p-4 font-mono text-xs text-gray-500">{item.sku || "N/A"}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/product/${item._id}`}
                            className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white p-2 rounded-lg transition"
                            title="Edit Product"
                          >
                            <FaEdit size={14} />
                          </Link>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-lg transition"
                            title="Delete Product"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 my-auto max-h-[90vh] overflow-y-auto relative">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Classic Cotton Oversized Hoodie"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                  Description
                </label>
                <textarea
                  rows="2"
                  placeholder="Product details, fabric, fit..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                    Price (Rs.) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="2499"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                    SKU Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="CLOTH-001"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={formData.countInStock}
                    onChange={(e) => setFormData({ ...formData, countInStock: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>
              </div>

              {/* Image Upload */}
              <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/50">
                <label className="block text-xs font-bold uppercase text-gray-600 mb-2 flex items-center gap-2">
                  <FaImage /> Product Image
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"
                  />
                  {uploadingImage && (
                    <span className="text-xs text-orange-600 font-medium inline-flex items-center gap-1.5">
                      <LoadingSpinner size="xs" color="orange" /> Uploading to Cloudinary...
                    </span>
                  )}
                </div>
                {formData.imageUrl && (
                  <div className="mt-3 flex items-center gap-3">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                    />
                    <span className="text-xs text-green-600 font-medium">Image uploaded ready to save!</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="btn-create-product"
                  disabled={uploadingImage}
                  className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-bold shadow-md transition disabled:opacity-50 cursor-pointer"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagment;
