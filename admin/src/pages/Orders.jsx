/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [expandedOrders, setExpandedOrders] = useState({});

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
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
        toast.success("Order status updated!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const toggleOrderItems = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Order Placed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Packing":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Shipped":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Out for delivery":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const filteredOrders = filter === "All" 
    ? orders 
    : orders.filter(order => order.status === filter);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="border-4 border-black border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="font-bold text-black text-3xl">Orders Management</h1>
              <p className="mt-2 text-gray-600">
                Track and manage all customer orders
              </p>
            </div>
            <div className="flex items-center gap-3 bg-blue-50 shadow-sm px-6 py-3 border border-blue-200 rounded-xl">
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="font-semibold text-black text-lg">
                {filteredOrders.length} {filteredOrders.length === 1 ? 'Order' : 'Orders'}
              </span>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {["All", "Order Placed", "Packing", "Shipped", "Out for delivery", "Delivered"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  filter === status
                    ? "bg-black text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-blue-400 hover:text-blue-400"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="flex flex-col justify-center items-center bg-gray-50 py-16 border-2 border-gray-200 border-dashed rounded-xl">
            <svg
              className="mb-4 w-16 h-16 text-gray-400"
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
            <p className="font-medium text-gray-600 text-lg">No orders found</p>
            <p className="mt-1 text-gray-500 text-sm">Orders will appear here once customers make purchases</p>
          </div>
        ) : (
          <div className="gap-6 grid grid-cols-1">
            {filteredOrders.map((order, index) => (
              <div
                key={index}
                className="bg-white shadow-lg hover:shadow-xl border border-gray-200 hover:border-blue-400 rounded-xl overflow-hidden transition-all duration-300"
              >
                <div className="flex sm:flex-row flex-col gap-6 p-6">
                  {/* Icon Section */}
                  <div className="flex sm:justify-center items-start">
                    <div className="flex justify-center items-center bg-blue-50 rounded-xl w-16 h-16">
                      <img
                        src={assets.parcel_icon}
                        alt="Parcel"
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                  </div>

                  {/* Order Details Grid */}
                  <div className="flex-1 gap-6 grid grid-cols-1 md:grid-cols-3">
                    {/* Customer & Address */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-3">
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
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <h3 className="font-bold text-black">Customer Details</h3>
                      </div>
                      <p className="font-semibold text-black text-lg">
                        {order.address.firstName} {order.address.lastName}
                      </p>
                      <div className="text-gray-600 text-sm">
                        <p>{order.address.street}</p>
                        <p>
                          {order.address.city}, {order.address.state}
                        </p>
                        <p>
                          {order.address.country}, {order.address.zipcode}
                        </p>
                        <p className="flex items-center gap-1 mt-2">
                          <svg
                            className="w-4 h-4 text-blue-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          {order.address.phone}
                        </p>
                      </div>
                    </div>

                    {/* Order Info */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
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
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <h3 className="font-bold text-black">Order Information</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <button
                            onClick={() => toggleOrderItems(order._id)}
                            className="flex justify-between items-center hover:bg-blue-50 p-2 rounded-lg w-full transition-colors"
                          >
                            <span className="text-gray-600">Items:</span>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-black">{order.items.length}</span>
                              <svg
                                className={`w-4 h-4 text-blue-400 transition-transform ${
                                  expandedOrders[order._id] ? 'rotate-180' : ''
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                          </button>

                          {/* Expanded Items List */}
                          {expandedOrders[order._id] && (
                            <div className="space-y-2 bg-gray-50 mt-2 p-3 border border-gray-200 rounded-lg">
                              {order.items.map((item, itemIndex) => (
                                <div
                                  key={itemIndex}
                                  className="flex justify-between items-start gap-3 bg-white p-2 rounded-lg text-xs"
                                >
                                  <div className="flex-1">
                                    <p className="font-semibold text-black">{item.name}</p>
                                    <p className="text-gray-600">
                                      Size: {item.size} | Qty: {item.quantity}
                                    </p>
                                    {item.color && (
                                      <p className="text-gray-600">Color: {item.color}</p>
                                    )}
                                  </div>
                                  <p className="font-semibold text-black whitespace-nowrap">
                                    {currency}{(item.price * item.quantity).toLocaleString()}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <p className="flex justify-between">
                          <span className="text-gray-600">Payment Method:</span>
                          <span className="font-semibold text-black">{order.paymentMethod}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-600">Payment Status:</span>
                          <span className={`font-semibold ${order.payment ? 'text-green-600' : 'text-orange-600'}`}>
                            {order.payment ? "Paid" : "Pending"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-600">Order Date:</span>
                          <span className="font-semibold text-black">
                            {new Date(order.date).toLocaleDateString()}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Amount & Status */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-3">
                       <span className='font-semibold text-lg'>₦</span>
                        <h3 className="font-bold text-black">Total Amount</h3>
                      </div>
                      <p className="font-bold text-black text-3xl">
                        {currency}{order.amount.toLocaleString()}
                      </p>

                      <div className="mt-4">
                        <label className="block mb-2 font-medium text-black text-sm">
                          Order Status
                        </label>
                        <select
                          onChange={(event) => statusHandler(event, order._id)}
                          className={`w-full px-4 py-3 border-2 rounded-lg font-semibold text-sm cursor-pointer transition-all ${getStatusColor(order.status)}`}
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;