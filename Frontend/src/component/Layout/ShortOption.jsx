import React from "react";
import { useSearchParams } from "react-router-dom";

const ShortOption = () => {
  const [searchParam,setSearchParam] = useSearchParams();

  const handleSort= (e)=>{
    const value = e.target.value
    searchParam.set("sortBy",value)
    setSearchParam(searchParam)
  }


  return (
    <div className="w-52 max-w- sm">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Sort By
      </label>
      <select
        className="w-[90%] p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      onChange={handleSort}
      value={searchParam.get("sortBy")}
      >
        
        <option value="">Default</option>
        <option value="PriceAsc">Price: Low to High</option>
        <option value="PriceDesc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default ShortOption;
