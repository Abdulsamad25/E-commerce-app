import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets.js";

const Sidebar = () => {
  return (
    <div className="top-15 left-0 z-10 fixed bg-white shadow w-16 md:w-[18%] h-screen">
      <div className="flex flex-col items-center md:items-start gap-4 px-2 pt-6 md:pl-[20%] text-[15px]">
        {/* Add Items */}
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 border border-gray-300 border-r-0 rounded-l ${
              isActive ? "bg-gray-100 font-medium" : ""
            }`
          }
        >
          <img src={assets.add_icon} className="w-5 h-5" alt="Add" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        {/* List Items */}
        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 border border-gray-300 border-r-0 rounded-l ${
              isActive ? "bg-gray-100 font-medium" : ""
            }`
          }
        >
          <img src={assets.order_icon} className="w-5 h-5" alt="List" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        {/* Orders */}
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 border border-gray-300 border-r-0 rounded-l ${
              isActive ? "bg-gray-100 font-medium" : ""
            }`
          }
        >
          <img src={assets.order_icon} className="w-5 h-5" alt="Orders" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
