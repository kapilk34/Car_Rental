import React from 'react'
import { Navigate, useLocation, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import NavBar from './components/NavBar'
import Login from './components/Login'
import Home from './pages/Home'
import CarDetails from './pages/CarDetails'
import Cars from './pages/Cars'
import MyBookings from './pages/MyBookings'
import UserDashboard from './pages/UserDashboard'
import UserLayout from './pages/user/Layout'
import UserWishlist from './pages/user/Wishlist'
import Footer from './components/Footer'
import Layout from './pages/owner/Layout'
import Dashboard from './pages/owner/Dashboard'
import AddCar from './pages/owner/AddCar'
import ManageBookings from './pages/owner/ManageBookings'
import ManageCars from './pages/owner/ManageCars'
import { useAppContext } from './context/AppContext'

const ProtectedRoute = ({ children, ownerOnly = false, userOnly = false }) => {
  const { token, user, isOwner, isLoading } = useAppContext()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (!token || !user) return <Navigate to="/" replace />
  if (ownerOnly && !isOwner) return <Navigate to="/dashboard" replace />
  if (userOnly && isOwner) return <Navigate to="/owner" replace />

  return children
}

const App = () => {
  const {showLogin} = useAppContext()
  const pathname = useLocation().pathname
  const isOwnerPath = pathname.startsWith('/owner')
  const isDashboardPath = pathname.startsWith('/dashboard')

  return (
    <>
      <Toaster />
      {showLogin && <Login/>}
      {!isOwnerPath && !isDashboardPath && <NavBar/>}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/dashboard" element={<ProtectedRoute userOnly><UserLayout /></ProtectedRoute>}>
          <Route index element={<UserDashboard />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="wishlist" element={<UserWishlist />} />
        </Route>
        <Route path="/user-dashboard" element={<Navigate to="/dashboard" replace />} />
        <Route path="/my-bookings" element={<Navigate to="/dashboard/bookings" replace />} />
        <Route path="/admin" element={<Navigate to="/owner" replace />} />
        <Route path='/owner' element={<ProtectedRoute ownerOnly><Layout/></ProtectedRoute>}>
          <Route index element={<Dashboard/>}/>
          <Route path='add-car' element={<AddCar/>}/>
          <Route path='manage-cars' element={<ManageCars/>}/>
          <Route path='manage-bookings' element={<ManageBookings/>}/>
        </Route>
      </Routes>

    {!isOwnerPath && !isDashboardPath && <Footer/>}
    </>
  )
}

export default App
