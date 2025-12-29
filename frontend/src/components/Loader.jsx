import React, { useState, useEffect } from 'react'

const Loader = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-white">
      <div className="relative">
        {/* Animated orbital rings */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="border-2 border-black rounded-full w-32 h-16 animate-pulse"></div>
        </div>
        
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="opacity-60 border-2 border-blue-400 rounded-full w-40 h-20 animate-spin-slow"></div>
        </div>
        
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="opacity-30 border border-black rounded-full w-48 h-24 animate-spin-reverse"></div>
        </div>

        {/* Stars */}
        <div className="-top-2 left-12 absolute">
          <div className="bg-blue-400 w-2 h-2 animate-twinkle" style={{
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
          }}></div>
        </div>
        
        <div className="right-12 -bottom-2 absolute">
          <div className="bg-black w-2 h-2 animate-twinkle-delay" style={{
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
          }}></div>
        </div>

        {/* ABASI text */}
        <div className="z-10 relative px-8 py-4">
          <h1 className="font-bold text-black text-5xl tracking-wider animate-fade-in" 
              style={{ fontFamily: 'Arial Black, sans-serif' }}>
            ABASI
          </h1>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center gap-2 mt-4">
          <div className="bg-blue-400 rounded-full w-2 h-2 animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="bg-black rounded-full w-2 h-2 animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="bg-blue-400 rounded-full w-2 h-2 animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg) scale(1);
          }
          to {
            transform: rotate(360deg) scale(1.05);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes fade-in {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(0.8);
          }
        }

        @keyframes twinkle-delay {
          0%, 100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
          50% {
            opacity: 0.4;
            transform: scale(0.7) rotate(180deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 4s linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 2s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle 1.5s ease-in-out infinite;
        }

        .animate-twinkle-delay {
          animation: twinkle-delay 1.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default Loader