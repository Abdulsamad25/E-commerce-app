import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'

const Home = () => {
  return (
    <div className="animate-fadeIn">
      <div className="animate-slideUp" style={{ animationDelay: '0.1s' }}>
        <Hero/>
      </div>
      <div className="animate-slideUp" style={{ animationDelay: '0.2s' }}>
        <LatestCollection/>
      </div>
      <div className="animate-slideUp" style={{ animationDelay: '0.3s' }}>
        <BestSeller/>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideUp {
          opacity: 0;
          animation: slideUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default Home