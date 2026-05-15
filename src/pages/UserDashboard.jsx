import React, { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Car, Heart, MapPin, WalletCards } from 'lucide-react';
import toast from 'react-hot-toast';
import Title from '../components/Title';
import { useAppContext } from '../context/AppContext';

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
      const { data } = await axios.post('/api/bookings/user');

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
    fetchCars();
    fetchBookings();
  }, []);

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
            <div key={label} className="bg-white border border-borderColor rounded-lg p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">{label}</p>
                  <h2 className="text-3xl font-bold text-gray-900 mt-2">{value}</h2>
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Icon size={22} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          <section className="lg:col-span-2 bg-white border border-borderColor rounded-lg p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4 mb-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Your Bookings</h2>
                <p className="text-sm text-gray-500 mt-1">Review current and previous reservations.</p>
              </div>
              <p className="text-sm font-semibold text-primary">{currency}{totalSpent}</p>
            </div>

            {loading ? (
              <div className="py-16 text-center text-gray-500">Loading bookings...</div>
            ) : bookings.length === 0 ? (
              <div className="py-16 text-center text-gray-500">No bookings yet.</div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking._id} className="flex flex-col sm:flex-row sm:items-center gap-4 border border-borderColor rounded-lg p-4">
                    <img src={booking.car?.image} alt="" className="h-24 sm:h-20 sm:w-28 rounded-md object-cover" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {booking.car?.brand} {booking.car?.model}
                      </h3>
                      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500 mt-2">
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
                      <p className="font-semibold text-gray-900">{currency}{booking.price}</p>
                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : booking.status === 'cancelled'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="bg-white border border-borderColor rounded-lg p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4 mb-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Wishlist</h2>
                <p className="text-sm text-gray-500 mt-1">Cars saved for later.</p>
              </div>
              <button
                onClick={() => navigate('/dashboard/wishlist')}
                className="text-sm font-semibold text-primary hover:underline"
              >
                View All
              </button>
            </div>

            {wishlistCars.length === 0 ? (
              <div className="py-14 text-center text-gray-500">Your wishlist is empty.</div>
            ) : (
              <div className="space-y-4">
                {wishlistCars.slice(0, 3).map((car) => (
                  <div key={car._id} className="border border-borderColor rounded-lg overflow-hidden">
                    <img src={car.image} alt="" className="h-36 w-full object-cover" />
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{car.brand} {car.model}</h3>
                          <p className="text-sm text-gray-500 mt-1">{car.location}</p>
                        </div>
                        <p className="text-sm font-semibold text-primary">{currency}{car.pricePerDay}/day</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <button
                          onClick={() => navigate(`/car-details/${car._id}`)}
                          className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary-dark transition"
                        >
                          Book
                        </button>
                        <button
                          onClick={() => navigate('/dashboard/wishlist')}
                          className="rounded-lg border border-borderColor px-3 py-2 text-sm font-medium text-gray-700 hover:border-primary hover:text-primary transition"
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
