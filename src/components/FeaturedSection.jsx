import React, { useEffect, useRef } from 'react'
import Title from './Title'
import { assets } from '../assets/assets'
import CarCard from './CarCard'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const FeaturedSection = () => {
    const navigate = useNavigate()
    const { cars, fetchCars } = useAppContext()
    const sectionRef = useRef(null)

    useEffect(() => {
        fetchCars()
    }, [])

    // Smooth scroll to cars section
    const scrollToCars = () => {
        navigate('/cars')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div ref={sectionRef} className='relative overflow-hidden py-24 px-4 md:px-8 lg:px-16 xl:px-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30'>

            {/* Animated Background Elements */}
            <div className='absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl opacity-20 animate-pulse'></div>
            <div className='absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-indigo-400 to-pink-400 rounded-full blur-3xl opacity-20 animate-pulse delay-1000'></div>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-3xl opacity-10'></div>
            
            {/* Floating particles effect */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className='absolute bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-20 animate-float'
                        style={{
                            width: `${Math.random() * 6 + 2}px`,
                            height: `${Math.random() * 6 + 2}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${Math.random() * 10 + 5}s`
                        }}
                    />
                ))}
            </div>

            {/* Top Section */}
            <div className='flex flex-col items-center text-center relative z-10 max-w-7xl mx-auto'>
                <div className='max-w-4xl'>
                    <Title
                        title="Featured Cars"
                        subtitle="Explore our exclusive selection of luxury and premium vehicles designed for comfort, elegance, and unforgettable journeys."
                        align="center"
                    />
                </div>

                {/* Feature Cards with Enhanced Design */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 w-full'>
                    {[
                        {
                            bgGradient: "from-blue-500 to-cyan-500",
                            title: "Luxury Cars",
                            description: "Drive premium luxury vehicles with modern comfort, advanced technology, and stylish interiors.",
                            color: "blue"
                        },
                        {
                            bgGradient: "from-indigo-500 to-purple-500",
                            title: "Multiple Locations",
                            description: "Pick up and drop off your car conveniently from multiple locations across the city.",
                            color: "indigo"
                        },
                        {
                            bgGradient: "from-purple-500 to-pink-500",
                            title: "Safe & Secure",
                            description: "Enjoy fully insured rides with professional support and secure booking experience.",
                            color: "purple"
                        }
                    ].map((feature, idx) => (
                        <div
                            key={idx}
                            className='group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 cursor-pointer overflow-hidden'
                        >
                            {/* Animated gradient border */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
                            
                            <div className='relative z-10'>
                                <h3 className='text-2xl font-bold text-gray-800 mb-3 group-hover:text-white transition-colors duration-300'>
                                    {feature.title}
                                </h3>

                                <p className='text-gray-600 leading-relaxed group-hover:text-white/90 transition-colors duration-300'>
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Add custom animations */}
            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                    opacity: 0;
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                
                .delay-1000 {
                    animation-delay: 1s;
                }
            `}</style>
        </div>
    )
}

export default FeaturedSection