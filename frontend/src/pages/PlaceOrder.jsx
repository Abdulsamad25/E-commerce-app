import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
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
        //Api calls for cod
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
        case "stripe":
          {
            const responseStripe = await axios.post(
              backendUrl + "/api/order/stripe",
              orderData,
              { headers: { token } }
            );
            if (responseStripe.data.success) {
              const { session_url } = responseStripe.data;
              window.location.replace(session_url);
            } else {
              toast.error(responseStripe.data.message);
            }
          }
          break;

        case "paystack": {
          // Ensure email is included (Paystack requires it)
          orderData.email = formData.email;

          const responsePaystack = await axios.post(
            backendUrl + "/api/order/paystack",
            orderData,
            { headers: { token } }
          );

          if (responsePaystack.data.success) {
            const paymentUrl = responsePaystack.data.authorization_url; // <-- use this key
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
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex sm:flex-row flex-col justify-between gap-4 pt-5 sm:pt-14 border-t min-h-[80vh]"
    >
      {/* {Left Side} */}
      <div className="flex flex-col gap-4 w-fullsm:max-w-[480px]">
        <div className="my-3 text-xl sm:text-2xl">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            placeholder="First Name"
            className="px-3.5 py-1.5 border border-gray-300 w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            placeholder="Last Name"
            className="px-3.5 py-1.5 border border-gray-300 w-full"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          type="email"
          placeholder="Email Address"
          className="px-3.5 py-1.5 border border-gray-300 w-full"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          placeholder="Street"
          className="px-3.5 py-1.5 border border-gray-300 w-full"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            type="text"
            placeholder="City"
            className="px-3.5 py-1.5 border border-gray-300 w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            placeholder="State"
            className="px-3.5 py-1.5 border border-gray-300 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            type="number"
            placeholder="Zip Code"
            className="px-3.5 py-1.5 border border-gray-300 w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            type="text"
            placeholder="Country"
            className="px-3.5 py-1.5 border border-gray-300 w-full"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          type="number"
          placeholder="Phone"
          className="px-3.5 py-1.5 border border-gray-300 w-full"
        />
      </div>

      {/* {Right Side} */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* {Payment Method Selection} */}
          <div className="flex lg:flex-row flex-col gap-3">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 p-2 px-3 border cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }  `}
              ></p>
              <img src={assets.stripe_logo} alt="" className="mx-4 h-5" />
            </div>
            <div
              onClick={() => setMethod("paystack")}
              className="flex items-center gap-3 p-2 px-3 border cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "paystack" ? "bg-green-400" : ""
                }  `}
              ></p>
              <img src={assets.paystack_logo} alt="" className="mx-4 h-5" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 p-2 px-3 border cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }  `}
              ></p>
              <p className="mx-4 font-medium text-gray-500 text-sm">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="mt-8 w-full text-end">
            <button
              type="submit"
              className="bg-black px-16 py-3 text-white text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
