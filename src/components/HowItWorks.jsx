import React, { useRef, useEffect, useState } from 'react'
import Title from './Title'
import { Search, CalendarCheck, Car, ArrowRight } from 'lucide-react'

const steps = [
    {
        number: '01',
        title: 'Browse & Choose',
        description: 'Explore our wide fleet of premium vehicles. Filter by category, location, price, and availability to find your perfect match.',
        gradientFrom: '#f97316',
        gradientTo: '#fbbf24',
        glowColor: 'rgba(249,115,22,0.15)',
        tag: 'Step 1',
    },
    {
        number: '02',
        title: 'Book Instantly',
        description: 'Select your pickup date, drop-off date, and location. Confirm your booking in seconds with our seamless checkout.',
        gradientFrom: '#8b5cf6',
        gradientTo: '#a78bfa',
        glowColor: 'rgba(139,92,246,0.15)',
        tag: 'Step 2',
    },
    {
        number: '03',
        title: 'Hit the Road',
        description: 'Pick up your car at the chosen location and enjoy the ride. Return it hassle-free when your trip is done.',
        gradientFrom: '#10b981',
        gradientTo: '#2dd4bf',
        glowColor: 'rgba(16,185,129,0.15)',
        tag: 'Step 3',
    },
]

const StepCard = ({ step, idx, isVisible }) => {
    return (
        <div
            className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: `${idx * 160}ms` }}
        >
            {idx < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-card border border-border items-center justify-center shadow-lg">
                    <ArrowRight size={16} className="text-text-secondary" />
                </div>
            )}

            <div
                className="group relative h-full rounded-3xl bg-card border border-border overflow-hidden hover:-translate-y-2 transition-all duration-500 hover:border-opacity-60"
                style={{ '--glow': step.glowColor }}
            >

                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                    style={{ background: `radial-gradient(circle at top right, ${step.glowColor} 0%, transparent 65%)` }}
                />

                <div className="relative p-7 flex flex-col h-full">

                    <div className="flex items-center justify-between mb-5">
                        <span
                            className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
                            style={{
                                color: step.gradientFrom,
                                borderColor: `${step.gradientFrom}40`,
                                background: `${step.gradientFrom}12`,
                            }}
                        >
                            {step.tag}
                        </span>
                        <span
                            className="text-5xl font-black leading-none select-none opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                            style={{ background: `linear-gradient(135deg, ${step.gradientFrom}, ${step.gradientTo})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                        >
                            {step.number}
                        </span>
                    </div>

                    <h3 className="text-lg font-bold text-text-primary mb-2">{step.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed flex-1">{step.description}</p>

                    <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ color: step.gradientFrom }}>
                        Get started <ArrowRight size={12} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const HowItWorks = () => {
    const sectionRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
            { threshold: 0.15 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section ref={sectionRef} className="relative w-full py-15 md:py-15 px-4 md:px-8 lg:px-16 xl:px-20 bg-black-800 overflow-hidden mb-20">
            <div className="relative z-10 max-w-6xl mx-auto">
                <div className={`flex flex-col items-center text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    <Title
                        title="How It Works"
                        subtitle="Renting a car has never been easier. Three simple steps and you are on your way."
                        align="center"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {steps.map((step, idx) => (
                        <StepCard key={idx} step={step} idx={idx} isVisible={isVisible} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HowItWorks
