import React from 'react'
import {assets} from "../assets/admin_assets/assets.js"

const Navbar = ({setToken}) => {
  return (
    <div className='flex justify-between items-center px-[4px] py-2'>
      <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
      <button onClick={()=>setToken('')} className='bg-gray-600 px-5 sm:px-7 py-2 sm:py-2 rounded-full text-white text-xs sm:text-sm cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar
