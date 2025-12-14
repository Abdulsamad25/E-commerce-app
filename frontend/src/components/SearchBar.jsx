import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const {search,setSearch, showSearch, setShowSearch} = useContext(ShopContext);
  const location = useLocation();
  const [visible, setVisible] = useState(false)

  useEffect(()=>{
    if (location.pathname.includes('collection')){
        setVisible(true);
    }
    else{
      setVisible(false);
    }
  },[location])

  return showSearch && visible ?  (
    <div className='bg-black border-t border-b text-center'>
      <div className='inline-flex justify-center items-center mx-3 my-5 px-5 py-2 border border-gray-400 rounded-full w-3/4 sm:w-1/2'>
      <input value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 bg-inherit outline-none text-white text-sm' type="text" placeholder='Search'/>
      <img src={assets.search_icon} className='invert w-4' alt="" />
      </div>
      <img onClick={()=>setShowSearch(false)} src={assets.cross_icon} className='inline invert w-4 cursor-pointer' alt="" />
    </div>
  ) : null
}

export default SearchBar
