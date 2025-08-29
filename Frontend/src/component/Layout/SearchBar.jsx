import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTre, setSearchTre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTre.trim()) return; // prevent empty search
    console.log("Searching for:", searchTre);

    setSearchTre(""); // clear input
    setIsOpen(false); // close search bar after submission
  };

  return (
    <div className="flex items-center">
      {isOpen ? (
        <form
          onSubmit={handleSubmit}
          className="flex items-center w-full sm:relative gap-1"
        >
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded px-3 py-2 
                       w-full sm:w-64 md:w-80 lg:w-96
                       focus:outline-none focus:border-orange-500"
            value={searchTre}
            onChange={(e) => setSearchTre(e.target.value)}
          />
          <button type="submit" className="p-2 hover:text-orange-500">
            <CiSearch size={22} />
          </button>
        </form>
      ) : (
        <CiSearch
          className="cursor-pointer hover:text-orange-500"
          size={26}
          onClick={() => setIsOpen(true)}
        />
      )}
    </div>
  );
};

export default SearchBar;
