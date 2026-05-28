import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import { useBookingSocket } from '../context/BookingSocketContext'
import toast from 'react-hot-toast'
import {
  Heart, ArrowLeft, Users, Fuel, Settings, MapPin,
  Camera, Bluetooth, Navigation, Thermometer, Eye, CheckCircle2,
  CalendarDays, ShieldCheck, Star
} from 'lucide-react'

const FEATURES = [
  { icon: <Camera size={15} />, label: '360 Camera' },
  { icon: <Bluetooth size={15} />, label: 'Bluetooth' },
  { icon: <Navigation size={15} />, label: 'GPS Navigation' },
  { icon: <Thermometer size={15} />, label: 'Heated Seats' },
  { icon: <Eye size={15} />, label: 'Rear View Mirror' },
]

const CarDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [pickupDate, setPickupDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const { axios, cars, fetchCars, token, setShowLogin, wishlist, toggleWishlist } = useAppContext()
  const { emitNewBooking } = useBookingSocket()
  const currency = import.meta.env.VITE_CURRENCY
  const isWishlisted = wishlist.includes(id)

  const totalDays = pickupDate && returnDate
    ? Math.max(1, Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24)))
    : null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!token) {
      setShowLogin(true)
      toast.error('Please login to book a car')
      return
    }
    try {
      toast.loading('Creating booking...')
      const { data } = await axios.post('/api/bookings/create', { car: id, pickupDate, returnDate })
      if (data.success) {
        toast.dismiss()
        toast.success('Proceeding to payment')
        // Navigate to payment page with booking ID
        navigate(`/checkout?bookingId=${data.bookingId}`)
      } else {
        toast.dismiss()
        toast.error(data.message || 'Unable to create booking')
      }
    } catch (error) {
      toast.dismiss()
      toast.error(error.response?.data?.message || 'Unable to create booking')
    }
  }

  useEffect(() => {
    if (cars.length === 0) fetchCars()
  }, [])

  useEffect(() => {
    if (cars.length > 0) setCar(cars.find(c => c._id === id))
  }, [id, cars])

  if (!car) return <Loader />

  return (
    <div className='min-h-screen' style={{ backgroundColor: 'var(--color-background)' }}>
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 pt-8 pb-20'>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-2 mb-8 text-sm font-medium transition-all duration-200 hover:gap-3'
          style={{ color: 'var(--color-text-secondary)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text-primary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}
        >
          <ArrowLeft size={16} />
          Back to all cars
        </button>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>

          {/* ── LEFT COLUMN ── */}
          <div className='lg:col-span-2 space-y-8'>

            {/* Hero image */}
            <div className='relative rounded-2xl overflow-hidden'
              style={{ border: '1px solid var(--color-border)' }}>
              <img
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                className='w-full object-cover'
                style={{ maxHeight: '420px' }}
              />
              {/* gradient overlay */}
              <div className='absolute inset-0 pointer-events-none'
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)' }} />

              {/* Available badge */}
              {(car.isAvailable || car.isAvaliable) && (
                <span className='absolute top-4 left-4 text-white text-xs px-3 py-1.5 rounded-full font-semibold tracking-wide flex items-center gap-1.5'
                  style={{ background: 'linear-gradient(135deg,#2563EB,#4F46E5)' }}>
                  <span className='h-1.5 w-1.5 rounded-full bg-green-400 inline-block' />
                  Available Now
                </span>
              )}

              {/* Wishlist */}
              <button
                type='button'
                onClick={() => toggleWishlist(car._id)}
                className='absolute top-4 right-4 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110'
                style={{
                  backgroundColor: isWishlisted ? 'rgba(37,99,235,0.9)' : 'rgba(17,24,39,0.8)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: isWishlisted ? '#fff' : '#94A3B8',
                }}
              >
                <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>

              {/* Price overlay */}
              <div className='absolute bottom-4 left-5'>
                <span className='text-3xl font-bold text-white'>{currency}{car.pricePerDay}</span>
                <span className='text-sm text-gray-300 ml-1'>/ day</span>
              </div>

              {/* Category + year */}
              <div className='absolute bottom-4 right-5 flex items-center gap-2'>
                <span className='text-xs px-2.5 py-1 rounded-full font-medium'
                  style={{ backgroundColor: 'rgba(244,162,97,0.15)', color: 'var(--color-accent)', border: '1px solid rgba(244,162,97,0.3)' }}>
                  {car.category}
                </span>
                <span className='text-xs px-2.5 py-1 rounded-full font-medium'
                  style={{ backgroundColor: 'rgba(17,24,39,0.8)', color: '#fff', backdropFilter: 'blur(4px)' }}>
                  {car.year}
                </span>
              </div>
            </div>

            {/* Title + rating row */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
              <div>
                <h1 className='text-3xl font-bold tracking-tight' style={{ color: 'var(--color-text-primary)' }}>
                  {car.brand} {car.model}
                </h1>
                <div className='flex items-center gap-1.5 mt-1' style={{ color: 'var(--color-text-secondary)' }}>
                  <MapPin size={14} />
                  <span className='text-sm'>{car.location}</span>
                </div>
              </div>
              <div className='flex items-center gap-1 px-3 py-1.5 rounded-xl'
                style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={14} fill={s <= 4 ? 'var(--color-accent)' : 'none'} color='var(--color-accent)' />
                ))}
                <span className='text-xs ml-1 font-medium' style={{ color: 'var(--color-text-secondary)' }}>4.0</span>
              </div>
            </div>

            {/* Spec cards */}
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
              {[
                { icon: <Users size={18} />, label: 'Seats', value: `${car.seating_capacity} People` },
                { icon: <Fuel size={18} />, label: 'Fuel', value: car.fuel_type },
                { icon: <Settings size={18} />, label: 'Transmission', value: car.transmission },
                { icon: <MapPin size={18} />, label: 'Location', value: car.location },
              ].map(({ icon, label, value }) => (
                <div key={label} className='flex flex-col items-center justify-center gap-2 p-4 rounded-xl text-center'
                  style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                  <span style={{ color: 'var(--color-primary)' }}>{icon}</span>
                  <span className='text-xs' style={{ color: 'var(--color-text-secondary)' }}>{label}</span>
                  <span className='text-sm font-semibold' style={{ color: 'var(--color-text-primary)' }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className='rounded-2xl p-6 space-y-3'
              style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <h2 className='text-lg font-semibold' style={{ color: 'var(--color-text-primary)' }}>About this car</h2>
              <p className='text-sm leading-relaxed' style={{ color: 'var(--color-text-secondary)' }}>{car.description}</p>
            </div>

            {/* Features */}
            <div className='rounded-2xl p-6 space-y-4'
              style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <h2 className='text-lg font-semibold' style={{ color: 'var(--color-text-primary)' }}>Features & Amenities</h2>
              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                {FEATURES.map(({ icon, label }) => (
                  <li key={label} className='flex items-center gap-3 text-sm'
                    style={{ color: 'var(--color-text-secondary)' }}>
                    <span className='flex items-center justify-center h-8 w-8 rounded-lg flex-shrink-0'
                      style={{ backgroundColor: 'rgba(37,99,235,0.12)', color: 'var(--color-primary)' }}>
                      {icon}
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* ── RIGHT COLUMN — Booking Form ── */}
          <div className='lg:col-span-1'>
            <form
              onSubmit={handleSubmit}
              className='sticky top-20 rounded-2xl overflow-hidden'
              style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
            >
              {/* Form header */}
              <div className='p-6' style={{ borderBottom: '1px solid var(--color-border)' }}>
                <div className='flex items-end justify-between'>
                  <div>
                    <span className='text-3xl font-bold' style={{ color: 'var(--color-text-primary)' }}>
                      {currency}{car.pricePerDay}
                    </span>
                    <span className='text-sm ml-1' style={{ color: 'var(--color-text-secondary)' }}>/ day</span>
                  </div>
                  {totalDays && (
                    <span className='text-sm font-medium px-3 py-1 rounded-lg'
                      style={{ backgroundColor: 'rgba(37,99,235,0.12)', color: 'var(--color-primary)' }}>
                      {totalDays} day{totalDays > 1 ? 's' : ''} · {currency}{car.pricePerDay * totalDays}
                    </span>
                  )}
                </div>
              </div>

              <div className='p-6 space-y-5'>
                {/* Pickup date */}
                <div className='space-y-1.5'>
                  <label className='flex items-center gap-2 text-sm font-medium' style={{ color: 'var(--color-text-secondary)' }}>
                    <CalendarDays size={14} /> Pickup Date
                  </label>
                  <input
                    type='date'
                    id='pickup-date'
                    required
                    value={pickupDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setPickupDate(e.target.value)}
                    className='w-full px-4 py-2.5 rounded-xl text-sm'
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)',
                      colorScheme: 'dark',
                    }}
                  />
                </div>

                {/* Return date */}
                <div className='space-y-1.5'>
                  <label className='flex items-center gap-2 text-sm font-medium' style={{ color: 'var(--color-text-secondary)' }}>
                    <CalendarDays size={14} /> Return Date
                  </label>
                  <input
                    type='date'
                    id='return-date'
                    required
                    value={returnDate}
                    min={pickupDate || new Date().toISOString().split('T')[0]}
                    onChange={e => setReturnDate(e.target.value)}
                    className='w-full px-4 py-2.5 rounded-xl text-sm'
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)',
                      colorScheme: 'dark',
                    }}
                  />
                </div>

                {totalDays && (
                  <div className='rounded-xl p-4 space-y-2'
                    style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                    <div className='flex justify-between text-sm' style={{ color: 'var(--color-text-secondary)' }}>
                      <span>{currency}{car.pricePerDay} × {totalDays} day{totalDays > 1 ? 's' : ''}</span>
                      <span>{currency}{car.pricePerDay * totalDays}</span>
                    </div>
                    <div className='flex justify-between text-sm' style={{ color: 'var(--color-text-secondary)' }}>
                      <span>Service fee</span>
                      <span>Free</span>
                    </div>
                    <div className='pt-2' style={{ borderTop: '1px solid var(--color-border)' }}>
                      <div className='flex justify-between font-bold' style={{ color: 'var(--color-text-primary)' }}>
                        <span>Total</span>
                        <span>{currency}{car.pricePerDay * totalDays}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit */}
                <button
                  type='submit'
                  className='w-full py-3 rounded-xl font-semibold text-white text-sm transition-all duration-200'
                  style={{
                    background: 'linear-gradient(135deg,#2563EB,#4F46E5)',
                    boxShadow: '0 4px 14px rgba(37,99,235,0.35)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,99,235,0.55)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 14px rgba(37,99,235,0.35)'}
                >
                  Book Now
                </button>

                {/* Trust badges */}
                <div className='grid grid-cols-2 gap-2 pt-1'>
                  {[
                    { icon: <ShieldCheck size={13} />, text: 'Secure booking' },
                    { icon: <CheckCircle2 size={13} />, text: 'Free cancellation' },
                  ].map(({ icon, text }) => (
                    <div key={text} className='flex items-center gap-1.5 text-xs justify-center'
                      style={{ color: 'var(--color-text-secondary)' }}>
                      <span style={{ color: 'var(--color-primary)' }}>{icon}</span>
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CarDetails
