import React, { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Car, Heart, MapPin, WalletCards } from 'lucide-react';
import toast from 'react-hot-toast';
import Title from '../components/Title';
import { useAppContext } from '../context/AppContext';
import { useBookingSocket } from '../context/BookingSocketContext';
import BookingStatusBadge from '../components/BookingStatusBadge';

const UserDashboard = () => {
  const {
    axios,
    cars,
    fetchCars,
    navigate,
    user,
    wishlist,
  } = useAppContext();
  const currency = import.meta.env.VITE_CURRENCY;
  const { joinSocket, bookingUpdates, notifications, setNotifications } = useBookingSocket();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const wishlistCars = useMemo(
    () => cars.filter((car) => wishlist.includes(car._id)),
    [cars, wishlist]
  );

  const confirmedBookings = bookings.filter((booking) => booking.status === 'confirmed').length;
  const pendingBookings = bookings.filter((booking) => booking.status === 'pending').length;
  const totalSpent = bookings.reduce((total, booking) => total + Number(booking.price || 0), 0);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/bookings/user');

      if (data.success) {
        setBookings(data.bookings || []);
      } else {
        toast.error(data.message || 'Could not fetch bookings');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      joinSocket(user._id, 'user');
    }
    fetchCars();
    fetchBookings();
  }, [user]);

  useEffect(() => {
    if (bookingUpdates.length > 0) {
      const latestUpdate = bookingUpdates[bookingUpdates.length - 1];
      setBookings(prev =>
        prev.map(booking =>
          booking._id === latestUpdate.bookingId
            ? { ...booking, status: latestUpdate.status }
            : booking
        )
      );
    }
  }, [bookingUpdates]);

  useEffect(() => {
    notifications.forEach(notification => {
      if (notification.type === 'bookingCreated') {
        toast.success('✓ Booking created! Waiting for approval...');
      } else if (notification.type === 'statusUpdate') {
        if (notification.status === 'confirmed') {
          toast.success('✓ Your booking has been confirmed!');
        } else if (notification.status === 'cancelled') {
          toast.error('Your booking has been cancelled');
        }
      }
    });
  }, [notifications]);

  return (
    <div className="px-4 md:px-8 py-8">
      <div className="max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <Title
            title={`Welcome, ${user?.name || 'Driver'}`}
            subtitle="Manage your bookings, wishlist, and next trips from one place."
            align="left"
          />

          <button
            onClick={() => navigate('/cars')}
            className="inline-flex items-center justify-center gap-2 self-start md:self-auto rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition"
          >
            <Car size={18} />
            Browse Cars
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
          {[
            { label: 'Total Bookings', value: bookings.length, icon: CalendarDays },
            { label: 'Confirmed Trips', value: confirmedBookings, icon: Car },
            { label: 'Pending Requests', value: pendingBookings, icon: WalletCards },
            { label: 'Wishlist Cars', value: wishlistCars.length, icon: Heart },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-card border border-border rounded-lg p-5 shadow">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-text-secondary">{label}</p>
                  <h2 className="text-3xl font-bold text-text-primary mt-2">{value}</h2>
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Icon size={22} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          <section className="lg:col-span-2 bg-card border border-border rounded-lg p-5 shadow">
            <div className="flex items-center justify-between gap-4 mb-5">
              <div>
                <h2 className="text-xl font-semibold text-text-primary">Your Bookings</h2>
                <p className="text-sm text-text-secondary mt-1">Review current and previous reservations.</p>
              </div>
              <p className="text-sm font-semibold text-primary">{currency}{totalSpent}</p>
            </div>

            {loading ? (
              <div className="py-16 text-center text-text-secondary">Loading bookings...</div>
            ) : bookings.length === 0 ? (
              <div className="py-16 text-center text-text-secondary">No bookings yet.</div>
            ) : (
              <div className={`space-y-4 ${bookings.length > 1 ? "max-h-[290px] overflow-y-auto pr-2" : ""}`}>
                {bookings.map((booking) => (
                  <div key={booking._id} className="flex flex-col sm:flex-row sm:items-center gap-4 border border-border bg-surface rounded-lg p-4">
                    <img src={booking.car?.image} alt="" className="h-24 sm:h-20 sm:w-28 rounded-md object-cover border border-border" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-text-primary">
                        {booking.car?.brand} {booking.car?.model}
                      </h3>
                      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-text-secondary mt-2">
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays size={15} />
                          {booking.pickupDate?.split('T')[0]} to {booking.returnDate?.split('T')[0]}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={15} />
                          {booking.car?.location}
                        </span>
                      </div>
                    </div>
                    <div className="sm:text-right">
                      <p className="font-semibold text-text-primary">{currency}{booking.price}</p>
                      <div className="mt-2">
                        <BookingStatusBadge status={booking.status} isLive={true} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="bg-card border border-border rounded-lg p-5 shadow">
            <div className="flex items-center justify-between gap-4 mb-5">
              <div>
                <h2 className="text-xl font-semibold text-text-primary">Wishlist</h2>
                <p className="text-sm text-text-secondary mt-1">Cars saved for later.</p>
              </div>
              <button
                onClick={() => navigate('/dashboard/wishlist')}
                className="text-sm font-semibold text-primary hover:underline"
              >
                View All
              </button>
            </div>

            {wishlistCars.length === 0 ? (
              <div className="py-14 text-center text-text-secondary">Your wishlist is empty.</div>
            ) : (
              <div className={`space-y-4 ${wishlistCars.length > 1 ? "max-h-[290px] overflow-y-auto pr-2" : ""}`}>
                {wishlistCars.slice(0, 3).map((car) => (
                  <div key={car._id} className="border border-border bg-surface rounded-lg overflow-hidden">
                    <img src={car.image} alt="" className="h-36 w-full object-cover" />
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-text-primary">{car.brand} {car.model}</h3>
                          <p className="text-sm text-text-secondary mt-1">{car.location}</p>
                        </div>
                        <p className="text-sm font-semibold text-primary">{currency}{car.pricePerDay}/day</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <button
                          onClick={() => navigate(`/car-details/${car._id}`)}
                          className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition"
                        >
                          Book
                        </button>
                        <button
                          onClick={() => navigate('/dashboard/wishlist')}
                          className="rounded-lg border border-border px-3 py-2 text-sm font-semibold text-text-secondary hover:border-primary hover:text-primary transition"
                        >
                          Manage
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
