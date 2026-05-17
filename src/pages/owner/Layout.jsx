import React, { useEffect } from 'react'
import NavBarOwner from '../../components/owners/NavBarOwner'
import Sidebar from '../../components/owners/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Layout = () => {
  const { user, isOwner, token, isLoading } = useAppContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoading) return;

    if (!token || !user) {
      toast.error('Please login first')
      navigate('/')
      return
    }

    if (!isOwner) {
      toast.error('Only owners can access this page')
      navigate('/')
      return
    }
  }, [token, isOwner, navigate, user, isLoading])

  if (isLoading || !token || !user || !isOwner) {
    return (
        <div className="flex justify-center items-center h-screen w-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
        </div>
    )
  }

  return (
    <div className='flex flex-col h-screen overflow-hidden bg-slate-50'>
      <NavBarOwner/>
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar/>
        <div className='flex-1 overflow-y-auto p-4 md:p-8'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Layout