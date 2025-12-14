import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'

const About = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-black px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-3 font-bold text-4xl md:text-5xl">ABOUT ABASI</h1>
          <div className="bg-blue-400 mx-auto mb-4 w-24 h-1"></div>
          <p className="mx-auto max-w-2xl text-gray-300">
            Redefining fashion with timeless elegance and modern sophistication
          </p>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-7xl">
        {/* Our Story Section */}
        <div className="flex md:flex-row flex-col items-center gap-12 mb-20">
          <img 
            src={assets.abasi} 
            className="shadow-2xl rounded-2xl w-full md:w-1/2 object-cover" 
            alt="About Abasi" 
          />
          <div className="flex flex-col gap-6 md:w-1/2">
            <h2 className="font-bold text-gray-900 text-3xl">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Abasi was born from a passion to create fashion that transcends trends and celebrates 
              individuality. Founded with a vision to merge contemporary design with timeless craftsmanship, 
              we've built a brand that speaks to those who appreciate quality and authenticity.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every piece in our collection tells a story of meticulous attention to detail, from the 
              selection of premium fabrics to the final stitch. We believe that clothing should not only 
              look exceptional but feel extraordinary, empowering you to express your unique style with confidence.
            </p>
            <div className="bg-blue-50 p-6 border-blue-400 border-l-4 rounded-r-lg">
              <h3 className="mb-3 font-bold text-gray-900 text-xl">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To revolutionize the fashion industry by creating sustainable, high-quality garments that 
                empower individuals to express their authentic selves. We're committed to ethical practices, 
                exceptional craftsmanship, and designs that stand the test of time.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
          <div className="mb-12 text-center">
            <h2 className="mb-3 font-bold text-3xl md:text-4xl">WHY CHOOSE ABASI</h2>
            <div className="bg-blue-400 mx-auto w-24 h-1"></div>
          </div>

          <div className="gap-0 grid grid-cols-1 md:grid-cols-3">
            <div className="group bg-white hover:shadow-xl p-8 lg:p-12 border border-gray-200 transition-all duration-300">
              <div className="mb-6">
                <div className="flex justify-center items-center bg-blue-400 rounded-full w-16 h-16 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-4 font-bold text-gray-900 text-xl">Quality Assurance</h3>
              <p className="text-gray-600 leading-relaxed">
                Every Abasi piece undergoes rigorous quality control. We source only the finest materials 
                and employ skilled artisans who share our commitment to excellence, ensuring that each 
                garment meets our exacting standards.
              </p>
            </div>

            <div className="group bg-white hover:shadow-xl p-8 lg:p-12 border border-gray-200 transition-all duration-300">
              <div className="mb-6">
                <div className="flex justify-center items-center bg-blue-400 rounded-full w-16 h-16 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-4 font-bold text-gray-900 text-xl">Convenience</h3>
              <p className="text-gray-600 leading-relaxed">
                Shop seamlessly from anywhere with our intuitive online platform. Enjoy fast, reliable 
                shipping, easy returns, and a hassle-free shopping experience designed to save you time 
                while delivering premium fashion to your doorstep.
              </p>
            </div>

            <div className="group bg-white hover:shadow-xl p-8 lg:p-12 border border-gray-200 transition-all duration-300">
              <div className="mb-6">
                <div className="flex justify-center items-center bg-blue-400 rounded-full w-16 h-16 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-4 font-bold text-gray-900 text-xl">Exceptional Customer Service</h3>
              <p className="text-gray-600 leading-relaxed">
                Our dedicated team is here to ensure your complete satisfaction. From personalized styling 
                advice to responsive support, we're committed to making your Abasi experience memorable 
                and exceeding your expectations every step of the way.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-black shadow-2xl p-8 lg:p-16 rounded-2xl text-white">
          <h2 className="mb-8 font-bold text-3xl md:text-4xl text-center">Our Core Values</h2>
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {/* Excellence */}
            <div className="text-center">
              <div className="flex justify-center items-center bg-opacity-20 mx-auto mb-4 rounded-full w-16 h-16">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="mb-2 font-bold">Excellence</h3>
              <p className="text-gray-300 text-sm">Uncompromising quality in every detail</p>
            </div>

            {/* Sustainability */}
            <div className="text-center">
              <div className="flex justify-center items-center bg-opacity-20 mx-auto mb-4 rounded-full w-16 h-16">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="mb-2 font-bold">Sustainability</h3>
              <p className="text-gray-300 text-sm">Committed to ethical and eco-friendly practices</p>
            </div>

            {/* Authenticity */}
            <div className="text-center">
              <div className="flex justify-center items-center bg-opacity-20 mx-auto mb-4 rounded-full w-16 h-16">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-2 font-bold">Authenticity</h3>
              <p className="text-gray-300 text-sm">Celebrating individual style and expression</p>
            </div>

            {/* Community */}
            <div className="text-center">
              <div className="flex justify-center items-center bg-yellow-400 bg-opacity-20 mx-auto mb-4 rounded-full w-16 h-16">
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mb-2 font-bold">Community</h3>
              <p className="text-gray-300 text-sm">Building lasting relationships with our customers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About