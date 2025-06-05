import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
  const [searchParams] = useSearchParams()

  const success = searchParams.get('success') // for stripe
  const orderId = searchParams.get('orderId')
  const gateway = searchParams.get('gateway') // stripe or paystack
  const reference = searchParams.get('reference') // for paystack

  const verifyPayment = async () => {
    try {
      if (!token || !orderId) return

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

      if (gateway === 'paystack') {
        const userId = localStorage.getItem('userId')

        const response = await axios.post(
          `${backendUrl}/api/order/verify/paystack`,
          { reference, orderId, userId },
          { headers: { token } }
        )

        if (response.data.success) {
          setCartItems({})
          toast.success('Payment verified successfully!')
          navigate('/orders')
        } else {
          toast.error('Payment verification failed')
          navigate('/cart')
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message || 'Verification error')
      navigate('/cart')
    }
  }

  useEffect(() => {
    verifyPayment()
  }, [token])

  return <div className="p-4 text-center">Verifying your payment...</div>
}

export default Verify
