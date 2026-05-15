import React from 'react';
import { CalendarDays, Car, Heart, Home, LayoutDashboard, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const links = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, end: true },
  { name: 'Bookings', path: '/dashboard/bookings', icon: CalendarDays },
  { name: 'Wishlist', path: '/dashboard/wishlist', icon: Heart },
  { name: 'Cars', path: '/cars', icon: Car },
  { name: 'Home', path: '/', icon: Home },
];

const UserMobileNav = () => {
  const { logout } = useAppContext();

  return (
    <div className="md:hidden sticky top-0 z-40 border-b border-borderColor bg-white px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-lg font-bold text-gray-900">
          Drive<span className="text-primary">Sphere</span>
        </p>
        <button
          onClick={logout}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-borderColor text-gray-600"
          aria-label="Logout"
        >
          <LogOut size={17} />
        </button>
      </div>

      <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {links.map(({ name, path, icon: Icon, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            className={({ isActive }) =>
              `inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                isActive ? 'bg-primary/10 text-primary' : 'bg-light text-gray-600'
              }`
            }
          >
            <Icon size={16} />
            {name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default UserMobileNav;
