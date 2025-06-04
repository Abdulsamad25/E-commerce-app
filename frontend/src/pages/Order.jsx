import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Order = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setorderData] = useState([]);

  const loadOrderData = async () => {
  try {
    if (!token) {
      return null
    }

    const response = await axios.post(
      backendUrl + "/api/order/userorders",
      {},
      { headers: { token } }
    );

    if (response.data.success) {
      let allOrdersItem = []
      response.data.orders.map((order) =>{
        order.items.map((item) =>{
          item['status'] = order.status
          item['payment'] = order.payment
          item['paymentMethod'] = order.paymentMethod
          item['date'] = order.date
          allOrdersItem.push(item)
        })
      })
      setorderData(allOrdersItem.reverse());
    } 
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  loadOrderData();
}, [token]);


  return (
    <div className="px-4 pt-16 border-t">
      <div className="mb-6 text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

     <div className="flex flex-col gap-6">
  {orderData.map((item, index) => (
    <div
      key={index}
      className="flex md:flex-row flex-col md:justify-between md:items-center gap-4 shadow-sm p-4 border-b"
    >
      {/* Product Info */}
      <div className="flex gap-4">
        <img src={item.image[0]} alt="" className="w-20 h-20 object-contain" />
        <div>
          <p className="font-medium">{item.name}</p>
          <div className="flex flex-wrap gap-4 mt-1 text-gray-700 text-sm">
            <p className="font-semibold">{currency}{item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Size: {item.size}</p>
          </div>
          <p className="mt-1 text-gray-500 text-sm">
            Date: {new Date(item.date).toDateString()}
          </p>
           <p className="mt-1 text-gray-500 text-sm">
            Payment: {item.paymentMethod}
          </p>
        </div>
      </div>

      {/* Order Status */}
      <div className="flex justify-between items-center mt-4 md:mt-0 md:w-1/2">
        <div className="flex items-center gap-2">
          <div className="bg-green-500 rounded-full w-2.5 h-2.5"></div>
          <p className="text-sm md:text-base">
            {item.status || "Processing"}
          </p>
        </div>
        <button className="hover:bg-gray-100 px-4 py-2 border rounded-sm font-medium text-sm cursor-pointer">
          Track Order
        </button>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default Order;
