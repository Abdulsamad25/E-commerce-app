import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

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
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
