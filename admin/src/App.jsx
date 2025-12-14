/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Login from "./components/Login";
import Edit from "./pages/Edit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "₦";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  // Auto-logout after 1 hour of inactivity
  useEffect(() => {
    const checkTokenExpiry = () => {
      const loginTime = localStorage.getItem('loginTime');
      const storedToken = localStorage.getItem('token');
      
      if (storedToken && loginTime) {
        const currentTime = Date.now();
        const timeElapsed = currentTime - parseInt(loginTime);
        const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
        
        if (timeElapsed > oneHour) {
          // Token expired - logout admin
          localStorage.removeItem('token');
          localStorage.removeItem('loginTime');
          setToken('');
          toast.info('Session expired. Please login again.');
        }
      }
    };

    // Check immediately on mount
    checkTokenExpiry();

    // Check every 5 minutes
    const interval = setInterval(checkTokenExpiry, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Reset timer on user activity
  useEffect(() => {
    const resetLoginTime = () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        localStorage.setItem('loginTime', Date.now().toString());
      }
    };

    // Reset timer on user activity
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      window.addEventListener(event, resetLoginTime);
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetLoginTime);
      });
    };
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          {/* Navbar */}
          <div className="top-0 right-0 left-0 z-20 fixed bg-white shadow">
            <Navbar setToken={setToken} />
          </div>

          {/* Layout below Navbar */}
          <div className="flex pt-16 w-full">
            {/* Sidebar (fixed) */}
            <div className="top-16 left-0 z-10 fixed bg-white border-r w-16 md:w-[18%] h-[calc(100vh-64px)]">
              <Sidebar />
            </div>

            {/* Main Content */}
            <div className="ml-16 md:ml-[18%] px-4 py-8 w-full text-gray-600 text-base">
              <Routes>
                <Route path="/" element={<Dashboard token={token} />} />
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="/settings" element={<Settings token={token} setToken={setToken} />} />
                <Route path="/admin/edit/:id" element={<Edit token={token} />} />

              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;