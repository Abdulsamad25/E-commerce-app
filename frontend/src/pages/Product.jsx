import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="opacity-100 pt-10 border-t transition-opacity duration-500 ease-in">
      {/* Products Data */}
      <div className="flex sm:flex-row flex-col gap-12 sm:gap-12">
        {/* {Product Image} */}
        <div className="flex sm:flex-row flex-col-reverse flex-1 gap-3">
          <div className="flex sm:flex-col justify-between sm:justify-normal w-full sm:w-[18.75%] overflow-x-auto sm:overflow-y-scroll">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="flex-shrink-0 sm:mb-3 w-[24%] sm:w-full cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[100%]">
            <img src={image} className="w-full h-full object-cover" alt="" />
          </div>
        </div>

        {/* {Product Info} */}
        <div className="flex-1">
          <h1 className="mt-2 font-medium text-2xl">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 font-medium text-3xl">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 md:w-4/5 text-gray-500">
            {productData.description}
          </p>

          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-200  ${
                    item === size ? "border-orange-500 " : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              onClick={() => addToCart(productData._id, size)}
              className="bg-black active:bg-gray-700 px-8 py-3 text-white text-sm"
            >
              ADD TO CART
            </button>
            <hr className="mt-8" />
            <div className="flex flex-col gap-1 mt-5 text-gray-500 text-sm">
              <p>100% Original Product</p>
              <p>Cash On Delivery is Available on this Product</p>
              <p>Easy return and exchange policy within 7 days</p>
            </div>
          </div>
        </div>
      </div>
      {/* {Description & Review} */}
      <div className="mt-30">
        <div className="flex">
          <b className="px-5 py-3 border">Description</b>
          <p className="px-5 py-3 border">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 px-6 py-6 border text-gray-600 text-sm">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Exercitationem dolore beatae quam est expedita sit animi magni
            quibusdam laudantium maiores libero repellat dicta pariatur rem
            optio, eveniet labore assumenda blanditiis! Sequi eos eligendi
            dolorem consequuntur facilis ipsum cupiditate repellat unde possimus
            veniam suscipit, qui, tempora officiis enim alias atque fugit!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
            provident laboriosam possimus tenetur blanditiis magni ex veniam
            sunt corporis recusandae eum ullam, accusamus sed odio! Odit earum
            impedit tempore placeat?
          </p>
        </div>
      </div>

      {/* {display related products} */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
