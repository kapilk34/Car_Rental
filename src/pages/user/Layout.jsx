import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from '../../components/user/UserSidebar';
import UserMobileNav from '../../components/user/UserMobileNav';

const UserLayout = () => {
  return (
    <div className="h-screen overflow-hidden bg-background text-text-primary flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <UserSidebar />
        <main className="flex-1 overflow-y-auto bg-background">
          <UserMobileNav />
          <div className="p-4 md:p-8 bg-background">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
