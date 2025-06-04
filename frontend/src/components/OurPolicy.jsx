import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex sm:flex-row flex-col justify-around gap-12 sm:gap-2 py-20 text-gray-700 text-xs sm:text-sm md:text-base text-center">
      <div className="">
        <img src={assets.exchange_icon} className="m-auto mb-5 w-12" alt="" />
        <p className="font-semibold">Easy Exchange Poicy </p>
        <p className="text-gray-400">We offer hassle free exchange policy</p>
      </div>
      <div className="">
        <img src={assets.quality_icon} className="m-auto mb-5 w-12" alt="" />
        <p className="font-semibold">7 Days Return Poicy </p>
        <p className="text-gray-400">We offer hassle free exchange policy</p>
      </div>
      <div className="">
        <img src={assets.support_img} className="m-auto mb-5 w-12" alt="" />
        <p className="font-semibold">Best customer support </p>
        <p className="text-gray-400">We provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;
