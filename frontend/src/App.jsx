import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'

import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Prodct from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import Verify from './pages/Verify'
import ResetPassword from "./pages/ResetPassword"
import ForgotPassword from "./pages/ForgotPassword"

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import ScrollToTop from './components/ScrollToTop'
import VisitorTracker from './components/VisitorTracker'
import Loader from './components/Loader'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'

// Backend URL
const backendUrl =
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      // Small delay before showing content for smooth transition
      setTimeout(() => setShowContent(true), 100)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      {loading && <Loader />}

      <div 
        className={`transition-opacity duration-1000 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ToastContainer />
        <Analytics />
        <VisitorTracker backendUrl={backendUrl} />

        <Navbar />
        <ScrollToTop />

        <div>
          <SearchBar />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/collection' element={<Collection />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/product/:productId' element={<Prodct />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
            <Route path='/place-order' element={<PlaceOrder />} />
            <Route path='/orders' element={<Order />} />
            <Route path='/verify' element={<Verify />} />
          </Routes>

          <Footer/>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default App