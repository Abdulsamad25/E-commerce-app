import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className="items-start gap-6 grid grid-cols-1 md:grid-cols-[80px_1fr_1fr_auto_auto] shadow-sm my-3 md:my-4 mb-6 p-5 md:p-8 text-gray-700"
          >
            {/* Image */}
            <img
              src={assets.parcel_icon}
              alt="Parcel Icon"
              className="justify-self-start w-12 object-contain"
            />

            {/* Address details */}
            <div className="flex flex-col gap-y-1 text-sm md:text-base">
              <p className="font-semibold">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className="text-gray-600">
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}, {order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>

            {/* Order info */}
            <div className="flex flex-col gap-y-1 text-sm md:text-base">
              <p>
                <span className="font-semibold">Items:</span>{" "}
                {order.items.length}
              </p>
              <p>
                <span className="font-semibold">Method:</span>{" "}
                {order.paymentMethod}
              </p>
              <p>
                <span className="font-semibold">Payment:</span>{" "}
                {order.payment ? "Done" : "Pending"}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>

            {/* Amount */}
            <div className="flex flex-col justify-self-center gap-y-1">
              <p className="font-bold text-gray-900">
                {currency}
                {order.amount}
              </p>
            </div>

            {/* Select */}
            <div className="flex flex-col justify-self-end gap-y-1">
              <select
                onChange={(event) => statusHandler(event, order._id)}
                className="px-3 py-1 border border-gray-300 hover:border-gray-500 rounded text-sm cursor-pointer"
                value={order.status}
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Orders;
