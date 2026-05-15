import React from 'react'
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const NavBarOwner = () => {

  const { user } = useAppContext()
  return (
    <div className='flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all'>
      <Link to='/'>
        <div className='h-7 flex items-center group'>
          <img src="https://gvu57hqxi3.ufs.sh/f/FOd38ztMu1UwdyMcIgZp70jYMIdGQuW8qnyl5fzmKCVhtATS" className="h-14 w-auto" alt="DriveSphere Logo" />
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Drive<span className="text-orange-600">Sphere</span>
          </h1>
        </div>
      </Link>
      <div className="flex flex-col">
        <h3 className="text-xl font-bold text-gray-800">
          Welcome,{" "}
          <span className="text-orange-500">
            {user?.name || "Owner"}
          </span>
        </h3>
      </div>
    </div>
  )
}

export default NavBarOwner;