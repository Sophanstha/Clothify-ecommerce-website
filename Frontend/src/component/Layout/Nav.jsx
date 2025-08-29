import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import { HiMenu, HiX } from "react-icons/hi";
import SearchBar from "./SearchBar";
import CartDrawer from "../Cart/CartDrawer";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const nav = useNavigate();

  const toogleOpen = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="flex justify-between items-center font-bold px-4 py-3 shadow-md">
        {/* Logo */}
        <h1 className="text-2xl text-orange-500">Clothify</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-between items-center gap-6 text-lg">
          <NavLink to={"collection/all"} className="hover:text-orange-500 cursor-pointer">Men</NavLink>
          <div className="hover:text-orange-500 cursor-pointer">Women</div>
          <div className="hover:text-orange-500 cursor-pointer">Top Wear</div>
          <div className="hover:text-orange-500 cursor-pointer">Bottom Wear</div>
        </div>

        {/* Right Side (Icons) */}
        <div className="flex items-center gap-4 text-xl">
        <NavLink to={"/admin"}
        className="text-white  text-sm rounded  block px-2 bg-black"
        >Admin</NavLink>
        
          <FaRegUser
            className="cursor-pointer hover:text-orange-500"
            onClick={() => nav("/profile")}
          />

          {/* SearchBar only visible on md+ screens */}
          <div className="hidden sm:block">
            <SearchBar />
          </div>

          {/* Cart */}
          <button onClick={toogleOpen} className="relative hover:text-orange-500">
            <BsCart2 className="cursor-pointer hover:text-orange-500" />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              0
            </span>
          </button>

          {/* Mobile Menu Button */}
          <div
            className="md:hidden cursor-pointer text-2xl"
            onClick={() => setOpen(!open)}
          >
            {open ? <HiX /> : <HiMenu />}
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 text-center py-4 bg-gray-100 font-semibold text-lg shadow-md">
          <div className="hover:text-orange-500 cursor-pointer" onClick={() => setOpen(!open)}>Men</div>
          <div className="hover:text-orange-500 cursor-pointer" onClick={() => setOpen(!open)}>Women</div>
          <div className="hover:text-orange-500 cursor-pointer" onClick={() => setOpen(!open)}>Top Wear</div>
          <div className="hover:text-orange-500 cursor-pointer" onClick={() => setOpen(!open)}>Bottom Wear</div>

          {/* Mobile Search */}
          <div className="px-4">
            <SearchBar />
          </div>
        </div>
      )}
      <CartDrawer cartopen={cartOpen} toogleOpen={toogleOpen} />
    </>
  );
};

export default Nav;
