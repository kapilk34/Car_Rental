import React, { useEffect, useState } from 'react';
import Title from '../../components/owners/Title';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';
import { useBookingSocket } from '../../context/BookingSocketContext';
import BookingStatusBadge from '../../components/BookingStatusBadge';

const ManageBookings = () => {

  const currency = import.meta.env.VITE_CURRENCY
  const { user } = useAppContext()
  const { joinSocket, adminBookings, setAdminBookings, updateBookingStatus, requestAllBookings } = useBookingSocket()
  const [ bookings, setBookings] = useState([])
  const [ loading, setLoading] = useState(false)
  const [ updatingId, setUpdatingId] = useState(null)

  const fetchOwnerBookingsData = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get('/api/bookings/owner')

      if (data.success) {
        setBookings(data.bookings)
      } else {
        toast.error(data.message || 'Failed to fetch bookings')
        setBookings([])
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
      toast.error(error.response?.data?.message || 'Error fetching bookings')
      setBookings([])
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      setUpdatingId(bookingId)
      const { data } = await axios.post('/api/bookings/change-status', 
        { bookingId, status: newStatus }
      )

      if (data.success) {
        toast.success(data.message || 'Booking status updated successfully')
        updateBookingStatus(bookingId, newStatus)
        setBookings(prev => prev.map(b => b._id === bookingId ? {...b, status: newStatus} : b))
      } else {
        toast.error(data.message || 'Failed to update booking status')
      }
    } catch (error) {
      console.error('Error updating booking status:', error)
      toast.error(error.response?.data?.message || 'Error updating booking status')
    } finally {
      setUpdatingId(null)
    }
  }

  useEffect(() => {
    if (user?._id) {
      joinSocket(user._id, 'owner')
      fetchOwnerBookingsData()
    }
  }, [user])

  useEffect(() => {
    if (adminBookings.length > 0 && bookings.length > 0) {
      const existingIds = new Set(bookings.map(b => b._id))
      const newBookingsToAdd = adminBookings.filter(b => !existingIds.has(b.bookingId))
      
      if (newBookingsToAdd.length > 0) {
        setBookings(prev => [...newBookingsToAdd, ...prev])
        newBookingsToAdd.forEach(b => {
          toast.success(`New booking from ${b.user?.name || 'Customer'}!`)
        })
      }
    }
  }, [adminBookings])

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Bookings"
        subTitle="Track all customer bookings, approve or cancel requests, and manage booking statuses."
      />

      {loading ? (
        <div className="text-center py-10">
          <p className="text-text-secondary">Loading bookings...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-text-secondary">No bookings yet. Your bookings will appear here.</p>
        </div>
      ) : (
        <div className="max-w-3xl w-full rounded-xl overflow-hidden border border-border mt-6">
          <table className="w-full border-collapse text-left text-sm text-text-secondary">
            <thead className="text-text-secondary bg-surface">
              <tr>
                <th className="p-3 font-medium">Car</th>
                <th className="p-3 font-medium max-md:hidden">Date Range</th>
                <th className="p-3 font-medium">Total</th>
                <th className="p-3 font-medium max-md:hidden">Payment</th>
                <th className="p-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-t border-border hover:bg-card transition-colors">
                  
                  <td className='p-3 flex items-center gap-3'>
                    <img src={booking.car?.image} alt='' className='h-12 w-12 aspect-square rounded-md object-cover'/>
                    <p className='font-medium max-md:hidden text-text-primary'>{booking.car?.brand} {booking.car?.model}</p>
                  </td>

                  <td className='p-3 max-md:hidden'>
                    {new Date(booking.pickupDate).toLocaleDateString()} to {new Date(booking.returnDate).toLocaleDateString()}
                  </td>

                  <td className='p-3 text-text-primary'>{currency} {booking.price}</td>

                  <td className='p-3 max-md:hidden'>
                    <span className='bg-surface border border-border px-3 py-1 rounded-full text-xs text-text-secondary'>offline</span>
                  </td>

                  <td className='p-3'>
                    {booking.status === 'pending' ? (
                      <select 
                        value={booking.status} 
                        onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                        disabled={updatingId === booking._id}
                        className='px-2 py-1.5 text-text-secondary bg-surface border border-border rounded-md outline-none focus:border-primary disabled:opacity-50'
                      >
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="confirmed">Confirmed</option>
                      </select>
                    ) : (
                      <BookingStatusBadge status={booking.status} isLive={false} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ManageBookings