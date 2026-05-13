import React from "react";
import { FaArrowRight, FaPlayCircle } from "react-icons/fa";

const HelloSection = () => {
  return (
    <section className="w-full bg-white py-20 px-6 md:px-14 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        
        {/* Left Content */}
        <div className="space-y-8">
          
          {/* Small Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
            🚗 Premium Car Rental Experience
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-black leading-tight text-gray-900">
            Hello,
            <br />
            Ready To Drive Your
            <span className="text-orange-500"> Dream Car?</span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
            Rent luxury, sports, and everyday cars with ease. 
            Fast booking, affordable pricing, and premium comfort 
            for every journey you take.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-5">
            <button className="group bg-orange-500 hover:bg-orange-600 text-white px-7 py-4 rounded-2xl font-semibold flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-orange-300">
              Explore Cars
              <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            <button className="flex items-center gap-3 text-gray-800 font-semibold hover:text-orange-500 transition-all">
              <FaPlayCircle className="text-3xl" />
              Watch Video
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">500+</h2>
              <p className="text-gray-500 mt-1">Cars Available</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900">20k+</h2>
              <p className="text-gray-500 mt-1">Happy Clients</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900">120+</h2>
              <p className="text-gray-500 mt-1">Pickup Locations</p>
            </div>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative flex items-center justify-center">
          
          {/* Background Glow */}
          <div className="absolute w-[450px] h-[450px] bg-orange-100 rounded-full blur-3xl opacity-60"></div>

          {/* Car Card */}
          <div className="relative bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-[40px] p-8 shadow-2xl backdrop-blur-md">
            
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop"
              alt="Luxury Car"
              className="w-full max-w-xl object-cover rounded-3xl"
            />

            {/* Floating Card */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-2xl px-6 py-4 flex items-center gap-5 border border-gray-100">
              <div>
                <p className="text-gray-500 text-sm">Starting From</p>
                <h3 className="text-2xl font-bold text-orange-500">
                  ₹2,499/day
                </h3>
              </div>

              <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold transition-all">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelloSection;