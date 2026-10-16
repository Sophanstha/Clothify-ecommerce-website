import React from "react";
import { useSearchParams } from "react-router-dom";

const ShortOption = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSort = (e) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("sortBy", value);
    } else {
      newParams.delete("sortBy");
    }
    setSearchParams(newParams);
  };

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-600 whitespace-nowrap">
        Sort By:
      </label>
      <select
        className="p-2 border border-gray-300 rounded-lg text-sm bg-white shadow-sm focus:outline-none focus:border-orange-500"
        onChange={handleSort}
        value={searchParams.get("sortBy") || ""}
      >
        <option value="">Default (Newest)</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="popularity">Popularity / Top Rated</option>
      </select>
    </div>
  );
};

export default ShortOption;
