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
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [showNotification, setShowNotification] = useState(false);

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

  const handleAddToCart = () => {
    if (!size) {
      alert("Please select a size");
      return;
    }
    addToCart(productData._id, size);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return productData ? (
    <div className="bg-gradient-to-b from-white to-gray-50 opacity-100 transition-opacity duration-500 ease-in">
      {/* Success Notification */}
      {showNotification && (
        <div className="top-4 right-4 z-50 fixed flex items-center gap-3 bg-black shadow-2xl px-6 py-4 rounded-lg text-white">
          <svg
            className="w-6 h-6 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="font-medium">Added to cart successfully!</span>
        </div>
      )}

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-gray-600 text-sm">
          <a href="/" className="hover:text-blue-400 transition-colors">
            Home
          </a>
          <span>/</span>
          <a
            href="/collection"
            className="hover:text-blue-400 transition-colors"
          >
            Collection
          </a>
          <span>/</span>
          <span className="font-medium text-black">{productData.name}</span>
        </div>

        {/* Product Data */}
        <div className="flex lg:flex-row flex-col gap-8 lg:gap-12 bg-white shadow-lg rounded-2xl overflow-hidden">
          {/* Product Images */}
          <div className="lg:flex flex-1 lg:gap-4 p-6">
            <div className="flex lg:flex-col gap-3 mb-4 lg:mb-0 lg:w-24 overflow-x-auto lg:overflow-y-auto">
              {productData.image.map((item, index) => (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  key={index}
                  className={`flex-shrink-0 w-20 h-20 lg:w-full lg:h-24 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                    image === item
                      ? "border-blue-400 scale-105"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  alt=""
                />
              ))}
            </div>
            <div className="flex-1">
              <div className="group relative">
                <img
                  src={image}
                  className="rounded-xl w-full h-auto object-cover"
                  alt={productData.name}
                />
                {productData.bestSeller && (
                  <div className="top-4 left-4 absolute flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 shadow-lg px-4 py-2 rounded-full font-bold text-white text-sm">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Bestseller
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 p-6 lg:p-8">
            <div className="mb-2">
              <span className="inline-block bg-blue-400 px-3 py-1 rounded-full font-semibold text-white text-xs">
                {productData.category}
              </span>
            </div>

            <h1 className="mb-4 font-bold text-gray-900 text-3xl lg:text-4xl">
              {productData.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                <img src={assets.star_icon} alt="" className="w-5 h-5" />
                <img src={assets.star_icon} alt="" className="w-5 h-5" />
                <img src={assets.star_icon} alt="" className="w-5 h-5" />
                <img src={assets.star_icon} alt="" className="w-5 h-5" />
                <img src={assets.star_dull_icon} alt="" className="w-5 h-5" />
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="font-bold text-gray-900 text-4xl">
                {currency}
                {productData.price}
              </p>
              <p className="mt-1 text-gray-500 text-sm">
                Inclusive of all taxes
              </p>
            </div>

            {/* Description */}
            <p className="mb-6 text-gray-600 leading-relaxed">
              {productData.description}
            </p>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <p className="font-semibold text-gray-900">Select Size</p>
                <button className="text-blue-400 text-sm hover:underline">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {productData.sizes.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      item === size
                        ? "bg-black text-white scale-105 shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent hover:border-gray-300"
                    }`}
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <p className="mb-3 font-semibold text-gray-900">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange("decrement")}
                  className="flex justify-center items-center bg-gray-100 hover:bg-gray-200 rounded-lg w-10 h-10 font-semibold transition-colors"
                >
                  −
                </button>
                <span className="w-12 font-semibold text-lg text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("increment")}
                  className="flex justify-center items-center bg-gray-100 hover:bg-gray-200 rounded-lg w-10 h-10 font-semibold transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-6">
              <button
                onClick={handleAddToCart}
                className="flex justify-center items-center gap-2 bg-black hover:bg-blue-400 shadow-lg py-4 rounded-lg w-full font-semibold text-white hover:scale-105 transition-all transform"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                ADD TO CART
              </button>
            </div>

            {/* Product Features */}
            <div className="space-y-3 pt-6 border-t">
              <div className="flex items-center gap-3 text-sm">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-600">
                  100% Original Abasi Product
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-gray-600">
                  Cash On Delivery Available
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span className="text-gray-600">
                  Easy Return & Exchange within 7 Days
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
                <span className="text-gray-600">
                  Premium Packaging & Fast Delivery
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Description & Shipping Tabs */}
        <div className="bg-white shadow-lg mt-12 rounded-2xl overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("description")}
              className={`flex-1 px-6 py-4 font-semibold transition-all ${
                activeTab === "description"
                  ? "bg-black text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              className={`flex-1 px-6 py-4 font-semibold transition-all ${
                activeTab === "shipping"
                  ? "bg-black text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Shipping & Care
            </button>
          </div>

          <div className="p-8">
            {activeTab === "description" && (
              <div className="text-gray-600 leading-relaxed">
                <p>{productData.description}</p>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-6 text-gray-600">
                <div>
                  <h3 className="flex items-center gap-2 mb-3 font-semibold text-black">
                    <svg
                      className="w-5 h-5 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                      />
                    </svg>
                    Shipping Information
                  </h3>
                  <ul className="space-y-2 ml-7">
                   
                    <li>• Express shipping available at checkout</li>
                    <li>• Estimated delivery: 4-7 business days</li>
                  </ul>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 mb-3 font-semibold text-black">
                    <svg
                      className="w-5 h-5 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    Care Instructions
                  </h3>
                  <ul className="space-y-2 ml-7">
                    <li>• Machine wash cold with similar colors</li>
                    <li>• Do not bleach or use harsh detergents</li>
                    <li>• Tumble dry low or hang to dry</li>
                    <li>• Iron on low heat if needed</li>
                    <li>• Store in a cool, dry place</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
