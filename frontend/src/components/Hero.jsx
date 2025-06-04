import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Hero = () => {
  return (
    <div className="flex sm:flex-row flex-col border border-gray-400">
      <div className="flex justify-center items-center py-10 sm:py-0 w-full sm:w-1/2">
        <div className="text[#414141]">
          <div className="flex items-center gap-2">
            <p className="bg-[#414141] w-8 md:w-11 h-[2px]"></p>
            <p className="font-medium text-sm md:text-base">OUR BEST SELLERS</p>
          </div>
          <h1 className="sm:py-3 text-3xl lg:text-5xl leading-relaxed prata-regular">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className="bg-[#414141] w-8 md:w-11 h-[1px]"></p>
          </div>
        </div>
      </div>

      <img src={assets.hero_img} className="w-full sm:w-1/2" alt="" />
    </div>
  );
};

export default Hero;
