import React from 'react'
import Title from './Title'

const reasons = [
    { 
        title: 'Fully Insured', 
        description: 'Every rental comes with comprehensive insurance coverage so you drive with complete peace of mind.',
    },
    { 
        title: 'Flexible Hours', 
        description: 'Pick up and drop off at any time. Our 24/7 availability means your schedule is never compromised.',
    },
    { 
        title: 'Wide Coverage', 
        description: 'With 120+ pickup points across major Indian cities, there is always a DriveSphere location near you.',
    },
    { 
        title: '24/7 Support', 
        description: 'Our dedicated support team is always on standby to assist you before, during, and after your trip.',
    },
    { 
        title: 'Premium Quality', 
        description: 'Every vehicle in our fleet is regularly serviced, cleaned, and inspected to meet the highest standards.',
    },
    { 
        title: 'Instant Booking', 
        description: 'No waiting, no paperwork. Book your car in under 60 seconds and get a confirmation immediately.',
    },
]

const WhyChooseUs = () => {
    return (
        <section className="relative w-full py-20 md:py-28 px-4 md:px-8 lg:px-16 xl:px-20 bg-[var(--color-background)] overflow-hidden">
            <div className="absolute -left-40 top-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-50"
                style={{ background: 'radial-gradient(circle, rgba(26,86,219,0.12) 0%, transparent 70%)' }} />
            <div className="absolute -right-40 bottom-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-40"
                style={{ background: 'radial-gradient(circle, rgba(244,162,97,0.08) 0%, transparent 70%)' }} />

            <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
                style={{ 
                    backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)', 
                    backgroundSize: '48px 48px' 
                }} />

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center mb-16 md:mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-card)]/50 backdrop-blur-sm mb-6">
                        <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
                        <span className="text-xs font-medium text-[var(--color-text-secondary)] tracking-wide uppercase">Why DriveSphere</span>
                    </div>
                    <Title
                        title="Built Around Your Journey"
                        subtitle="We go beyond just renting cars. Every detail is crafted to give you a seamless, premium experience from start to finish."
                        align="center"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" style={{ perspective: '1200px' }}>
                    {reasons.map(({ title, description }, idx) => (
                        <div 
                            key={idx} 
                            className="group relative"
                            style={{ 
                                perspective: '400px',
                                transformStyle: 'preserve-3d'
                            }}
                        >
                            {/* 3D Card */}
                            <div 
                                className="relative flex flex-col gap-4 p-7 md:p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]/80 backdrop-blur-sm transition-all duration-500 ease-out overflow-hidden"
                                style={{
                                    transformStyle: 'preserve-3d',
                                    transform: 'translateZ(0)',
                                    boxShadow: '0 4px 24px -4px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
                                }}
                                onMouseMove={(e) => {
                                    const card = e.currentTarget;
                                    const rect = card.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const y = e.clientY - rect.top;
                                    const centerX = rect.width / 2;
                                    const centerY = rect.height / 2;
                                    const rotateX = (y - centerY) / 35;
                                    const rotateY = (centerX - x) / 25;
                                    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
                                    card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 30px rgba(0,0,0,0.12), 0 8px 32px -4px rgba(26,86,219,0.08)`;
                                }}
                                onMouseLeave={(e) => {
                                    const card = e.currentTarget;
                                    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)';
                                    card.style.boxShadow = '0 4px 24px -4px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)';
                                }}
                            >
                                {/* Shimmer overlay */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)',
                                        backgroundSize: '200% 100%',
                                        animation: 'shimmer 3s ease-in-out infinite'
                                    }}
                                />

                                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="flex flex-col gap-2.5" style={{ transform: 'translateZ(20px)' }}>
                                    <h3 className="font-bold text-[var(--color-text-primary)] text-lg tracking-tight">
                                        {title}
                                    </h3>
                                    <p className="text-sm text-[var(--color-text-secondary)]/80 leading-relaxed">
                                        {description}
                                    </p>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-primary)]/0 via-[var(--color-primary)]/40 to-[var(--color-primary)]/0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-b-2xl" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs