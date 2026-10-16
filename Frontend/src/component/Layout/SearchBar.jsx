import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    navigate(`/collection/all?search=${encodeURIComponent(searchTerm.trim())}`);
    setSearchTerm("");
    setIsOpen(false);
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
            placeholder="Search products..."
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm
                       w-full sm:w-64 md:w-72 lg:w-80
                       focus:outline-none focus:border-orange-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          <button
            type="submit"
            className="p-1.5 text-gray-600 hover:text-orange-500 transition"
            title="Search"
          >
            <CiSearch size={22} />
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-xs text-gray-400 hover:text-gray-600 px-1"
          >
            ✕
          </button>
        </form>
      ) : (
        <button
          type="button"
          aria-label="Open search bar"
          className="cursor-pointer hover:text-orange-500 text-gray-700 flex items-center"
          onClick={() => setIsOpen(true)}
        >
          <CiSearch size={24} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
