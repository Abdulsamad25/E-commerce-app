import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-gray-600 text-sm">
          <a href="/" className="hover:text-blue-400 transition-colors">Home</a>
          <span>/</span>
          <a href="/collection" className="hover:text-blue-400 transition-colors">Collection</a>
          <span>/</span>
          <span className="font-medium text-black">Cart</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <Title text1="YOUR" text2="CART" />
          <p className="mt-2 text-gray-500">
            {cartData.length} {cartData.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {cartData.length === 0 ? (
          /* Empty Cart State */
          <div className="flex flex-col justify-center items-center py-20">
            <div className="flex justify-center items-center bg-gray-100 mb-6 rounded-full w-24 h-24">
              <svg
                className="w-12 h-12 text-gray-400"
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
            </div>
            <h3 className="mb-2 font-semibold text-black text-2xl">
              Your cart is empty
            </h3>
            <p className="mb-8 text-gray-500">
              Add items to get started
            </p>
            <button
              onClick={() => navigate("/collection")}
              className="bg-black hover:bg-blue-400 px-8 py-3 rounded-lg font-medium text-white transition-colors duration-300"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="space-y-4 lg:col-span-2">
              {cartData.map((item, index) => {
                const productData = products.find(
                  (product) => product._id === item._id
                );

                if (!productData) return null;

                return (
                  <div
                    key={index}
                    className="group bg-white p-4 border border-gray-200 hover:border-blue-400 rounded-xl transition-all duration-300"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="relative flex-shrink-0 bg-gray-50 rounded-lg w-24 sm:w-32 h-24 sm:h-32 overflow-hidden">
                        <img
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          src={productData.image[0]}
                          alt={productData.name}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex flex-col flex-1 justify-between min-w-0">
                        <div>
                          <h3 className="mb-1 font-semibold text-black text-lg truncate">
                            {productData.name}
                          </h3>
                          <div className="flex items-center gap-4 mb-3">
                            <p className="font-bold text-black text-xl">
                              {currency}
                              {productData.price}
                            </p>
                            <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700 text-sm">
                              Size: {item.size}
                            </span>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3 bg-gray-100 p-1 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item._id,
                                  item.size,
                                  item.quantity - 1
                                )
                              }
                              className="flex justify-center items-center hover:bg-white rounded-md w-8 h-8 transition-colors duration-200"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M20 12H4"
                                />
                              </svg>
                            </button>
                            <span className="w-8 font-semibold text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item._id,
                                  item.size,
                                  item.quantity + 1
                                )
                              }
                              className="flex justify-center items-center hover:bg-white rounded-md w-8 h-8 transition-colors duration-200"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 4v16m8-8H4"
                                />
                              </svg>
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.size, 0)
                            }
                            className="hover:bg-red-50 p-2 rounded-lg text-red-500 hover:text-red-700 transition-all duration-200"
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="top-4 sticky bg-gray-50 p-6 border border-gray-200 rounded-xl">
                <h3 className="mb-6 font-bold text-black text-xl">
                  Order Summary
                </h3>
                
                <CartTotal />

                <button
                  onClick={() => navigate("/place-order")}
                  className="bg-black hover:bg-[#363636] shadow-lg hover:shadow-xl mt-6 px-6 py-4 rounded-lg w-full font-semibold text-white hover:scale-105 transition-all duration-300 transform"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => navigate("/collection")}
                  className="bg-white hover:bg-gray-100 mt-3 px-6 py-3 border border-gray-300 rounded-lg w-full font-medium text-black transition-colors duration-300"
                >
                  Continue Shopping
                </button>

                {/* Trust Badges */}
                <div className="space-y-3 mt-6 pt-6 border-gray-200 border-t">
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
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
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
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
                    <span>Free shipping over $50</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
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
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    <span>30-day return policy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;