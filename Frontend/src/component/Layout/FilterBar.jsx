import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterBar = () => {
  // Colors (common fashion palette)
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

  // Sizes
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

  // Materials
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
    "Rayon",
    "Acrylic",
    "Spandex",
  ];

  // Gender / Target audience
  const genders = ["Men", "Women"];

  const category = ["Top wear", "Bottom wear"];

  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const brands = [
    "Nike",
    "Adidas",
    "Puma",
    "Under Armour",
    "Reebok",
    "Levi's",
    "Zara",
    "H&M",
    "Uniqlo",
    "Gap",
    "Forever 21",
    "Calvin Klein",
    "Tommy Hilfiger",
    "Ralph Lauren",
    "Gucci",
    "Prada",
    "Louis Vuitton",
    "Balenciaga",
    "The North Face",
    "Columbia",
    "Patagonia",
    "Diesel",
    "Wrangler",
    "Armani",
    "Hollister",
    "American Eagle",
    "Banana Republic",
    "Mango",
    "Superdry",
    "Lacoste",
  ];

  const [priceRange, setPriceRange] = useState([0, 100]);

  // Load filter from URL params
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilter({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: Number(params.minPrice) || 0,
      maxPrice: Number(params.maxPrice) || 100,
    });
    setPriceRange([0, Number(params.maxPrice) || 100]);
  }, [searchParams]);

   

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
 let newFilter = { ...filter };
    if (type === "checkbox") {
      if (checked) {
        newFilter[name] = [...(newFilter[name] || []), value];
      } else {
        newFilter[name] = newFilter[name].filter((item) => item !== value);
      }
    } else {
      newFilter[name] = value;
    }

    setFilter(newFilter);
    updatePrams(newFilter)
  };

  // Handle color separately (since we want circle buttons)
  const handleColorClick = (color) => {
    const newFilter = { ...filter, color };
    setFilter(newFilter);
    updatePrams(newFilter)
  };

  // Reset filters
  const resetFilters = () => {
    const reset = {
      category: "",
      gender: "",
      color: "",
      size: [],
      material: [],
      brand: [],
      minPrice: 0,
      maxPrice: 100,
    };
    setFilter(reset);
    setPriceRange([0, 100]);
    setSearchParams({});
  };
  const nav = useNavigate()


  const updatePrams = (newFilter)=>{
    const params = new URLSearchParams();
    Object.keys(newFilter).forEach((key)=>{
      if(Array.isArray(newFilter[key]) && newFilter[key].length >0){
        params.append(key,newFilter[key].join(","))
      }
      else if(newFilter[key]){
        params.append(key,newFilter[key])

      }
    })
    setSearchParams(params)
    nav(`?${params.toString()}`)
  }


  const HandleChangePrice = (e)=>{
    const newprice = e.target.value
    setPriceRange([0,newprice]);
    const newFilter = {...filter,minPrice:0,maxPrice:newprice}
    setFilter(newFilter)
    updatePrams(newFilter)
  }
  return (
    <div 
     className="w-72 max-w-full p-4 bg-white border-r shadow-md h-full z-70 
             sm:w-64 md:w-72 lg:w-80 overflow-y-auto max-h-screen 
             lg:scrollbar-hide"
    >
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      {/* Category */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Category</h3>
        {category.map((cat) => (
          <label key={cat} className="block cursor-pointer text-sm md:text-base">
            <input
              value={cat}
              checked={filter.category === cat}
              onChange={handleFilterChange}
              type="radio"
              name="category"
              
              className="mr-2"
            />
            {cat}
          </label>
        ))}
      </div>

      {/* Gender */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Gender</h3>
        {genders.map((g) => (
          <label key={g} className="block cursor-pointer text-sm md:text-base">
            <input
              type="radio"
              value={g}
              checked={filter.gender === g}
              onChange={handleFilterChange}
              name="gender"
              className="mr-2"
            />
            {g}
          </label>
        ))}
      </div>

      {/* Colors */}
      <div className="mb-4 w-full md:w-[60%]">
        <h3 className="font-semibold mb-2">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {colors.slice(0, 5).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => handleColorClick(c)}
              className={`w-7 h-7 md:w-8 md:h-8 rounded-full border cursor-pointer ${
                filter.color === c ? "ring-2 ring-black" : ""
              }`}
              style={{ backgroundColor: c.toLowerCase() }}
            />
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Sizes</h3>
        {sizes.map((s) => (
          <label key={s} className="block cursor-pointer text-sm md:text-base">
            <input
              type="checkbox"
              name="size"
              value={s}
              checked={filter.size.includes(s)}
              onChange={handleFilterChange}
              className="mr-2"
            />
            {s}
          </label>
        ))}
      </div>

      {/* Materials */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Materials</h3>
        {materials.map((m) => (
          <label key={m} className="block cursor-pointer text-sm md:text-base">
            <input
              type="checkbox"
              name="material"
              value={m}
              checked={filter.material.includes(m)}
              onChange={handleFilterChange}
              className="mr-2"
            />
            {m}
          </label>
        ))}
      </div>

      {/* Brands */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Brands</h3>
        {brands.map((m) => (
          <label key={m} className="block cursor-pointer text-sm md:text-base">
            <input
              type="checkbox"
              name="brand"
              value={m}
              checked={filter.brand.includes(m)}
              onChange={handleFilterChange}
              className="mr-2"
            />
            {m}
          </label>
        ))}
      </div>

      {/* Price */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Price</h3>
        <input
        name="price"
          type="range"
          min="0"
          max="100"
          value={priceRange}
          onChange={
            HandleChangePrice
          }
          className="w-full md:w-[60%]"
        />
        <p className="text-xs md:text-sm mt-1">Up to ${filter.maxPrice}</p>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="mt-4 w-full md:w-[70%] bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 text-sm md:text-base"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterBar;
