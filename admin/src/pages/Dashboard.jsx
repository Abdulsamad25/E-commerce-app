/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const Dashboard = ({ token }) => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    totalRevenue: 0,
  });
  const [analytics, setAnalytics] = useState({
    totalVisits: 0,
    uniqueVisitors: 0,
    today: { visits: 0, unique: 0 },
    yesterday: { visits: 0 },
    week: { visits: 0, unique: 0 },
    month: { visits: 0, unique: 0 },
    recentVisitors: [],
    dailyStats: []
  });
  const [activeUsers, setActiveUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch orders
      const ordersResponse = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      // Fetch products
      const productsResponse = await axios.get(backendUrl + "/api/product/list");

      // Fetch analytics
      const analyticsResponse = await axios.get(
        backendUrl + "/api/analytics/stats",
        { headers: { token } }
      );

      // Fetch active users
      const activeResponse = await axios.get(
        backendUrl + "/api/analytics/active",
        { headers: { token } }
      );

      if (ordersResponse.data.success && productsResponse.data.success) {
        const orders = ordersResponse.data.orders;
        const products = productsResponse.data.products;

        // Calculate stats
        const pendingOrders = orders.filter(
          (order) => order.status !== "Delivered"
        ).length;
        const deliveredOrders = orders.filter(
          (order) => order.status === "Delivered"
        ).length;
        const totalRevenue = orders.reduce(
          (sum, order) => sum + (order.payment ? order.amount : 0),
          0
        );

        setStats({
          totalOrders: orders.length,
          totalProducts: products.length,
          pendingOrders,
          deliveredOrders,
          totalRevenue,
        });

        // Get 5 most recent orders
        const sortedOrders = orders.sort((a, b) => new Date(b.date) - new Date(a.date));
        setRecentOrders(sortedOrders.slice(0, 5));
      }

      if (analyticsResponse.data.success) {
        setAnalytics(analyticsResponse.data.analytics);
      }

      if (activeResponse.data.success) {
        setActiveUsers(activeResponse.data.activeUsers);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData();
      
      // Refresh active users every 30 seconds
      const interval = setInterval(async () => {
        try {
          const activeResponse = await axios.get(
            backendUrl + "/api/analytics/active",
            { headers: { token } }
          );
          if (activeResponse.data.success) {
            setActiveUsers(activeResponse.data.activeUsers);
          }
        } catch (error) {
          console.log(error);
        }
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="border-4 border-black border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Delivered Orders",
      value: stats.deliveredOrders,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  // Analytics cards
  const analyticsCards = [
    {
      title: "Total Visitors",
      value: analytics.uniqueVisitors,
      subtitle: `${analytics.totalVisits} total visits`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "blue"
    },
    {
      title: "Today's Visitors",
      value: analytics.today.unique,
      subtitle: `${analytics.today.visits} visits today`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: "green"
    },
    {
      title: "Active Now",
      value: activeUsers,
      subtitle: "Last 5 minutes",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
      ),
      color: "red",
      pulse: true
    },
    {
      title: "This Week",
      value: analytics.week.unique,
      subtitle: `${analytics.week.visits} visits`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: "purple"
    },
  ];

  const colorClasses = {
    blue: "bg-blue-50 text-blue-400 border-blue-400",
    green: "bg-green-50 text-green-400 border-green-400",
    red: "bg-red-50 text-red-400 border-red-400",
    purple: "bg-purple-50 text-purple-400 border-purple-400"
  };

  return (
    <div className="bg-white px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-bold text-black text-3xl">Dashboard Overview</h1>
          <p className="mt-2 text-gray-600">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>

        {/* Analytics Cards */}
        <div className="mb-8">
          <h2 className="mb-4 font-semibold text-gray-700 text-xl">Website Analytics</h2>
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {analyticsCards.map((card, index) => (
              <div
                key={index}
                className={`group relative bg-white shadow-lg hover:shadow-xl p-6 border-2 hover:border-${card.color}-400 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 transform ${card.pulse ? 'animate-pulse-slow' : ''}`}
              >
                <div className={`top-0 left-0 absolute bg-${card.color}-400 w-1 h-0 group-hover:h-full transition-all duration-300`}></div>
                
                <div className="flex justify-between items-start mb-4">
                  <div className={`${colorClasses[card.color]} p-3 rounded-xl transition-colors duration-300`}>
                    {card.icon}
                  </div>
                  {card.pulse && (
                    <span className="relative flex w-3 h-3">
                      <span className="inline-flex absolute bg-red-400 opacity-75 rounded-full w-full h-full animate-ping"></span>
                      <span className="inline-flex relative bg-red-500 rounded-full w-3 h-3"></span>
                    </span>
                  )}
                </div>
                <h3 className="mb-2 font-semibold text-gray-600 text-sm">
                  {card.title}
                </h3>
                <p className="font-bold text-black text-3xl">{card.value}</p>
                <p className="mt-1 text-gray-500 text-xs">{card.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8">
          <h2 className="mb-4 font-semibold text-gray-700 text-xl">Store Statistics</h2>
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat, index) => (
              <div
                key={index}
                className="group relative bg-white shadow-lg hover:shadow-xl p-6 border-2 border-gray-200 hover:border-blue-400 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 transform"
              >
                <div className="top-0 left-0 absolute bg-blue-400 w-1 h-0 group-hover:h-full transition-all duration-300"></div>
                
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-gray-100 group-hover:bg-blue-50 p-3 rounded-xl text-black group-hover:text-blue-400 transition-colors duration-300">
                    {stat.icon}
                  </div>
                </div>
                <h3 className="mb-2 font-semibold text-gray-600 text-sm">
                  {stat.title}
                </h3>
                <p className="font-bold text-black text-3xl">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Card */}
        <div className="group relative bg-black shadow-xl mb-8 p-8 rounded-xl overflow-hidden">
          <div className="top-0 left-0 absolute bg-blue-400 w-full h-1"></div>
          
          <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="mb-2 font-semibold text-gray-400 text-sm">
                Total Revenue
              </h2>
              <p className="font-bold text-white text-4xl">
                {currency}
                {stats.totalRevenue.toLocaleString()}
              </p>
              <p className="mt-2 text-gray-400 text-sm">
                From {stats.totalOrders} total orders
              </p>
            </div>
            <div className="bg-white bg-opacity-10 group-hover:bg-opacity-20 backdrop-blur-sm p-4 rounded-xl transition-all duration-300">
             <span className='font-semibold text-blue-400 text-4xl'>₦</span>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white shadow-lg mb-8 p-3 lg:p-6 border-2 border-gray-200 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-black text-sm lg:text-xl">Recent Orders</h2>
            <a
              href="/orders"
              className="flex items-center gap-1 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium text-blue-400 hover:text-blue-500 text-xs lg:text-sm transition-all duration-300"
            >
              View all
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>

          {recentOrders.length === 0 ? (
            <div className="py-12 text-gray-500 text-center">
              <svg
                className="mx-auto mb-4 w-16 h-16 text-gray-400"
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
              <p className="font-medium text-gray-600">No orders yet</p>
              <p className="mt-1 text-gray-500 text-sm">Orders will appear here once customers make purchases</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div
                  key={index}
                  className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 hover:bg-gray-50 p-4 border-2 border-gray-200 hover:border-blue-400 rounded-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex flex-shrink-0 justify-center items-center bg-blue-50 rounded-lg w-12 h-12">
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
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-black">
                        {order.address.firstName} {order.address.lastName}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {order.items.length} items • {order.paymentMethod}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex sm:flex-row flex-col items-start sm:items-center gap-3">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 ${
                        order.status === "Delivered"
                          ? "bg-white text-black border-black"
                          : order.status === "Shipped"
                          ? "bg-blue-50 text-blue-400 border-blue-400"
                          : "bg-gray-100 text-gray-700 border-gray-300"
                      }`}
                    >
                      {order.status}
                    </span>
                    <p className="font-bold text-black text-lg whitespace-nowrap">
                      {currency}
                      {order.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Visitors */}
        {analytics.recentVisitors.length > 0 && (
          <div className="bg-white shadow-lg p-3 lg:p-6 border-2 border-gray-200 rounded-xl">
            <h2 className="mb-6 font-bold text-black text-sm lg:text-xl">Recent Visitor Activity</h2>
            <div className="space-y-3">
              {analytics.recentVisitors.map((visitor, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center hover:bg-gray-50 p-3 border border-gray-200 rounded-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex flex-shrink-0 justify-center items-center bg-green-50 rounded-lg w-10 h-10">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-black text-sm">{visitor.page}</p>
                      <p className="text-gray-500 text-xs">
                        {new Date(visitor.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <span className="bg-gray-100 px-2 py-1 rounded text-gray-600 text-xs">
                    {visitor.ipAddress.substring(0, 15)}...
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;