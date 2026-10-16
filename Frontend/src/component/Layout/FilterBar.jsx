import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const FilterBar = () => {
  const colors = [
    "Black",
    "White",
    "Blue",
    "Red",
    "Green",
    "Yellow",
    "Beige",
    "Brown",
    "Pink",
    "Purple",
    "Grey",
    "Orange",
    "Navy",
    "Maroon",
    "Olive",
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

  const materials = [
    "Cotton",
    "Polyester",
    "Wool",
    "Denim",
    "Linen",
    "Silk",
    "Leather",
    "Nylon",
    "Fleece",
    "Spandex",
  ];

  const genders = ["Men", "Women", "Unisex"];
  const categories = ["Top wear", "Bottom wear"];

  const brands = [
    "Nike",
    "Adidas",
    "Puma",
    "Levi's",
    "Zara",
    "H&M",
    "Uniqlo",
    "Gap",
    "Tommy Hilfiger",
    "Calvin Klein",
    "Ralph Lauren",
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 5000,
  });

  const [priceRange, setPriceRange] = useState(5000);

  // Load filter from URL params
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilter({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",").map((s) => s.trim()) : [],
      material: params.material ? params.material.split(",").map((m) => m.trim()) : [],
      brand: params.brand ? params.brand.split(",").map((b) => b.trim()) : [],
      minPrice: Number(params.minPrice) || 0,
      maxPrice: Number(params.maxPrice) || 5000,
    });
    setPriceRange(Number(params.maxPrice) || 5000);
  }, [searchParams]);

  // Update URL params preserving sort & search
  const updateParams = (newFilter) => {
    const params = new URLSearchParams(searchParams);

    // Keep sortBy and search intact
    const sortBy = params.get("sortBy");
    const search = params.get("search");

    // Remove all filter keys before re-adding
    [
      "category",
      "gender",
      "color",
      "size",
      "material",
      "brand",
      "minPrice",
      "maxPrice",
    ].forEach((k) => params.delete(k));

    if (sortBy) params.set("sortBy", sortBy);
    if (search) params.set("search", search);

    Object.keys(newFilter).forEach((key) => {
      if (Array.isArray(newFilter[key]) && newFilter[key].length > 0) {
        params.set(key, newFilter[key].join(","));
      } else if (newFilter[key] && !Array.isArray(newFilter[key])) {
        if (key === "minPrice" && Number(newFilter[key]) === 0) return;
        if (key === "maxPrice" && Number(newFilter[key]) >= 500) return;
        params.set(key, newFilter[key]);
      }
    });

    setSearchParams(params);
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    let newFilter = { ...filter };
    if (checked) {
      newFilter[name] = [...(newFilter[name] || []), value];
    } else {
      newFilter[name] = (newFilter[name] || []).filter((item) => item !== value);
    }
    setFilter(newFilter);
    updateParams(newFilter);
  };

  const handleCategoryClick = (cat) => {
    const newCategory = filter.category === cat ? "" : cat;
    const newFilter = { ...filter, category: newCategory };
    setFilter(newFilter);
    updateParams(newFilter);
  };

  const handleGenderClick = (g) => {
    const newGender = filter.gender === g ? "" : g;
    const newFilter = { ...filter, gender: newGender };
    setFilter(newFilter);
    updateParams(newFilter);
  };

  const handleColorClick = (color) => {
    const newColor = filter.color === color ? "" : color;
    const newFilter = { ...filter, color: newColor };
    setFilter(newFilter);
    updateParams(newFilter);
  };

  const handlePriceChange = (e) => {
    const newPrice = Number(e.target.value);
    setPriceRange(newPrice);
    const newFilter = { ...filter, minPrice: 0, maxPrice: newPrice };
    setFilter(newFilter);
    updateParams(newFilter);
  };

  const resetFilters = () => {
    const params = new URLSearchParams(searchParams);
    [
      "category",
      "gender",
      "color",
      "size",
      "material",
      "brand",
      "minPrice",
      "maxPrice",
    ].forEach((k) => params.delete(k));
    setSearchParams(params);
  };

  const hasActiveFilters =
    filter.category ||
    filter.gender ||
    filter.color ||
    filter.size.length > 0 ||
    filter.material.length > 0 ||
    filter.brand.length > 0 ||
    filter.maxPrice < 5000;

  return (
    <div className="w-full p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-xs text-red-500 hover:text-red-700 font-semibold cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Category */}
      <div className="mb-5 border-b pb-4">
        <h3 className="font-semibold text-sm mb-2 text-gray-700">Category</h3>
        <div className="space-y-1.5">
          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-orange-500"
            >
              <input
                type="radio"
                name="category"
                value={cat}
                checked={filter.category === cat}
                onChange={() => handleCategoryClick(cat)}
                className="text-orange-500 focus:ring-orange-500"
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div className="mb-5 border-b pb-4">
        <h3 className="font-semibold text-sm mb-2 text-gray-700">Gender</h3>
        <div className="space-y-1.5">
          {genders.map((g) => (
            <label
              key={g}
              className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-orange-500"
            >
              <input
                type="radio"
                name="gender"
                value={g}
                checked={filter.gender === g}
                onChange={() => handleGenderClick(g)}
                className="text-orange-500 focus:ring-orange-500"
              />
              <span>{g}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-5 border-b pb-4">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-semibold text-sm text-gray-700">Max Price</h3>
          <span className="text-xs font-bold text-orange-600">
            Rs. {priceRange}
          </span>
        </div>
        <input
          name="price"
          type="range"
          min="1000"
          max="5000"
          step="100"
          value={priceRange}
          onChange={handlePriceChange}
          className="w-full accent-orange-500 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-gray-400 mt-1">
          <span>Rs. 1,000</span>
          <span>Rs. 5,000</span>
        </div>
      </div>

      {/* Colors */}
      <div className="mb-5 border-b pb-4">
        <h3 className="font-semibold text-sm mb-2 text-gray-700">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => {
            const isSelected = filter.color.toLowerCase() === c.toLowerCase();
            return (
              <button
                key={c}
                type="button"
                title={c}
                onClick={() => handleColorClick(c)}
                className={`w-6 h-6 rounded-full border cursor-pointer transition transform hover:scale-110 ${
                  isSelected ? "ring-2 ring-offset-1 ring-black" : "border-gray-300"
                }`}
                style={{ backgroundColor: c.toLowerCase() }}
              />
            );
          })}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-5 border-b pb-4">
        <h3 className="font-semibold text-sm mb-2 text-gray-700">Sizes</h3>
        <div className="grid grid-cols-3 gap-1.5">
          {sizes.map((s) => {
            const isChecked = filter.size.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => {
                  const newSizes = isChecked
                    ? filter.size.filter((item) => item !== s)
                    : [...filter.size, s];
                  const newFilter = { ...filter, size: newSizes };
                  setFilter(newFilter);
                  updateParams(newFilter);
                }}
                className={`border py-1 text-xs font-medium rounded transition ${
                  isChecked
                    ? "border-black bg-black text-white"
                    : "border-gray-200 text-gray-600 hover:border-gray-400"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Brands */}
      <div className="mb-5 border-b pb-4">
        <h3 className="font-semibold text-sm mb-2 text-gray-700">Brands</h3>
        <div className="space-y-1 max-h-36 overflow-y-auto">
          {brands.map((b) => (
            <label
              key={b}
              className="flex items-center gap-2 cursor-pointer text-xs text-gray-600 hover:text-orange-500"
            >
              <input
                type="checkbox"
                name="brand"
                value={b}
                checked={filter.brand.includes(b)}
                onChange={handleCheckboxChange}
                className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
              <span>{b}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Materials */}
      <div className="mb-4">
        <h3 className="font-semibold text-sm mb-2 text-gray-700">Materials</h3>
        <div className="space-y-1 max-h-36 overflow-y-auto">
          {materials.map((m) => (
            <label
              key={m}
              className="flex items-center gap-2 cursor-pointer text-xs text-gray-600 hover:text-orange-500"
            >
              <input
                type="checkbox"
                name="material"
                value={m}
                checked={filter.material.includes(m)}
                onChange={handleCheckboxChange}
                className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
              <span>{m}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
