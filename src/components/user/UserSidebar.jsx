import React from 'react';
import { CalendarDays, Car, Heart, Home, LayoutDashboard, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const userLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, end: true },
  { name: 'Bookings', path: '/dashboard/bookings', icon: CalendarDays },
  { name: 'Wishlist', path: '/dashboard/wishlist', icon: Heart },
  { name: 'Browse Cars', path: '/cars', icon: Car },
  { name: 'Home', path: '/', icon: Home },
];

const UserSidebar = () => {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-borderColor bg-white px-4 py-5 md:flex md:flex-col">
      <button onClick={() => navigate('/')} className="flex items-center gap-3 text-left">
        <img src={assets.logo} alt="DriveSphere" className="h-10 w-10" />
        <div>
          <p className="text-lg font-bold text-gray-900">
            Drive<span className="text-primary">Sphere</span>
          </p>
          <p className="text-xs text-gray-500">User dashboard</p>
        </div>
      </button>

      <div className="mt-8 flex items-center gap-3 rounded-lg border border-borderColor bg-light p-3">
        <img
          src={user?.image || assets.user_profile}
          alt=""
          className="h-11 w-11 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-900">{user?.name || 'User'}</p>
          <p className="truncate text-xs text-gray-500">{user?.email}</p>
        </div>
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {userLinks.map(({ name, path, icon: Icon, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
              }`
            }
          >
            <Icon size={18} />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>

      <button
        onClick={logout}
        className="mt-6 flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
};

export default UserSidebar;
