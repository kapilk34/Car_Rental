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
    { title: 'Total Cars', value: data.totalCars, icon: assets.carIconColored },
    { title: 'Total Bookings', value: data.totalBookings, icon: assets.listIconColored },
    { title: 'Pending', value: data.pendingBooking, icon: assets.cautionIconColored },
    { title: 'Confirmed', value: data.completedBookings, icon: assets.listIconColored },
  ];

  // Fetch dashboard data from backend
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
      console.error('Dashboard error:', error);
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
    <div className="px-4 pt-10 md:px-10 flex-1">
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <p className="text-lg text-gray-600">Loading dashboard data...</p>
        </div>
      ) : (
        <>
          <Title
            title="Admin Dashboard"
            subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
          />

      {/* Dashboard cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl">
        {DashboardCards.map((card, index) => (
          <div
            key={index}
            className="flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor"
          >
            <div>
              <h1 className="text-xs text-gray-500">{card.title}</h1>
              <p className="text-lg font-semibold">{card.value}</p>
            </div>

            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
              <img src={card.icon} alt="" className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="flex flex-wrap items-start gap-6 mb-8 w-full">
        <div className="p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full">
          <h1 className="text-lg font-medium">Recent Bookings</h1>
          <p className="text-gray-500">Latest Bookings</p>

          {data.recentBookings.map((booking, index) => (
            <div
              key={index}
              className="mt-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <img
                    src={assets.listIconColored}
                    alt=""
                    className="h-5 w-5"
                  />
                </div>
                <div>
                  <p>
                    {booking.car.brand} {booking.car.model}
                  </p>
                  <p className="text-sm text-gray-500">
                    {booking.createdAt.split('T')[0]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 font-medium">
                <p className="text-sm text-gray-500">
                  {currency}{booking.price}
                </p>
                <p className="px-3 py-0.5 border border-borderColor rounded-full text-sm">
                  {booking.status}
                </p>
              </div>
            </div>
          ))}
        </div>


        {/* monthly revenue */}
        <div className='p-4 md:p-6 mb-6 border border-borderColor rounded-md w-full md:max-w-xs'>
          <h1 className='text-lg font-medium'>Monthly Revenue</h1>
          <p className='text-gray-500'>Revenue for current month</p>
          <p className='text-3xl mt-6 font-semibold text-primary'>{currency}{data.monthlyRevenue}</p>
        </div>
      </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
