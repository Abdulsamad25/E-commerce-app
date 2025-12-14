import React from 'react'
import {assets} from "../assets/admin_assets/assets.js"

const Navbar = ({setToken}) => {
  return (
    <div className='flex justify-between items-center px-[4px]'>
      <img className='w-20' src={assets.abasi} alt="" />
      <button onClick={()=>setToken('')} className='bg-black px-5 sm:px-7 py-2 sm:py-2 rounded-full text-white text-xs sm:text-sm cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar
