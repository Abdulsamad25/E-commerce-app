import React from "react";
import axios from 'axios'
import { useState } from "react";
import { backendUrl } from "../App";
import {toast} from 'react-toastify'

const Login = ({setToken}) => {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loading, setLoading] = useState(false)

 const onSubmitHandler = async (e) => {
  try {
    e.preventDefault();
    setLoading(true);
    const response = await axios.post(backendUrl + '/api/user/admin', {
      email,
      password
    });
    
    if (response.data.success) {
      setToken(response.data.token)
      // Store login timestamp
      localStorage.setItem('loginTime', Date.now().toString());
      toast.success('Welcome back, Admin!');
    } else{
     toast.error(response.data.message)
    }
  } catch (error) {
    console.log(error);
     toast.error(error.message)
  } finally {
    setLoading(false);
  }
};


  return (
   <div className="flex justify-center items-center bg-white w-full min-h-screen">
     <div className="bg-white shadow-2xl px-8 py-10 border-2 border-gray-100 rounded-2xl max-w-md">
      <div className="mb-8 text-center">
        <div className="flex justify-center items-center bg-black mx-auto mb-4 rounded-full w-20 h-20">
          <svg
            className="w-10 h-10 text-white"
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
        </div>
        <h1 className="mb-2 font-bold text-black text-3xl">Admin Panel</h1>
        <p className="text-gray-600 text-sm">Sign in to manage your store</p>
      </div>

      <form onSubmit={onSubmitHandler} className="space-y-5">
        <div className="min-w-72">
          <label className="block mb-2 font-semibold text-black text-sm">
            Email Address
          </label>
          <div className="relative">
            <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
            <input
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              className="px-4 py-3 pl-10 border-2 border-gray-200 focus:border-blue-400 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 w-full transition-all"
              type="email"
              placeholder="admin@example.com"
              required
            />
          </div>
        </div>

        <div className="min-w-72">
          <label className="block mb-2 font-semibold text-black text-sm">
            Password
          </label>
          <div className="relative">
            <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
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
            </div>
            <input
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              className="px-4 py-3 pl-10 border-2 border-gray-200 focus:border-blue-400 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 w-full transition-all"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="flex justify-center items-center gap-2 bg-black hover:bg-gray-800 disabled:hover:bg-black disabled:opacity-50 shadow-lg hover:shadow-xl mt-6 px-4 py-3 rounded-lg w-full font-semibold text-white transition-all duration-300 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin"></div>
              Signing in...
            </>
          ) : (
            <>
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
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Sign In
            </>
          )}
        </button>
      </form>

      <div className="flex justify-center items-center gap-2 mt-6 pt-6 border-gray-200 border-t">
        <div className="flex items-center gap-1">
          <div className="bg-blue-400 rounded-full w-2 h-2"></div>
          <p className="text-gray-600 text-xs">
            Secure Admin Access
          </p>
        </div>
      </div>
    </div>
   </div>
  );
};

export default Login;