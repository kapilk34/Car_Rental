import React, { useEffect, useRef, useState, useCallback } from 'react'
import Title from './Title'
import { assets } from '../assets/assets'
import CarCard from './CarCard'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const FeaturedSection = () => {
    const navigate = useNavigate()
    const { cars, fetchCars } = useAppContext()
    const sectionRef = useRef(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        fetchCars()
    }, [])

    const scrollToCars = () => {
        navigate('/cars')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleMouseMove = useCallback((e, cardRef) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        cardRef.current.style.setProperty('--mouse-x', `${x}%`)
        cardRef.current.style.setProperty('--mouse-y', `${y}%`)
    }, [])

    const handleSectionMouseMove = useCallback((e) => {
        if (!sectionRef.current) return
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        })
    }, [])

    const features = [
        {
            title: "Luxury Fleet",
            description: "Premium vehicles with cutting-edge technology, plush interiors, and unparalleled comfort for the discerning traveler.",
            gradient: "from-orange-500 via-amber-500 to-yellow-500",
            accent: "orange"
        },
        {
            title: "Global Network",
            description: "Seamless pick-up and drop-off across 500+ locations worldwide with real-time availability and instant booking.",
            gradient: "from-orange-600 via-amber-500 to-yellow-400",
            accent: "amber"
        },
        {
            title: "Concierge Security",
            description: "Fully insured rides with 24/7 premium support, encrypted payments, and white-glove service standards.",
            gradient: "from-amber-500 via-orange-500 to-red-400",
            accent: "orange"
        }
    ]

    return (
        <div 
            ref={sectionRef}
            onMouseMove={handleSectionMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className='relative overflow-hidden w-full py-28 px-1 md:px-8 lg:px-16 xl:px-20 bg-gradient-to-br from-slate-50 via-white to-orange-50/40'
        >
            {/* Ambient cursor-following glow - light mode */}
            <div 
                className='pointer-events-none absolute w-[600px] h-[600px] rounded-full blur-[120px] transition-opacity duration-700'
                style={{
                    background: 'radial-gradient(circle, rgba(251,146,60,0.15) 0%, rgba(234,88,12,0.05) 50%, transparent 70%)',
                    left: mousePosition.x - 300,
                    top: mousePosition.y - 300,
                    opacity: isHovering ? 0.3 : 0
                }}
            />

            {/* Soft Background Orbs - light mode */}
            <div className='absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-orange-300/30 to-amber-200/20 rounded-full blur-[100px] animate-pulse' />
            <div className='absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-tl from-orange-200/20 to-amber-300/15 rounded-full blur-[120px] animate-pulse delay-1000' />
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-100/30 to-amber-100/20 rounded-full blur-[150px]' />

            {/* Floating particles - light mode */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className='absolute rounded-full opacity-40'
                        style={{
                            width: `${Math.random() * 4 + 2}px`,
                            height: `${Math.random() * 4 + 2}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            background: `radial-gradient(circle, rgba(251,146,60,${Math.random() * 0.4 + 0.3}) 0%, transparent 70%)`,
                            animationDelay: `${Math.random() * 8}s`,
                            animationDuration: `${Math.random() * 15 + 10}s`,
                            animation: `float ${Math.random() * 15 + 10}s ease-in-out infinite, pulse ${Math.random() * 4 + 3}s ease-in-out infinite`
                        }}
                    />
                ))}
            </div>

            {/* Content Container */}
            <div className='relative z-10 max-w-7xl mx-auto w-full'>
                
                {/* Header */}
                <div className='flex flex-col items-center text-center mb-8'>
                    <Title
                        title="Featured Cars"
                        subtitle="Explore our exclusive selection of luxury and premium vehicles designed for comfort, elegance, and unforgettable journeys."
                        align="center"
                        className="max-w-4xl"
                    />
                    
                    <div className='mt-8 w-24 h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent' />
                </div>

                {/* Premium Feature Cards - Light Mode */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 w-full'>
                    {features.map((feature, idx) => {
                        const cardRef = useRef(null)
                        
                        return (
                            <div
                                key={idx}
                                ref={cardRef}
                                onMouseMove={(e) => handleMouseMove(e, cardRef)}
                                className='group relative'
                                style={{ perspective: '1000px' }}
                            >
                                <div 
                                    className='relative h-full rounded-3xl border border-gray-200/60 bg-white/80 backdrop-blur-xl p-8 lg:p-10 overflow-hidden transition-all duration-500 hover:border-orange-300/50 hover:bg-white hover:shadow-[0_8px_40px_rgba(251,146,60,0.12)] hover:-translate-y-2'
                                    style={{
                                        transformStyle: 'preserve-3d',
                                        transition: 'transform 0.1s ease-out, box-shadow 0.5s ease, border-color 0.5s ease, background-color 0.5s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-8px) rotateX(5deg) rotateY(-5deg)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0) rotateX(0) rotateY(0)'
                                    }}
                                >
                                    {/* Cursor-reactive spotlight overlay */}
                                    <div 
                                        className='pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                                        style={{
                                            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(251,146,60,0.08), transparent 40%)`
                                        }}
                                    />

                                    {/* Gradient border glow on hover */}
                                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700 blur-xl`} />

                                    {/* Content */}
                                    <div className='relative z-10'>
                                        <h3 className='text-2xl lg:text-3xl font-bold text-gray-800 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-amber-600 transition-all duration-500'>
                                            {feature.title}
                                        </h3>

                                        <p className='text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors duration-500'>
                                            {feature.description}
                                        </p>

                                        {/* Animated arrow */}
                                        <div className='mt-8 flex items-center gap-2 text-orange-500 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500'>
                                            <span className='text-sm font-medium'>Learn more</span>
                                            <svg className='w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Corner accent */}
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700 rounded-bl-full`} />
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* CTA Section */}
                <div className='mt-24 text-center'>
                    <button
                        onClick={scrollToCars}
                        className='group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-lg shadow-[0_4px_20px_rgba(251,146,60,0.3)] hover:shadow-[0_8px_40px_rgba(251,146,60,0.4)] hover:scale-105 active:scale-95 transition-all duration-500 overflow-hidden'
                    >
                        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000' />
                        
                        <span className='relative z-10'>Explore All Vehicles</span>
                        <svg className='relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                    
                    <p className='mt-4 text-sm text-gray-400'>
                        Browse 200+ premium vehicles available for instant booking
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    25% { transform: translateY(-20px) translateX(10px); }
                    50% { transform: translateY(-10px) translateX(-10px); }
                    75% { transform: translateY(-30px) translateX(5px); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.6; }
                }
            `}</style>
        </div>
    )
}

export default FeaturedSection