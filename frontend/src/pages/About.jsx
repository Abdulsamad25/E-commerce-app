import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
   <div>
     <div className='pt-8 border-t text-2xl text-center'>
      <Title text1={'ABOUT'} text2={'US'}/>
    </div>
    <div className='flex md:flex-row flex-col gap-16 my-10'>
      <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="" />
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus est officia ipsum ipsam a, aut error minus et. Incidunt earum accusamus iure expedita assumenda animi dignissimos, neque officiis eum quidem. Quam suscipit ea est qui aliquid deleniti vero nam optio.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi ullam ratione veritatis quam suscipit sunt blanditiis, error quo optio, debitis ipsa saepe fugit sed amet dicta quia iste in nulla? Sequi est nihil ipsam, tempora voluptatibus at? Culpa, impedit ratione?</p>
        <b className="text-gray-800">Our Mission</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem accusantium quo sed! Officia tenetur obcaecati iste est praesentium exercitationem illo, temporibus totam voluptate dolores? Debitis ut minus quibusdam, sint totam provident amet dolores quo corporis similique eveniet ipsum tempore sequi.</p>
      </div>
    </div>
    <div className='py-4 text-2xl'>
      <Title text1={"WHY"} text2={"CHOOSE US"}/>
    </div>
    <div className='flex md:flex-row flex-col mb-20 text-sm'>
      <div className='flex flex-col gap-5 px-10 md:px-16 py-8 sm:py-20 border'>
        <b>Quality Assurance:</b>
        <p className='text-gray-500'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati, cumque.</p>
      </div>
       <div className='flex flex-col gap-5 px-10 md:px-16 py-8 sm:py-20 border'>
        <b>Convenience:</b>
        <p className='text-gray-500'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati, cumque.</p>
      </div>
       <div className='flex flex-col gap-5 px-10 md:px-16 py-8 sm:py-20 border'>
        <b>Exceptional Customer Service:</b>
        <p className='text-gray-500'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati, cumque.</p>
      </div>
    </div>
    <NewsletterBox/>
   </div>
  )
}

export default About
