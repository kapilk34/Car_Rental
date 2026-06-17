import React from 'react';
import { CalendarDays, Car, Heart, Home, LayoutDashboard, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const userLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, end: true },
  { name: 'Bookings', path: '/dashboard/bookings', icon: CalendarDays },
  { name: 'Wishlist', path: '/dashboard/wishlist', icon: Heart },
  { name: 'Browse Cars', path: '/cars', icon: Car },
  { name: 'Home', path: '/', icon: Home },
];

const UserSidebar = () => {
  const { logout } = useAppContext();
  const navigate = useNavigate();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border bg-surface px-4 py-5 md:flex md:flex-col text-text-primary">
      <button onClick={() => navigate('/')} className="flex items-center gap-3 text-left">
        <img src="https://gvu57hqxi3.ufs.sh/f/FOd38ztMu1UwdyMcIgZp70jYMIdGQuW8qnyl5fzmKCVhtATS" alt="DriveSphere" className="h-10 w-10" />
        <div>
          <p className="text-lg font-bold text-text-primary">
            Drive<span className="text-orange-300">Sphere</span>
          </p>
          <p className="text-xs text-text-secondary">User dashboard</p>
        </div>
      </button>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {userLinks.map(({ name, path, icon: Icon, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-text-secondary hover:bg-card hover:text-text-primary'
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
        className="mt-6 flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-text-secondary hover:bg-red-950/20 hover:text-red-400 transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
};

export default UserSidebar;
