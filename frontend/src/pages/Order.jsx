import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";


const Order = () => {
  const { backendUrl, token, currency, navigate } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trackingModal, setTrackingModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const loadOrderData = async () => {
    try {
      if (!token) {
        setLoading(false);
        return null;
      }


     
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
        setLoading(false);
      }
  
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700 border-green-300";
      case "out for delivery":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "shipped":
        return "bg-purple-100 text-purple-700 border-purple-300";
      case "packing":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusDot = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-500";
      case "out for delivery":
        return "bg-blue-500";
      case "shipped":
        return "bg-purple-500";
      case "packing":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleTrackOrder = (order) => {
    setSelectedOrder(order);
    setTrackingModal(true);
  };

  const getTrackingSteps = (status) => {
    const steps = [
      { label: "Order Placed", status: "completed" },
      {
        label: "Packing",
        status:
          status?.toLowerCase() === "packing" ||
          status?.toLowerCase() === "shipped" ||
          status?.toLowerCase() === "out for delivery" ||
          status?.toLowerCase() === "delivered"
            ? "completed"
            : "pending",
      },
      {
        label: "Shipped",
        status:
          status?.toLowerCase() === "shipped" ||
          status?.toLowerCase() === "out for delivery" ||
          status?.toLowerCase() === "delivered"
            ? "completed"
            : "pending",
      },
      {
        label: "Out for Delivery",
        status:
          status?.toLowerCase() === "out for delivery" ||
          status?.toLowerCase() === "delivered"
            ? "completed"
            : "pending",
      },
      {
        label: "Delivered",
        status: status?.toLowerCase() === "delivered" ? "completed" : "pending",
      },
    ];

    if (status?.toLowerCase() === "cancelled") {
      return [
        { label: "Order Placed", status: "completed" },
        { label: "Cancelled", status: "cancelled" },
      ];
    }

    return steps;
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
          <span className="font-medium text-black">My Orders</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <Title text1="MY" text2="ORDERS" />
          <p className="mt-2 text-gray-500">
            Track and manage your order history
          </p>
        </div>

        {loading ? (
          /* Loading State */
          <div className="flex flex-col justify-center items-center py-20">
            <div className="mb-4 border-4 border-gray-200 border-t-blue-400 rounded-full w-16 h-16 animate-spin"></div>
            <p className="text-gray-500">Loading your orders...</p>
          </div>
        ) : orderData.length === 0 ? (
          /* Empty State */
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-black text-2xl">
              No orders yet
            </h3>
            <p className="mb-8 text-gray-500">
              Start shopping to see your orders here
            </p>
            <button
              onClick={() => navigate("/collection")}
              className="bg-black hover:bg-[#363636] px-8 py-3 rounded-lg font-medium text-white transition-colors duration-300 cursor-pointer"
            >
              Browse Products
            </button>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-4">
            {orderData.map((item, index) => (
              <div
                key={index}
                className="bg-white hover:shadow-lg p-6 border border-gray-200 hover:border-blue-400 rounded-xl transition-all duration-300"
              >
                <div className="flex lg:flex-row flex-col lg:items-center gap-6">
                  {/* Product Image & Info */}
                  <div className="flex flex-1 gap-4">
                    <div className="relative flex-shrink-0 bg-gray-50 rounded-lg w-24 h-24 overflow-hidden">
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="mb-2 font-semibold text-black text-lg truncate">
                        {item.name}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="font-bold text-black text-base">
                          {currency}
                          {item.price}
                        </span>
                        <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                          Qty: {item.quantity}
                        </span>
                        {item.size !== "N/A" && (
                          <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                            Size: {item.size}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 mt-3 text-gray-600 text-sm">
                        <div className="flex items-center gap-1.5">
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>{new Date(item.date).toDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <svg
                            className="w-4 h-4 text-gray-400"
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
                          <span>{item.paymentMethod}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex sm:flex-row flex-col lg:flex-col items-start sm:items-center lg:items-end gap-4 lg:w-64">
                    <div
                      className={`px-4 py-2 rounded-lg border-2 flex items-center gap-2 ${getStatusColor(
                        item.status
                      )}`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${getStatusDot(
                          item.status
                        )}`}
                      ></div>
                      <span className="font-semibold text-sm">
                        {item.status || "Order Placed"}
                      </span>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => handleTrackOrder(item)}
                        className="flex-1 sm:flex-none bg-white hover:bg-blue-50 px-4 py-2 border-2 border-gray-300 hover:border-blue-400 rounded-lg font-medium text-black transition-all duration-200 cursor-pointer"
                      >
                        Track Order
                      </button>
                      {item.status?.toLowerCase() === "delivered" && (
                        <button
                          onClick={() => navigate("/collection")}
                          className="flex-1 sm:flex-none bg-blue-400 hover:bg-black px-4 py-2 rounded-lg font-medium text-white transition-all duration-200"
                        >
                          Reorder
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      
      </div>

      {/* Tracking Modal */}
      {trackingModal && selectedOrder && (
        <div
          className="z-50 fixed inset-0 flex justify-center items-center bg-white/10 shadow-lg backdrop-blur-xl p-4 border border-white/20"
          onClick={() => setTrackingModal(false)}
        >
          <div
            className="bg-white bg-opacity-95 shadow-2xl backdrop-blur-xl border border-white border-opacity-20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="top-0 sticky bg-white bg-opacity-90 backdrop-blur-md p-6 border-gray-200 border-b border-opacity-50 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-black text-2xl">
                    Track Your Order
                  </h2>
                  <p className="mt-1 text-gray-500 text-sm">
                    Real-time order tracking
                  </p>
                </div>
                <button
                  onClick={() => setTrackingModal(false)}
                  className="flex justify-center items-center hover:bg-gray-100 rounded-full w-10 h-10 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Order Details Card */}
              <div className="bg-gray-50 mb-6 p-4 border border-gray-200 rounded-xl">
                <div className="flex gap-4">
                  <img
                    src={selectedOrder.image[0]}
                    alt={selectedOrder.name}
                    className="bg-white rounded-lg w-20 h-20 object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="mb-1 font-semibold text-black">
                      {selectedOrder.name}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-gray-600 text-sm">
                      <span className="font-semibold text-black">
                        {currency}
                        {selectedOrder.price}
                      </span>
                      <span>Qty: {selectedOrder.quantity}</span>
                      {selectedOrder.size !== "N/A" && (
                        <span>Size: {selectedOrder.size}</span>
                      )}
                    </div>
                    <p className="mt-2 text-gray-500 text-xs">
                      Order Date: {new Date(selectedOrder.date).toDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tracking Timeline */}
              <div className="space-y-6">
                <h3 className="mb-4 font-bold text-black text-lg">
                  Order Status
                </h3>

                {getTrackingSteps(selectedOrder.status).map(
                  (step, index, array) => (
                    <div key={index} className="flex gap-4">
                      {/* Timeline Line */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step.status === "completed"
                              ? "bg-blue-400 text-white"
                              : step.status === "cancelled"
                              ? "bg-red-500 text-white"
                              : "bg-gray-200 text-gray-400"
                          }`}
                        >
                          {step.status === "completed" ? (
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
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : step.status === "cancelled" ? (
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
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          ) : (
                            <div className="bg-gray-400 rounded-full w-3 h-3"></div>
                          )}
                        </div>
                        {index < array.length - 1 && (
                          <div
                            className={`w-0.5 h-16 ${
                              step.status === "completed"
                                ? "bg-blue-400"
                                : "bg-gray-200"
                            }`}
                          ></div>
                        )}
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 pb-6">
                        <h4
                          className={`font-semibold mb-1 ${
                            step.status === "completed"
                              ? "text-black"
                              : step.status === "cancelled"
                              ? "text-red-600"
                              : "text-gray-400"
                          }`}
                        >
                          {step.label}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          {step.status === "completed" &&
                            step.label === "Order Placed" &&
                            `Your order was placed on ${new Date(
                              selectedOrder.date
                            ).toDateString()}`}
                          {step.status === "completed" &&
                            step.label === "Packing" &&
                            "Your order is being packed"}
                          {step.status === "completed" &&
                            step.label === "Shipped" &&
                            "Your order has been shipped"}
                          {step.status === "completed" &&
                            step.label === "Out for Delivery" &&
                            "Your order is on the way"}
                          {step.status === "completed" &&
                            step.label === "Delivered" &&
                            "Your order has been delivered"}
                          {step.status === "cancelled" &&
                            "Your order was cancelled"}
                          {step.status === "pending" && "Pending"}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-gray-200 border-t">
                <div className="gap-4 grid grid-cols-2 text-sm">
                  <div>
                    <p className="mb-1 text-gray-500">Payment Method</p>
                    <p className="font-semibold text-black">
                      {selectedOrder.paymentMethod}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-gray-500">Payment Status</p>
                    <p
                      className={`font-semibold ${
                        selectedOrder.payment
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {selectedOrder.payment ? "Paid" : "Pending"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setTrackingModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-lg font-medium text-black transition-colors"
                >
                  Close
                </button>
                {selectedOrder.status?.toLowerCase() !== "delivered" &&
                  selectedOrder.status?.toLowerCase() !== "cancelled" && (
                    <button
                      onClick={() => {
                        setTrackingModal(false);
                        navigate("/contact");
                      }}
                      className="flex-1 bg-blue-400 hover:bg-black px-6 py-3 rounded-lg font-medium text-white transition-colors"
                    >
                      Contact Support
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;