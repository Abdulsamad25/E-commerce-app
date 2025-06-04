import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 12));
  }, [products]);

  return (
    <div className="my-10">
      <div className="py-8 text-3xl text-center">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="m-auto w-3/4 text-gray-600 text-xs sm:text-base">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam fugit
          incidunt vel, sint earum neque!
        </p>
      </div>

      <div className="gap-4 gap-y-6 grid grid-cols-2 lg-grid-cols-5 sm:grid-cols-3 md:grid-cols-4">
        {
          latestProducts.map((item,index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
          ))
        }
      </div>
    </div>
  );
};

export default LatestCollection;
