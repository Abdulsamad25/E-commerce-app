import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative bg-black min-h-screen overflow-hidden">
      {/* Two-column layout */}
      <div className="mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-12 md:py-20 max-w-7xl">
        <div className="items-center gap-12 grid md:grid-cols-2 min-h-[calc(100vh-200px)]">
          
          {/* Left Content */}
          <div className="z-10 order-2 md:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-400/10 backdrop-blur-sm mb-6 px-4 py-2 border border-blue-400/30 rounded-full">
              <span className="bg-blue-400 rounded-full w-2 h-2 animate-pulse"></span>
              <p className="font-medium text-blue-400 text-xs uppercase tracking-wider">
                New Collection 2025
              </p>
            </div>
            
            {/* Main Heading */}
            <h1 className="mb-6 font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-tight">
              Latest
              <span className="block mt-2 text-blue-400">Arrivals</span>
            </h1>
            
            {/* Subheading */}
            <p className="mb-8 max-w-md text-gray-400 text-base leading-relaxed">
              Discover our handpicked selection of premium products. Elevate your
              style with the best sellers of the season.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/collection")}
                className="group flex items-center gap-3 bg-blue-400 hover:bg-blue-500 hover:shadow-blue-400/20 hover:shadow-lg px-8 py-4 rounded-lg font-semibold text-black transition-all duration-300"
              >
                SHOP NOW
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
              
              <button
                onClick={() => navigate("/collection")}
                className="flex items-center gap-3 hover:bg-white/5 px-8 py-4 border border-white/20 rounded-lg font-semibold text-white transition-all duration-300"
              >
                VIEW ALL
              </button>
            </div>
            
            {/* Stats */}
            <div className="flex gap-8 md:gap-12 mt-12 pt-8 border-white/10 border-t">
              <div>
                <p className="font-bold text-blue-400 text-3xl">3+</p>
                <p className="mt-1 text-gray-500 text-sm">Products</p>
              </div>
              <div>
                <p className="font-bold text-blue-400 text-3xl">Fresh</p>
                <p className="mt-1 text-gray-500 text-sm">New Brand</p>
              </div>
              <div>
                <p className="font-bold text-blue-400 text-3xl">24/7</p>
                <p className="mt-1 text-gray-500 text-sm">Support</p>
              </div>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="relative order-1 md:order-2">
            {/* Decorative background circle */}
            <div className="top-1/2 left-1/2 absolute bg-blue-400/10 blur-3xl rounded-full w-96 h-96 -translate-x-1/2 -translate-y-1/2"></div>
            
            {/* Main Image */}
            <div className="z-10 relative">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={assets.brand_shoot_first}
                  className="w-full h-auto object-center object-cover"
                  alt="Latest Collection"
                />
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              {/* Floating badge on image */}
              <div className="top-6 right-6 absolute bg-blue-400 shadow-lg px-4 py-2 rounded-full font-bold text-black text-sm">
                NEW
              </div>
            </div>
            
            {/* Decorative dots */}
            <div className="right-0 bottom-0 -z-10 absolute gap-2 grid grid-cols-3 opacity-20 -mr-8 -mb-8">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-blue-400 rounded-full w-2 h-2"></div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Subtle grid background */}
      <div 
        className="top-0 left-0 absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(96, 165, 250, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(96, 165, 250, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      ></div>
    </div>
  );
};

export default Hero;