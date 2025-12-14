import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets.js";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";

const Navbar = () => {

 const [visible, setVisible] = useState(false);
 const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

 const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

 const logout = () =>{
  navigate('/login')
  localStorage.removeItem('token')
  setToken('')
  setCartItems({})
 }
 
 const handleProfileClick = () => {
  if (token) {
   setIsProfileMenuOpen(prev => !prev);
  } else {
   navigate('/login');
  }
 };


 return (
  <div className="flex justify-between items-center bg-black px-4 sm:px-8 md:px-12 lg:px-16 font-medium text-white">
   <Link to="/" className="flex-shrink-0">
    {" "}
    {/* Invert added to ensure a black logo appears white on the black background */}
    <img src={assets.abasi} alt="" className="invert w-26" /> 
   </Link>
   
   {/* Main Navigation Links (Text is White) */}
   <><ul className="hidden sm:flex flex-1 justify-center gap-5 text-white text-sm">
    {['/', '/collection', '/about', '/contact'].map((path, index) => (
      <NavLink
        key={index}
        to={path}
        className={({ isActive }) =>
          // blue Accent for Active Link Text
          `flex flex-col items-center gap-1 ${isActive ? 'text-blue-400' : 'text-white'}`}
      >
        <p>{path === '/' ? 'HOME' : path.substring(1).toUpperCase()}</p>
        {/* blue Accent Underline */}
        <hr className={`border-none w-2/4 h-[1.5px] transition-all ${path === window.location.pathname ? 'bg-blue-500' : 'hidden'}`} />
      </NavLink>
    ))}
  </ul><div className="flex flex-shrink-0 items-center gap-6">
      {/* Icons are Inverted to be White */}
      <img
        onClick={() => setShowSearch(true)}
        src={assets.search_icon}
        className="invert w-5 cursor-pointer"
        alt="Search" />
      <div className="group relative">

        <img
          onClick={handleProfileClick}
          src={assets.profile_icon}
          className="invert w-5 cursor-pointer"
          alt="Profile" />

        {/* {Dropdown} */}
        {token && (
          <div className={`${isProfileMenuOpen ? 'block' : 'hidden group-hover:block'} right-0 absolute pt-4 dropdown-menu`}>
            {/* Change Dropdown Background to White with a Blue Accent border */}
            <div className="flex flex-col gap-2 bg-white px-5 py-3 border border-blue-400 rounded w-36 text-gray-700">
              <p
                onClick={() => { navigate('/orders'); setIsProfileMenuOpen(false); } }
                className="hover:text-black cursor-pointer"
              >
                Order
              </p>
              <p
                onClick={() => { logout(); setIsProfileMenuOpen(false); } }
                className="hover:text-black cursor-pointer"
              >
                Logout
              </p>
            </div>
          </div>
        )}
      </div>
      <Link to="/cart" className="relative">
        <img src={assets.cart_icon} className="invert w-5 min-w-5" alt="Cart" />
        {/* blue Accent for Cart Count */}
        <p className="right-[5px] bottom-[5px] absolute bg-blue-500 rounded w-4 aspect-square text-[8px] text-white text-center leading-4">
          {getCartCount()}
        </p>
      </Link>
      <img
        onClick={() => {
          setVisible(true);
        } }
        src={assets.menu_icon}
        className="sm:hidden invert w-5 cursor-pointer"
        alt="Menu" />
    </div></>

   {/* Mobile Nav Menu (Background is White, Active uses Blue accent) */}
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
     {/* Mobile Links: Active uses light blue background (bg-blue-100) and Black text */}
     <NavLink
      onClick={() => setVisible(false)}
      className={({ isActive }) => `py-2 pl-5 border ${isActive ? 'bg-blue-100 text-black' : ''}`}
      to="/"
     >
      HOME
     </NavLink>
     <NavLink
      onClick={() => setVisible(false)}
      className={({ isActive }) => `py-2 pl-5 border ${isActive ? 'bg-blue-100 text-black' : ''}`}
      to="/collection"
     >
      COLLECTION
     </NavLink>
     <NavLink
      onClick={() => setVisible(false)}
      className={({ isActive }) => `py-2 pl-5 border ${isActive ? 'bg-blue-100 text-black' : ''}`}
      to="/about"
     >
      ABOUT
     </NavLink>
     <NavLink
      onClick={() => setVisible(false)}
      className={({ isActive }) => `py-2 pl-5 border ${isActive ? 'bg-blue-100 text-black' : ''}`}
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