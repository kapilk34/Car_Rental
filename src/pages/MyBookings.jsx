import React, { useState, useEffect} from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import { useAppContext } from '../context/AppContext'
import { useBookingSocket } from '../context/BookingSocketContext'
import BookingStatusBadge from '../components/BookingStatusBadge'
import toast from 'react-hot-toast'

const MyBookings = () => {

  const [bookings, setBookings] = useState([])
  const currency = import.meta.env.VITE_CURRENCY
  const { axios, user } = useAppContext()
  const { joinSocket, userBookings, bookingUpdates } = useBookingSocket()

  const fetchMyBookings = async () =>{
    try {
      const { data } = await axios.get('/api/bookings/user')

      if (data.success) {
        setBookings(data.bookings || [])
      } else {
        toast.error(data.message || 'Could not fetch bookings')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not fetch bookings')
    }
  }

  // Join socket when component mounts
  useEffect(() => {
    if (user?._id) {
      joinSocket(user._id, 'user')
      fetchMyBookings()
    }
  }, [user])

  // Listen for booking updates from socket
  useEffect(() => {
    if (bookingUpdates.length > 0) {
      // Update local bookings with new status
      setBookings(prev =>
        prev.map(booking =>
          bookingUpdates.some(update => update.bookingId === booking._id)
            ? { ...booking, status: bookingUpdates.find(u => u.bookingId === booking._id)?.status }
            : booking
        )
      )
    }
  }, [bookingUpdates])

  return (
    <div className='px-4 md:px-8 py-8 text-sm max-w-7xl text-text-primary'>
      <Title title='My Bookings' subtitle='View and manage all your car bookings.' align='left'/>

      <div>
        {bookings.length === 0 && (
          <div className='mt-8 rounded-lg border border-border bg-card px-6 py-16 text-center text-text-secondary'>
            No bookings yet.
          </div>
        )}

        {bookings.map((booking, index)=>(
          <div key={booking._id} className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-border bg-card rounded-lg mt-5 first:mt-12'>
            {/* Car Image + Info */}
            <div className='md:col-span-1'>
              <div className='rounded-md overflow-hidden mb-3'>
                <img src={booking.car?.image} alt=" " className='w-full h-auto aspect-video object-cover'/>
              </div>
              <p className='text-lg font-medium mt-2 text-text-primary'>{booking.car?.brand} {booking.car?.model}</p>
              <p className='text-text-secondary'>{booking.car?.year} . {booking.car?.category} . {booking.car?.location}</p>
            </div>

            {/* Booking Info*/}
            <div className='md:col-span-2'>
              <div className='flex items-center gap-2'>
                <p className='px-3 py-1.5 bg-surface border border-border rounded text-text-secondary'>Booking #{index+1}</p>
                <BookingStatusBadge status={booking.status} isLive={true} />
              </div>

              <div className='flex items-start gap-2 mt-3'>
                <img src={assets.calendar_icon_colored} alt='' className='w-4 h-4 mt-1'/>
                <div>
                  <p className='text-text-secondary'>Rental Period</p>
                  <p className='text-text-primary'>{booking.pickupDate?.split('T')[0]} To {booking.returnDate?.split('T')[0]}</p>
                </div>
              </div>

              <div className='flex items-start gap-2 mt-3'>
                <img src={assets.location_icon_colored} alt='' className='w-4 h-4 mt-1'/>
                <div>
                  <p className='text-text-secondary'>Pick-up Location</p>
                  <p className='text-text-primary'>{booking.car?.location}</p>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className='md:col-span-1 flex flex-col justify-between gap-6'>
              <div className='text-sm text-text-secondary text-right'>
                <p>Total Price</p>
                <h1 className='text-2xl font-semibold text-primary'>{currency} {booking.price}</h1>
                <p>Booked on {booking.createdAt?.split('T')[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyBookings
