/* eslint-disable no-unused-vars */
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Prodct from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import Navbar from './components/Navbar'
import './index.css'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import VisitorTracker from './components/VisitorTracker'

// Backend URL - make sure this matches your backend
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

const App = () => {
  return (
    <div>
      <ToastContainer/>
      {/* Visitor Analytics Tracker - Tracks all page visits */}
      <VisitorTracker backendUrl={backendUrl} />
      
      <Navbar/>
      <div>
        <SearchBar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/collection' element={<Collection/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/product/:productId' element={<Prodct/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/place-order' element={<PlaceOrder/>}/>
          <Route path='/orders' element={<Order/>}/>
          <Route path='/verify' element={<Verify/>}/>
        </Routes>
        <Footer/>
      </div>
    </div>
  )
}

export default App