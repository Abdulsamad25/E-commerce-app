import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col gap-14 sm:grid sm:grid-cols-[3fr_1fr_1fr] my-10 mt-40 text-sm'>
        <div>
          <img src={assets.logo} className='mb-5 w-32' alt="" />
          <p className='w-full md:w-2/3 text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, dignissimos?
          </p>
        </div>
        <div>
          <p className='mb-5 font-medium text-xl'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-700'>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Our Policy</li>
          </ul>
        </div>
        <div>
          <p className='mb-5 font-medium text-xl'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1'>
            <li>+1-234-567-8910</li>
            <li>contact@foreveryou.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>
          Copyright 2025@ forever.com - All Rights Reserved
        </p>
      </div>
    </div>
  )
}

export default Footer
