import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets';
import Title from '../../components/owners/Title';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const { axios, token } = useAppContext();
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBooking: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const DashboardCards = [
    {
      title: 'Total Cars',
      value: data.totalCars,
      icon: assets.carIconColored,
      bg: 'bg-blue-50',
    },
    {
      title: 'Total Bookings',
      value: data.totalBookings,
      icon: assets.listIconColored,
      bg: 'bg-orange-50',
    },
    {
      title: 'Pending',
      value: data.pendingBooking,
      icon: assets.cautionIconColored,
      bg: 'bg-yellow-50',
    },
    {
      title: 'Confirmed',
      value: data.completedBookings,
      icon: assets.listIconColored,
      bg: 'bg-green-50',
    },
  ];

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get('api/owner/dashboard');

      if (data.success) {
        setData({
          totalCars: data.dashboardData.totalCar,
          totalBookings: data.dashboardData.totalBookings,
          pendingBooking: data.dashboardData.pendingBookings,
          completedBookings: data.dashboardData.completedBookings,
          recentBookings: data.dashboardData.recentBookings,
          monthlyRevenue: data.dashboardData.monthlyRevenue,
        });
      } else {
        toast.error(data.message || 'Failed to fetch dashboard data');
      }
    } catch (error) {
      toast.error(error.message || 'Error fetching dashboard data');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  return (
    <div className="flex-1 bg-[#f8fafc] min-h-screen px-4 md:px-8 py-8">

      {loading ? (
        <div className="flex items-center justify-center h-[70vh]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium">
              Loading dashboard...
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Title
              title="Admin Dashboard"
              subTitle="Track bookings, cars, revenue, and customer activities in real-time."
            />

            <div className="bg-white shadow-sm border border-gray-100 rounded-2xl px-5 py-3">
              <p className="text-sm text-gray-500">
                Monthly Revenue
              </p>

              <h1 className="text-3xl font-bold text-primary mt-1">
                {currency}{data.monthlyRevenue}
              </h1>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

            {DashboardCards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-gray-500">
                      {card.title}
                    </p>

                    <h1 className="text-3xl font-bold text-gray-800 mt-2">
                      {card.value}
                    </h1>
                  </div>

                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.bg}`}
                  >
                    <img
                      src={card.icon}
                      alt=""
                      className="w-7 h-7"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Section */}
          <div className="grid lg:grid-cols-3 gap-6 mt-8">

            {/* Recent Bookings */}
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-xl font-semibold text-gray-800">
                    Recent Bookings
                  </h1>

                  <p className="text-sm text-gray-500 mt-1">
                    Latest customer bookings and activities
                  </p>
                </div>

                <button className="text-primary text-sm font-medium hover:underline">
                  View All
                </button>
              </div>

              <div className="space-y-4">

                {data.recentBookings.map((booking, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-all"
                  >

                    <div className="flex items-center gap-4">

                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <img
                          src={assets.listIconColored}
                          alt=""
                          className="w-6 h-6"
                        />
                      </div>

                      <div>
                        <h1 className="font-semibold text-gray-800">
                          {booking.car.brand} {booking.car.model}
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                          Booked on {booking.createdAt.split('T')[0]}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">

                      <p className="font-semibold text-gray-700">
                        {currency}{booking.price}
                      </p>

                      <span
                        className={`px-4 py-1 rounded-full text-xs font-medium
                        ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}

              </div>
            </div>

            {/* Revenue Card */}
            <div className="bg-gradient-to-br from-primary to-orange-500 rounded-3xl p-8 text-white shadow-lg">

              <p className="text-sm opacity-80">
                Current Month Revenue
              </p>

              <h1 className="text-5xl font-bold mt-4">
                {currency}{data.monthlyRevenue}
              </h1>

              <div className="mt-8 space-y-3">

                <div className="flex items-center justify-between">
                  <p className="text-sm opacity-80">
                    Total Bookings
                  </p>

                  <p className="font-semibold">
                    {data.totalBookings}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm opacity-80">
                    Confirmed
                  </p>

                  <p className="font-semibold">
                    {data.completedBookings}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm opacity-80">
                    Pending
                  </p>

                  <p className="font-semibold">
                    {data.pendingBooking}
                  </p>
                </div>

              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;