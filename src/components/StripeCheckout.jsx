import React, { useState, useEffect } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { ArrowLeft, AlertCircle, Lock } from 'lucide-react'

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
const stripePromise = (() => {
  if (!stripePublishableKey?.startsWith('pk_')) {
    return null
  }

  if (globalThis.__carRentalStripeKey !== stripePublishableKey) {
    globalThis.__carRentalStripeKey = stripePublishableKey
    globalThis.__carRentalStripePromise = loadStripe(stripePublishableKey)
  }

  return globalThis.__carRentalStripePromise
})()

const CheckoutForm = ({ bookingId, amount, onSuccess, stripeConfigured }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [paymentType, setPaymentType] = useState("now")
  const navigate = useNavigate()
  const { axios, token } = useAppContext()

  const handleCardChange = (event) => {
    setError(event.error ? event.error.message : null)
    setCardComplete(event.complete)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (paymentType === 'now') {
      if (!stripeConfigured) {
        setError('Stripe is not properly configured. Please check VITE_STRIPE_PUBLISHABLE_KEY.')
        return
      }

      if (!stripe || !elements || !cardComplete) {
        setError('Please enter valid card details')
        return
      }
    }

    setLoading(true)
    setError(null)

    try {
      if (paymentType === 'now') {
        const { data: intentData } = await axios.post(
          '/api/bookings/create-payment-intent',
          { bookingId },
          { headers: { Authorization: `Bearer ${token}` } }
        )

        if (!intentData.success) {
          throw new Error(intentData.message || 'Failed to create payment intent')
        }

        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
          intentData.clientSecret,
          {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                name: 'User'
              }
            }
          }
        )

        if (stripeError) {
          throw new Error(stripeError.message || 'Payment failed')
        }

        if (paymentIntent.status === 'succeeded') {
          const { data: confirmData } = await axios.post(
            '/api/bookings/confirm-payment',
            {
              bookingId,
              paymentIntentId: paymentIntent.id,
              paymentType
            },
            { headers: { Authorization: `Bearer ${token}` } }
          )

          if (confirmData.success) {
            toast.success('✅ Payment successful! Booking pending admin confirmation.')
            onSuccess()
          } else {
            throw new Error(confirmData.message || 'Failed to confirm payment')
          }
        } else {
          throw new Error('Payment was not completed. Status: ' + paymentIntent.status)
        }
      } else if (paymentType === 'at_pickup') {
        const { data: confirmData } = await axios.post(
          '/api/bookings/confirm-payment',
          {
            bookingId,
            paymentIntentId: null,
            paymentType: 'at_pickup'
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )

        if (confirmData.success) {
          toast.success('✅ Booking request sent! You will pay when picking up the car.')
          onSuccess()
        } else {
          throw new Error(confirmData.message || 'Failed to create booking')
        }
      }
    } catch (err) {
      console.error('Payment error:', err)
      const errorMessage = err.message || 'Request failed. Please try again.'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (!stripeConfigured) {
    return (
      <div className='p-6 rounded-xl text-center' style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
        <AlertCircle size={32} style={{ color: '#ef4444', margin: '0 auto 12px' }} />
        <p style={{ color: '#ef4444', fontSize: '14px' }}>
          Stripe is not properly configured. Please check your VITE_STRIPE_PUBLISHABLE_KEY environment variable.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='space-y-3'>
        <label className='text-sm font-semibold block' style={{ color: 'var(--color-text-primary)' }}>
          Payment Method
        </label>
        <div className='grid grid-cols-2 gap-3'>
          <button
            type='button'
            onClick={() => setPaymentType('now')}
            className='p-4 rounded-xl border-2 transition-all duration-200'
            style={{
              borderColor: paymentType === 'now' ? 'var(--color-primary)' : 'var(--color-border)',
              backgroundColor: paymentType === 'now' ? 'rgba(37, 99, 235, 0.1)' : 'var(--color-surface)'
            }}
          >
            <div className='font-semibold text-sm' style={{ color: 'var(--color-text-primary)' }}>
              💳 Pay Now
            </div>
            <div className='text-xs mt-1' style={{ color: 'var(--color-text-secondary)' }}>
              Complete payment now
            </div>
          </button>

          <button
            type='button'
            onClick={() => setPaymentType('at_pickup')}
            className='p-4 rounded-xl border-2 transition-all duration-200'
            style={{
              borderColor: paymentType === 'at_pickup' ? 'var(--color-primary)' : 'var(--color-border)',
              backgroundColor: paymentType === 'at_pickup' ? 'rgba(37, 99, 235, 0.1)' : 'var(--color-surface)'
            }}
          >
            <div className='font-semibold text-sm' style={{ color: 'var(--color-text-primary)' }}>
              🕐 Pay at Pickup
            </div>
            <div className='text-xs mt-1' style={{ color: 'var(--color-text-secondary)' }}>
              Pay during pickup
            </div>
          </button>
        </div>
      </div>

      {paymentType === 'now' && (
        <>
          <div className='rounded-xl p-6'
            style={{ backgroundColor: 'var(--color-surface)', border: '2px solid var(--color-border)' }}>
            <label className='text-sm font-semibold block mb-4' style={{ color: 'var(--color-text-primary)' }}>
              <Lock size={14} style={{ display: 'inline', marginRight: '6px' }} />
              Card Details
            </label>
            <CardElement
              onChange={handleCardChange}
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#ffffff',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    '::placeholder': {
                      color: '#6B7280',
                      fontSize: '15px'
                    }
                  },
                  invalid: {
                    color: '#fa755a',
                  },
                  complete: {
                    color: '#10b981'
                  }
                },
                hidePostalCode: false
              }}
            />
          </div>

          {error && (
            <div className='flex gap-3 p-4 rounded-xl'
              style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <AlertCircle size={20} style={{ color: '#ef4444', flexShrink: 0, marginTop: '2px' }} />
              <p style={{ color: '#ef4444', fontSize: '13px' }}>{error}</p>
            </div>
          )}
        </>
      )}

      <button
        type='submit'
        disabled={paymentType === 'now' && (!cardComplete || loading) || (paymentType === 'at_pickup' && loading)}
        className='w-full py-3 rounded-xl font-semibold text-white text-sm transition-all duration-300'
        style={{
          background: (paymentType === 'now' && !cardComplete) || loading
            ? 'rgba(37, 99, 235, 0.4)'
            : 'linear-gradient(135deg, #2563EB, #4F46E5)',
          boxShadow: (paymentType === 'now' && !cardComplete) || loading
            ? 'none'
            : '0 4px 14px rgba(37, 99, 235, 0.35)',
          cursor: (paymentType === 'now' && !cardComplete) || loading ? 'not-allowed' : 'pointer',
          opacity: (paymentType === 'now' && !cardComplete) || loading ? 0.6 : 1
        }}
        onMouseEnter={e => {
          if ((paymentType === 'now' && cardComplete || paymentType === 'at_pickup') && !loading) {
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.55)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }
        }}
        onMouseLeave={e => {
          if ((paymentType === 'now' && cardComplete || paymentType === 'at_pickup') && !loading) {
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(37, 99, 235, 0.35)'
            e.currentTarget.style.transform = 'translateY(0)'
          }
        }}
      >
        {loading ? (
          <span className='flex items-center justify-center gap-2'>
            <span className='animate-spin'>⏳</span>
            Processing...
          </span>
        ) : paymentType === 'now' ? (
          cardComplete ? `Pay ${amount}` : 'Enter card details to continue'
        ) : (
          `Request Booking - ${amount}`
        )}
      </button>
    </form>
  )
}

const StripeCheckout = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { axios, token } = useAppContext()
  const bookingId = searchParams.get('bookingId')
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const currency = import.meta.env.VITE_CURRENCY

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        if (!bookingId) {
          setError('Invalid booking. No booking ID provided.')
          setTimeout(() => navigate('/cars'), 2000)
          return
        }

        if (!token) {
          setError('Please login to complete payment.')
          setTimeout(() => navigate('/'), 2000)
          return
        }

        const { data } = await axios.get('/api/bookings/user', {
          headers: { Authorization: `Bearer ${token}` }
        })

        if (data.success && data.bookings) {
          const currentBooking = data.bookings.find(b => b._id === bookingId)
          if (currentBooking) {
            setBooking(currentBooking)
          } else {
            setError('Booking not found.')
            setTimeout(() => navigate('/dashboard'), 2000)
          }
        } else {
          setError('Failed to load booking details.')
        }
      } catch (error) {
        console.error('Error loading booking:', error)
        setError(error.response?.data?.message || 'Error loading booking. Please try again.')
        setTimeout(() => navigate('/dashboard'), 3000)
      } finally {
        setLoading(false)
      }
    }

    fetchBooking()
  }, [bookingId, token])

  const handlePaymentSuccess = () => {
    toast.success('✅ Booking request sent! Waiting for admin confirmation.')
    setTimeout(() => {
      navigate('/dashboard')
    }, 2000)
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center' style={{ backgroundColor: 'var(--color-background)' }}>
        <div className='text-center space-y-4'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 mx-auto' style={{ borderColor: 'var(--color-primary)' }}></div>
          <p style={{ color: 'var(--color-text-secondary)' }}>Loading payment details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center px-4' style={{ backgroundColor: 'var(--color-background)' }}>
        <div className='max-w-md w-full p-8 rounded-2xl text-center'
          style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
          <AlertCircle size={48} style={{ color: '#ef4444', margin: '0 auto 16px' }} />
          <h2 className='text-xl font-bold mb-4' style={{ color: 'var(--color-text-primary)' }}>Error</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '20px' }}>{error}</p>
          <button
            onClick={() => navigate('/cars')}
            className='px-6 py-2 rounded-lg font-semibold text-white'
            style={{ background: 'linear-gradient(135deg, #2563EB, #4F46E5)' }}
          >
            Back to Cars
          </button>
        </div>
      </div>
    )
  }

  if (!booking) {
    return null
  }

  return (
    <div className='min-h-screen' style={{ backgroundColor: 'var(--color-background)' }}>
      <div className='px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 pt-8 pb-20'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-2 mb-8 text-sm font-medium transition-all duration-200 hover:gap-3'
          style={{ color: 'var(--color-text-secondary)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text-primary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl'>
          <div className='lg:col-span-2'>
            <div className='rounded-2xl p-8'
              style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
              <div className='mb-8'>
                <h1 className='text-3xl font-bold mb-2' style={{ color: 'var(--color-text-primary)' }}>
                  Secure Your Booking
                </h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  Select your payment method. Your booking will be confirmed after admin verification.
                </p>
              </div>

              <Elements key={stripePublishableKey || 'stripe-not-configured'} stripe={stripePromise}>
                <CheckoutForm
                  bookingId={bookingId}
                  amount={`${currency}${booking.price}`}
                  onSuccess={handlePaymentSuccess}
                  stripeConfigured={Boolean(stripePromise)}
                />
              </Elements>
            </div>
          </div>

          <div className='lg:col-span-1'>
            <div className='sticky top-20 rounded-2xl overflow-hidden'
              style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
              <div className='p-6' style={{ borderBottom: '1px solid var(--color-border)' }}>
                <h2 className='text-lg font-semibold' style={{ color: 'var(--color-text-primary)' }}>
                  Booking Summary
                </h2>
              </div>

              <div className='p-6 space-y-6'>
                <div>
                  <p className='text-xs font-medium mb-2' style={{ color: 'var(--color-text-secondary)' }}>CAR</p>
                  <p className='text-base font-semibold' style={{ color: 'var(--color-text-primary)' }}>
                    {booking.car?.brand} {booking.car?.model}
                  </p>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <p className='text-xs font-medium mb-2' style={{ color: 'var(--color-text-secondary)' }}>PICKUP</p>
                    <p className='text-sm font-semibold' style={{ color: 'var(--color-text-primary)' }}>
                      {new Date(booking.pickupDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <p className='text-xs font-medium mb-2' style={{ color: 'var(--color-text-secondary)' }}>RETURN</p>
                    <p className='text-sm font-semibold' style={{ color: 'var(--color-text-primary)' }}>
                      {new Date(booking.returnDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className='rounded-xl p-4 space-y-3'
                  style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                  <div className='flex justify-between text-sm' style={{ color: 'var(--color-text-secondary)' }}>
                    <span>Subtotal</span>
                    <span>{currency}{booking.price}</span>
                  </div>
                  <div className='flex justify-between text-sm' style={{ color: 'var(--color-text-secondary)' }}>
                    <span>Taxes & Fees</span>
                    <span>Included</span>
                  </div>
                  <div className='pt-3' style={{ borderTop: '1px solid var(--color-border)' }}>
                    <div className='flex justify-between font-bold text-base' style={{ color: 'var(--color-text-primary)' }}>
                      <span>Total Amount</span>
                      <span style={{ color: 'var(--color-primary)' }}>{currency}{booking.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StripeCheckout
