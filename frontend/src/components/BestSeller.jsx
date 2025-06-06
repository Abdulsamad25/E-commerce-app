import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestSeller === true);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10">
      <div className="py-8 text-3xl text-center">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="m-auto w-3/4 text-gray-600 text-xs sm:text-sm md:text-base">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel,
          repellendus velit esse eaque molestiae error.
        </p>
      </div>

      <div className="gap-4 gap-y-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
       {
       bestSeller.map((item,index) =>(
          <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
        ))
       }
      </div>

    </div>
  );
};

export default BestSeller;
