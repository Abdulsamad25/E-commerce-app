import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";

const LatestCollection = ({ limit = 5 }) => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, limit));
  }, [products, limit]);

  return (
    <div className="relative bg-white px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
      {/* Decorative background elements */}
      <div className="top-0 right-0 absolute bg-blue-400/5 blur-3xl rounded-full w-96 h-96 -translate-y-1/2"></div>
      <div className="bottom-0 left-0 absolute bg-black/5 blur-3xl rounded-full w-96 h-96 translate-y-1/2"></div>
      
      <div className="relative mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-400/10 mb-4 px-4 py-2 border border-blue-400/20 rounded-full">
            <span className="bg-blue-400 rounded-full w-2 h-2 animate-pulse"></span>
            <span className="font-medium text-blue-400 text-xs uppercase tracking-wider">
              Fresh Arrivals 
            </span>
          </div>
          
          <Title text1={"LATEST"} text2={"COLLECTIONS"} />
          
          <p className="mx-auto mt-6 max-w-2xl text-gray-600 text-base leading-relaxed">
            Discover our newest arrivals, carefully curated to bring you the latest trends 
            and timeless pieces that elevate your style.
          </p>
        </div>

        {/* Products Grid */}
        <div className="gap-6 lg:gap-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {latestProducts.map((item, index) => (
            <div 
              key={index}
              className="group relative bg-white hover:bg-gray-50 shadow-sm hover:shadow-xl border border-gray-100 rounded-xl overflow-hidden transition-all hover:-translate-y-2 duration-300 transform"
            >
              {/* New Badge */}
              <div className="top-3 left-3 z-10 absolute">
                <div className="flex items-center gap-1.5 bg-blue-400 shadow-lg px-3 py-1.5 rounded-full">
                  <svg 
                    className="w-3 h-3 text-white animate-pulse" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                  <span className="font-bold text-white text-xs">NEW</span>
                </div>
              </div>
              
              <ProductItem 
                id={item._id} 
                image={item.image} 
                name={item.name} 
                price={item.price}
              />
              
              {/* Hover Effect Border */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 border-2 border-blue-400 rounded-xl transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {products.length > limit && (
          <div className="mt-16 text-center">
            <Link to="/collection">
              <button className="group inline-flex relative items-center gap-3 bg-black hover:bg-blue-400 shadow-lg hover:shadow-blue-400/30 px-10 py-4 rounded-full overflow-hidden font-semibold text-white hover:scale-105 transition-all duration-300 transform">
                <span className="z-10 relative">View All Products</span>
                <svg 
                  className="z-10 relative w-5 h-5 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                
                {/* Button hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestCollection;