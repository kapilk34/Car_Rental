import React from 'react'
import { assets } from '../assets/assets'

const Banner = () => {
  return (
    <div className='relative flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-7 md:py-10 rounded-2xl overflow-hidden shadow-lg max-w-7xl mx-auto mb-20'
      style={{
        background: "linear-gradient(135deg, #1A56DB 0%, #1E3A8A 60%, #0F2460 100%)",
        boxShadow: "0 20px 40px rgba(26, 86, 219, 0.35)"
      }}
    >
      {/* Content */}
      <div className='text-white z-10 md:w-1/2 mb-8 md:mb-0'>
        <h2 className='text-3xl md:text-4xl font-bold mb-4'>Own a Luxury Car?</h2>
        <p className='text-lg font-medium mb-4'>Monetize your vehicle effortlessly by listing it on DriveSphere</p>
        <p className='text-sm md:text-base mb-6 opacity-90 leading-relaxed'>
          Experience top-tier vehicles and unmatched comfort at prices that suit every traveler – perfect for business trips, vacations, or special occasions.
        </p>
        <button className='px-8 py-3 bg-white text-primary hover:bg-white/90 transition-all duration-300 font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1'>
          List Your Car Now
        </button>
      </div>

      {/* Image */}
      <div className='relative z-10 w-full md:w-1/2 flex justify-center'>
        <img
          src={assets.banner_car_image}
          alt='Luxury car'
          className='max-h-64 md:max-h-80 lg:max-h-96 object-contain transition-transform duration-500 hover:scale-105'
        />
      </div>

      {/* Decorative elements */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-0'></div>
      <div className='absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/5'></div>
      <div className='absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/5'></div>
      <div className='absolute top-1/2 left-1/3 w-96 h-96 rounded-full bg-accent/5 blur-3xl -translate-y-1/2'></div>
    </div>
  )
}

export default Banner
