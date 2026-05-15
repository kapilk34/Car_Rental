import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from '../../components/user/UserSidebar';
import UserMobileNav from '../../components/user/UserMobileNav';

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-light">
      <div className="flex min-h-screen">
        <UserSidebar />
        <main className="flex-1 min-w-0">
          <UserMobileNav />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
