import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets.js";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";

const Navbar = () => {

  const [visible, setVisible] = useState(false);

  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () =>{
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }


  return (
    <div className="flex justify-between flex-items-center py-5 font-medium">
      <Link to="/">
        {" "}
        <img src={assets.logo} alt="" className="w-26 md:w-36" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-gray-700 text-sm">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="hidden bg-gray-700 border-none w-2/4 h-[1.5px]" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="hidden bg-gray-700 border-none w-2/4 h-[1.5px]" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="hidden bg-gray-700 border-none w-2/4 h-[1.5px]" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="hidden bg-gray-700 border-none w-2/4 h-[1.5px]" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt=""
        />
        <div className="group relative">
          
            <img
              onClick={()=> token ? null: navigate('/login')}
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt=""
            />
          {/* {Dropdowm} */}
          { token && <div className="hidden group-hover:block right-0 absolute pt-4 dropdown-menu">
            <div className="flex flex-col gap-2 bg-slate-100 px-5 py-3 rounded w-36 text-gray-700 tex-gray-500">
              <p className="hover:text-black cursor-pointer">My Profile</p>
              <p onClick={() =>navigate('/orders')} className="hover:text-black cursor-pointer">Order</p>
              <p onClick={logout} className="hover:text-black cursor-pointer">Logout</p>
            </div>
          </div> }
          
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="right-[5px] bottom-[5px] absolute bg-black rounded w-4 aspect-square text-[8px] text-white text-center leading-4">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => {
            setVisible(true);
          }}
          src={assets.menu_icon}
          className="sm:hidden w-5 cursor-pointer"
          alt=""
        />
      </div>

      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-5 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-5 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-5 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-5 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
