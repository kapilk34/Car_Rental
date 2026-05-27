import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, Users, Fuel, Settings, MapPin, ArrowRight } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const CarCard = ({ car }) => {
    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate();
    const { wishlist, toggleWishlist } = useAppContext();
    const isWishlisted = wishlist.includes(car._id);

    return (
        <div
            onClick={() => navigate(`/car-details/${car._id}`)}
            className='group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300'
            style={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 40px rgba(37,99,235,0.18)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)'}
        >
            <div className='relative h-52 overflow-hidden'>
                <img
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                />

                <div className='absolute inset-0' style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)' }} />

                {/* Available badge */}
                {(car.isAvailable || car.isAvaliable) && (
                    <span className='absolute top-3 left-3 text-white text-xs px-3 py-1 rounded-full font-semibold tracking-wide'
                        style={{ background: 'linear-gradient(135deg, #2563EB, #4F46E5)' }}>
                        Available
                    </span>
                )}

                <button
                    type='button'
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    onClick={e => { e.stopPropagation(); toggleWishlist(car._id); }}
                    className='absolute top-3 right-3 h-9 w-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110'
                    style={{
                        backgroundColor: isWishlisted ? 'rgba(37,99,235,0.9)' : 'rgba(17,24,39,0.8)',
                        backdropFilter: 'blur(6px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: isWishlisted ? '#fff' : '#94A3B8',
                    }}
                >
                    <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>

                <div className='absolute bottom-3 left-4'>
                    <span className='text-2xl font-bold text-white'>{currency}{car.pricePerDay}</span>
                    <span className='text-xs text-gray-300 ml-1'>/ day</span>
                </div>

                <span className='absolute bottom-3 right-4 text-xs px-2.5 py-1 rounded-full font-medium'
                    style={{ backgroundColor: 'rgba(244,162,97,0.15)', color: 'var(--color-accent)', border: '1px solid rgba(244,162,97,0.3)' }}>
                    {car.category}
                </span>
            </div>

            <div className='p-5'>
                <div className='flex justify-between items-center mb-1'>
                    <h3 className='text-base font-bold tracking-tight' style={{ color: 'var(--color-text-primary)' }}>
                        {car.brand} {car.model}
                    </h3>
                    <span className='text-xs font-medium px-2 py-0.5 rounded'
                        style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-secondary)' }}>
                        {car.year}
                    </span>
                </div>

                <div className='flex items-center gap-1 mb-4' style={{ color: 'var(--color-text-secondary)' }}>
                    <MapPin size={12} />
                    <span className='text-xs'>{car.location}</span>
                </div>

                <div className='mb-4' style={{ height: '1px', backgroundColor: 'var(--color-border)' }} />

                <div className='flex items-center justify-between mb-5'>
                    {[
                        { icon: <Users size={13} />, label: `${car.seating_capacity} Seats` },
                        { icon: <Fuel size={13} />, label: car.fuel_type },
                        { icon: <Settings size={13} />, label: car.transmission },
                    ].map(({ icon, label }) => (
                        <div key={label} className='flex items-center gap-1.5 text-xs'
                            style={{ color: 'var(--color-text-secondary)' }}>
                            {icon}
                            <span>{label}</span>
                        </div>
                    ))}
                </div>

                <button
                    className='w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group/btn'
                    style={{
                        background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
                        color: '#fff',
                        boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,99,235,0.5)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 14px rgba(37,99,235,0.3)'}
                >
                    Rent Now
                </button>
            </div>
        </div>
    )
}

export default CarCard
