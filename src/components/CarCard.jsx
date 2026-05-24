import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const CarCard = ({ car }) => {
    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate();
    const { wishlist, toggleWishlist } = useAppContext();
    const isWishlisted = wishlist.includes(car._id);


    return (
        <div onClick={()=> {navigate(`/car-details/${car._id}`)}} className='group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer card-elevated'>
            <div className='relative h-48 overflow-hidden'>
                <img src={car.image} alt='Car Image' className='w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105'/>

                {(car.isAvailable || car.isAvaliable) && (
                    <p className='absolute top-4 left-4 text-white text-xs px-2.5 py-1 rounded-full font-semibold bg-primary'>
                        Available Now
                    </p>
                )}

                <button
                    type='button'
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    onClick={(event) => {
                        event.stopPropagation();
                        toggleWishlist(car._id);
                    }}
                    className='absolute top-4 right-4 h-9 w-9 rounded-full text-white shadow flex items-center justify-center transition'
                    style={{
                        backgroundColor: "rgba(17, 24, 39, 0.85)",
                        color: isWishlisted ? "#38BDF8" : "#94A3B8"
                    }}
                >
                    <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>

                <div className='absolute bottom-4 right-4 backdrop-blur-sm text-white px-3 py-1 rounded-lg' style={{ backgroundColor: "rgba(10, 15, 30, 0.8)" }}>
                    <span className='font-semibold text-accent'>
                        {currency}{car.pricePerDay}
                    </span>
                    <span className='text-lg font-semibold'> / day</span>
                </div>
            </div>

            <div className='p-4 sm:p-5 bg-card'>
                <div className='flex justify-between items-start mb-2'>
                    <h3 className='text-lg font-medium text-text-primary'>
                        {car.brand} {car.model}
                    </h3>
                    <p className='text-text-secondary text-sm'>
                        {car.category} . {car.year}
                    </p>
                </div>

                <div className='mt-4 grid grid-cols-2 gap-y-2'>
                    <div className='flex items-center text-sm text-text-secondary'>
                        <img src={assets.users_icon} alt='' className='h-4 mr-2' style={{ filter: "brightness(0.7)" }} />
                        <span>{car.seating_capacity} Seats</span>
                    </div>
                    <div className='flex items-center text-sm text-text-secondary'>
                        <img src={assets.fuel_icon} alt='' className='h-4 mr-2' style={{ filter: "brightness(0.7)" }} />
                        <span>{car.fuel_type}</span>
                    </div>
                    <div className='flex items-center text-sm text-text-secondary'>
                        <img src={assets.car_icon} alt='' className='h-4 mr-2' style={{ filter: "brightness(0.7)" }} />
                        <span>{car.transmission}</span>
                    </div>
                    <div className='flex items-center text-sm text-text-secondary'>
                        <img src={assets.location_icon} alt='' className='h-4 mr-2' style={{ filter: "brightness(0.7)" }} />
                        <span>{car.location}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarCard
