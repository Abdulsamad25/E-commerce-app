import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("paystack");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          const quantity = cartItems[productId][size];

          if (quantity > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === productId)
            );

            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = quantity;
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      orderData.email = formData.email;

      switch (method) {
        case "cod": {
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          console.log(response.data);
          if (response.data.success) {
            toast.success("Order placed successfully!");
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        }
        // case "stripe": {
        //   const responseStripe = await axios.post(
        //     backendUrl + "/api/order/stripe",
        //     orderData,
        //     { headers: { token } }
        //   );
        //   if (responseStripe.data.success) {
        //     const { session_url } = responseStripe.data;
        //     window.location.replace(session_url);
        //   } else {
        //     toast.error(responseStripe.data.message);
        //   }
        //   break;
        // }
        case "paystack": {
          orderData.email = formData.email;
          const responsePaystack = await axios.post(
            backendUrl + "/api/order/paystack",
            orderData,
            { headers: { token } }
          );
          if (responsePaystack.data.success) {
            const paymentUrl = responsePaystack.data.authorization_url;
            if (paymentUrl) {
              window.location.href = paymentUrl;
            } else {
              toast.error("Payment URL not found");
            }
          } else {
            toast.error(responsePaystack.data.message);
          }
          break;
        }
        default:
          break;
      }
    } catch (error) {
      
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-gray-600 text-sm">
          <a href="/" className="hover:text-blue-400 transition-colors">
            Home
          </a>
          <span>/</span>
          <a href="/collection" className="hover:text-blue-400 transition-colors">
            Collection
          </a>
          <span>/</span>
          <a href="/cart" className="hover:text-blue-400 transition-colors">
            Cart
          </a>
          <span>/</span>
          <span className="font-medium text-black">Checkout</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <Title text1="CHECKOUT" text2="" />
          <p className="mt-2 text-gray-500">
            Complete your order details below
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="gap-8 grid grid-cols-1 lg:grid-cols-3">
          {/* Left Side - Delivery Information */}
          <div className="lg:col-span-2">
            <div className="bg-white mb-6 p-6 border border-gray-200 rounded-xl">
              <h2 className="flex items-center gap-2 mb-6 font-bold text-black text-xl">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Delivery Information
              </h2>

              <div className="space-y-4">
                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700 text-sm">
                      First Name *
                    </label>
                    <input
                      required
                      onChange={onChangeHandler}
                      name="firstName"
                      value={formData.firstName}
                      type="text"
                      placeholder="Enter first name"
                      className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg outline-none focus:ring-2 focus:ring-blue-400 w-full transition-all"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-gray-700 text-sm">
                      Last Name *
                    </label>
                    <input
                      required
                      onChange={onChangeHandler}
                      name="lastName"
                      value={formData.lastName}
                      type="text"
                      placeholder="Enter last name"
                      className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg outline-none focus:ring-2 focus:ring-blue-400 w-full transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    Email Address *
                  </label>
                  <input
                    required
                    onChange={onChangeHandler}
                    name="email"
                    value={formData.email}
                    type="email"
                    placeholder="your@email.com"
                    className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg outline-none focus:ring-2 focus:ring-blue-400 w-full transition-all"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    Street Address *
                  </label>
                  <input
                    required
                    onChange={onChangeHandler}
                    name="street"
                    value={formData.street}
                    type="text"
                    placeholder="House number and street name"
                    className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg outline-none focus:ring-2 focus:ring-blue-400 w-full transition-all"
                  />
                </div>

                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700 text-sm">
                      City *
                    </label>
                    <input
                      required
                      onChange={onChangeHandler}
                      name="city"
                      value={formData.city}
                      type="text"
                      placeholder="Enter city"
                      className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg outline-none focus:ring-2 focus:ring-blue-400 w-full transition-all"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-gray-700 text-sm">
                      State *
                    </label>
                    <input
                      required
                      onChange={onChangeHandler}
                      name="state"
                      value={formData.state}
                      type="text"
                      placeholder="Enter state"
                      className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg outline-none focus:ring-2 focus:ring-blue-400 w-full transition-all"
                    />
                  </div>
                </div>

                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700 text-sm">
                      Zip Code *
                    </label>
                    <input
                      required
                      onChange={onChangeHandler}
                      name="zipcode"
                      value={formData.zipcode}
                      type="number"
                      placeholder="Enter zip code"
                      className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg outline-none focus:ring-2 focus:ring-blue-400 w-full transition-all"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-gray-700 text-sm">
                      Country *
                    </label>
                    <input
                      required
                      onChange={onChangeHandler}
                      name="country"
                      value={formData.country}
                      type="text"
                      placeholder="Enter country"
                      className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg outline-none focus:ring-2 focus:ring-blue-400 w-full transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    Phone Number *
                  </label>
                  <input
                    required
                    onChange={onChangeHandler}
                    name="phone"
                    value={formData.phone}
                    type="number"
                    placeholder="Enter phone number"
                    className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg outline-none focus:ring-2 focus:ring-blue-400 w-full transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method - Mobile View */}
            <div className="lg:hidden bg-white p-6 border border-gray-200 rounded-xl">
              <h2 className="flex items-center gap-2 mb-6 font-bold text-black text-xl">
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
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                Payment Method
              </h2>

              <div className="space-y-3">
                {/* <div
                  onClick={() => setMethod("stripe")}
                  className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    method === "stripe"
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      method === "stripe"
                        ? "border-blue-400"
                        : "border-gray-300"
                    }`}
                  >
                    {method === "stripe" && (
                      <div className="bg-blue-400 rounded-full w-3 h-3"></div>
                    )}
                  </div>
                  <img src={assets.stripe_logo} alt="Stripe" className="h-6" />
                </div> */}

                <div
                  onClick={() => setMethod("paystack")}
                  className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    method === "paystack"
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      method === "paystack"
                        ? "border-blue-400"
                        : "border-gray-300"
                    }`}
                  >
                    {method === "paystack" && (
                      <div className="bg-blue-400 rounded-full w-3 h-3"></div>
                    )}
                  </div>
                  <img
                    src={assets.paystack_logo}
                    alt="Paystack"
                    className="h-6"
                  />
                </div>

                {/* <div
                  onClick={() => setMethod("cod")}
                  className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    method === "cod"
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      method === "cod" ? "border-blue-400" : "border-gray-300"
                    }`}
                  >
                    {method === "cod" && (
                      <div className="bg-blue-400 rounded-full w-3 h-3"></div>
                    )}
                  </div>
                  <span className="font-medium text-gray-700">
                    Cash on Delivery
                  </span>
                </div> */}
              </div>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:col-span-1">
            <div className="top-4 sticky bg-gray-50 p-6 border border-gray-200 rounded-xl">
              <h2 className="mb-6 font-bold text-black text-xl">
                Order Summary
              </h2>

              <CartTotal />

              {/* Payment Method - Desktop View */}
              <div className="hidden lg:block mt-8 pt-6 border-gray-200 border-t">
                <h3 className="flex items-center gap-2 mb-4 font-bold text-black text-lg">
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
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  Payment Method
                </h3>

                <div className="space-y-3">
                  {/* <div
                    onClick={() => setMethod("stripe")}
                    className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      method === "stripe"
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        method === "stripe"
                          ? "border-blue-400"
                          : "border-gray-300"
                      }`}
                    >
                      {method === "stripe" && (
                        <div className="bg-blue-400 rounded-full w-2.5 h-2.5"></div>
                      )}
                    </div>
                    <img
                      src={assets.stripe_logo}
                      alt="Stripe"
                      className="h-5"
                    />
                  </div> */}

                  <div
                    onClick={() => setMethod("paystack")}
                    className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      method === "paystack"
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        method === "paystack"
                          ? "border-blue-400"
                          : "border-gray-300"
                      }`}
                    >
                      {method === "paystack" && (
                        <div className="bg-blue-400 rounded-full w-2.5 h-2.5"></div>
                      )}
                    </div>
                    <img
                      src={assets.paystack_logo}
                      alt="Paystack"
                      className="h-5"
                    />
                  </div>

                  {/* <div
                    onClick={() => setMethod("cod")}
                    className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      method === "cod"
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        method === "cod"
                          ? "border-blue-400"
                          : "border-gray-300"
                      }`}
                    >
                      {method === "cod" && (
                        <div className="bg-blue-400 rounded-full w-2.5 h-2.5"></div>
                      )}
                    </div>
                    <span className="font-medium text-gray-700 text-sm">
                      Cash on Delivery
                    </span>
                  </div> */}
                </div>
              </div>

              <button
                type="submit"
                className="bg-black hover:bg-[#363636] shadow-lg hover:shadow-xl mt-6 px-6 py-4 rounded-lg w-full font-semibold text-white hover:scale-105 transition-all duration-300 transform"
              >
                Place Order
              </button>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-gray-200 border-t">
                <div className="flex justify-center items-center gap-2 text-gray-600 text-sm">
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span>Secure SSL Encrypted Payment</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;