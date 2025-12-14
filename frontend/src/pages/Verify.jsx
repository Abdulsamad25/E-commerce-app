import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
  const [searchParams] = useSearchParams()

  // const success = searchParams.get('success') 
  const orderId = searchParams.get('orderId')
  const gateway = searchParams.get('gateway') // paystack
  const reference = searchParams.get('reference') // for paystack

  const verifyPayment = async () => {
    try {
      if (!token || !orderId) {
        console.log('Missing token or orderId')
        return
      }

      if (gateway === 'paystack') {
        console.log('Verifying Paystack payment...', { reference, orderId })
        
        const response = await axios.post(
          `${backendUrl}/api/order/verifyPaystack`, // Changed route
          { reference, orderId }, // Removed userId - comes from token
          { headers: { token } }
        )

        if (response.data.success) {
          setCartItems({})
          toast.success('Payment verified successfully!')
          navigate('/orders')
        } else {
          toast.error(response.data.message || 'Payment verification failed')
          navigate('/cart')
        }
      }

      // Keep Stripe commented out since you're only using Paystack
      /*
      if (gateway === 'stripe') {
        const response = await axios.post(
          `${backendUrl}/api/order/verifyStripe`,
          { success, orderId },
          { headers: { token } }
        )

        if (response.data.success) {
          toast.success('Stripe payment successful!')
          setCartItems({})
          navigate('/orders')
        } else {
          toast.error('Stripe payment failed.')
          navigate('/cart')
        }
      }
      */
    } catch (error) {
      console.log('Verification error:', error)
      toast.error(error.response?.data?.message || error.message || 'Verification error')
      navigate('/cart')
    }
  }

  useEffect(() => {
    verifyPayment()
  }, [token])

  return (
    <div className="flex justify-center items-center bg-white min-h-screen">
      <div className="text-center">
        <div className="mx-auto mb-4 border-4 border-gray-200 border-t-blue-400 rounded-full w-16 h-16 animate-spin"></div>
        <p className="mb-2 font-semibold text-black text-xl">Verifying Payment</p>
        <p className="text-gray-500">Please wait while we confirm your transaction...</p>
      </div>
    </div>
  )
}

export default Verify