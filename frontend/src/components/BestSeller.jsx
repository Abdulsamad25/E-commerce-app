import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = ({ limit = 5 }) => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestSeller === true);
    setBestSeller(bestProduct.slice(0, limit));
  }, [products, limit]);

  const totalBestSellers = products.filter((item) => item.bestSeller === true).length;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8 py-16">
      {/* Header Section */}
      <div className="mx-auto mb-12 max-w-4xl text-center">
        <div className="inline-block">
        
          
          <Title text1={"BEST"} text2={"SELLERS"} />
          <div className="bg-blue-400 mx-auto mt-2 rounded-full w-20 h-1"></div>
        </div>
        
        <p className="mx-auto mt-6 max-w-2xl text-gray-600 text-sm sm:text-base leading-relaxed">
          Our most loved products, handpicked by customers like you. 
          These top-rated items are flying off the shelves for good reason.
        </p>
      </div>

      {/* Products Grid */}
      <div className="mx-auto max-w-7xl">
        <div className="gap-4 sm:gap-6 lg:gap-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {bestSeller.map((item, index) => (
            <div 
              key={index}
              className="group relative bg-white shadow-md hover:shadow-2xl rounded-lg overflow-hidden transition-all hover:-translate-y-2 duration-300 transform"
            >
              {/* Bestseller Badge */}
              <div className="top-3 left-3 z-10 absolute">
                <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 shadow-lg px-2 py-1 rounded-full font-bold text-white text-xs">
                  <svg 
                    className="w-3 h-3" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>Best</span>
                </div>
              </div>

              {/* Ranking Badge */}
              <div className="top-3 right-3 z-10 absolute">
                <div className="flex justify-center items-center bg-black/80 backdrop-blur-sm rounded-full w-8 h-8 font-bold text-white text-xs">
                  #{index + 1}
                </div>
              </div>
              
              <ProductItem 
                id={item._id} 
                name={item.name} 
                image={item.image} 
                price={item.price}
              />
              
              {/* Hover overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* View All Bestsellers Button */}
        {totalBestSellers > limit && (
          <div className="mt-12 text-center">
            <a href="/collection">
              <button className="group inline-flex items-center gap-2 bg-black hover:bg-blue-400 shadow-lg hover:shadow-blue-400/50 px-8 py-3 rounded-full font-medium text-white hover:scale-105 transition-all duration-300 transform">
                <span>View All Bestsellers</span>
                <svg 
                  className="w-5 h-5 transition-transform group-hover:translate-x-1 transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSeller;