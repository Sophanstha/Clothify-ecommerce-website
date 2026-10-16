import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import { HiMenu, HiX } from "react-icons/hi";
import SearchBar from "./SearchBar";
import CartDrawer from "../Cart/CartDrawer";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/slices/cartSlice";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart({ userId: user?._id, guestId }));
  }, [dispatch, user?._id, guestId]);

  const toogleOpen = () => {
    setCartOpen(!cartOpen);
  };

  const totalCartCount =
    cart?.products?.reduce((acc, item) => acc + (item.quantity || 1), 0) || 0;

  return (
    <>
      {/* Top Navbar */}
      <nav className="flex justify-between items-center font-bold px-4 py-3 shadow-md">
        {/* Logo */}
        <Link to="/" className="text-2xl text-orange-500">
          Clothify
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-between items-center gap-6 text-lg">
          <NavLink
            to={"/collection/all?gender=Men"}
            className="hover:text-orange-500 cursor-pointer"
          >
            Men
          </NavLink>
          <NavLink
            to={"/collection/all?gender=Women"}
            className="hover:text-orange-500 cursor-pointer"
          >
            Women
          </NavLink>
          <NavLink
            to={"/collection/all?category=Top Wear"}
            className="hover:text-orange-500 cursor-pointer"
          >
            Top Wear
          </NavLink>
          <NavLink
            to={"/collection/all?category=Bottom Wear"}
            className="hover:text-orange-500 cursor-pointer"
          >
            Bottom Wear
          </NavLink>
        </div>

        {/* Right Side (Icons) */}
        <div className="flex items-center gap-4 text-xl">
          {user?.role === "admin" && (
            <NavLink
              to={"/admin"}
              className="text-white text-sm rounded block px-2 py-1 bg-black"
            >
              Admin
            </NavLink>
          )}

          <button
            onClick={() => nav(user ? "/profile" : "/login")}
            className="cursor-pointer hover:text-orange-500 flex items-center gap-1"
            title={user ? user.name : "Login / Register"}
          >
            <FaRegUser />
            {user && (
              <span className="text-xs font-normal max-w-[80px] truncate hidden lg:inline">
                {user.name.split(" ")[0]}
              </span>
            )}
          </button>

          {/* SearchBar only visible on md+ screens */}
          <div className="hidden sm:block">
            <SearchBar />
          </div>

          {/* Cart */}
          <button
            onClick={toogleOpen}
            className="relative hover:text-orange-500"
            aria-label="Shopping Cart"
          >
            <BsCart2 className="cursor-pointer hover:text-orange-500" />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {totalCartCount}
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
          <Link
            to="/collection/all?gender=Men"
            className="hover:text-orange-500 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Men
          </Link>
          <Link
            to="/collection/all?gender=Women"
            className="hover:text-orange-500 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Women
          </Link>
          <Link
            to="/collection/all?category=Top Wear"
            className="hover:text-orange-500 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Top Wear
          </Link>
          <Link
            to="/collection/all?category=Bottom Wear"
            className="hover:text-orange-500 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Bottom Wear
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="text-orange-600 font-bold hover:text-orange-700 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Admin Dashboard
            </Link>
          )}

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

