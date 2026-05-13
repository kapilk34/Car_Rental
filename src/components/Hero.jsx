import React from 'react';
import { useState } from 'react';
import { assets, cityList } from '../assets/assets';

const Hero = () => {
  const [pickUpLocation, setPickUpLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-12 bg-gradient-to-b from-gray-50 to-gray-100 text-center px-4 py-12 relative overflow-hidden'>
      {/* Decorative elements */}
      <div className='absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-100 opacity-20 blur-3xl'></div>
      <div className='absolute bottom-0 left-0 w-80 h-80 rounded-full bg-blue-200 opacity-10 blur-3xl'></div>
      
      <div className='space-y-4 max-w-3xl relative z-10'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900'>
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800'>
            Luxury Cars
          </span> on Rent
        </h1>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
          Experience premium comfort and style with our exclusive collection of luxury vehicles
        </p>
      </div>

      <div className='mt-8 w-full max-w-4xl flex justify-center relative z-10'>
        <img 
          src={assets.main_car} 
          alt='luxury car' 
          className='max-h-96 object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105' 
        />
      </div>
    </div>
  )
}

export default Hero;