import React from 'react'
import Title from './Title'
import { ShieldCheck, Clock, MapPin, Headphones, Star, Zap } from 'lucide-react'

const stats = [
    { value: '50K+', label: 'Happy Customers' },
    { value: '500+', label: 'Cars Available' },
    { value: '120+', label: 'City Locations' },
    { value: '4.9★', label: 'Average Rating' },
]

const reasons = [
    {
        icon: ShieldCheck,
        title: 'Fully Insured',
        description: 'Every rental comes with comprehensive insurance coverage so you drive with complete peace of mind.',
    },
    {
        icon: Clock,
        title: 'Flexible Hours',
        description: 'Pick up and drop off at any time. Our 24/7 availability means your schedule is never compromised.',
    },
    {
        icon: MapPin,
        title: 'Wide Coverage',
        description: 'With 120+ pickup points across major cities, there is always a DriveSphere location near you.',
    },
    {
        icon: Headphones,
        title: '24/7 Support',
        description: 'Our dedicated support team is always on standby to assist you before, during, and after your trip.',
    },
    {
        icon: Star,
        title: 'Premium Quality',
        description: 'Every vehicle in our fleet is regularly serviced, cleaned, and inspected to meet the highest standards.',
    },
    {
        icon: Zap,
        title: 'Instant Booking',
        description: 'No waiting, no paperwork. Book your car in under 60 seconds and get a confirmation immediately.',
    },
]

const WhyChooseUs = () => {
    return (
        <section className='relative w-full py-16 md:py-20 px-4 md:px-8 lg:px-16 xl:px-20 bg-background overflow-hidden'>
            {/* Background orbs */}
            <div className='absolute -left-20 top-1/3 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none'
                style={{ background: 'radial-gradient(circle, rgba(26,86,219,0.1) 0%, transparent 70%)' }} />
            <div className='absolute -right-20 bottom-1/3 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none'
                style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 70%)' }} />

            <div className='relative z-10 max-w-7xl mx-auto'>
                <div className='flex flex-col items-center text-center mb-14'>
                    <Title
                        title='Why Choose DriveSphere'
                        subtitle='We go beyond just renting cars. Every detail is crafted to give you a seamless, premium experience from start to finish.'
                        align='center'
                    />
                </div>

                {/* Stats bar */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-14'>
                    {stats.map(({ value, label }) => (
                        <div key={label} className='flex flex-col items-center justify-center p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300'>
                            <span className='text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent'>
                                {value}
                            </span>
                            <span className='text-sm text-text-secondary mt-1'>{label}</span>
                        </div>
                    ))}
                </div>

                {/* Reasons grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {reasons.map(({ icon: Icon, title, description }, idx) => (
                        <div key={idx} className='group flex gap-5 p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:bg-surface transition-all duration-400 hover:-translate-y-0.5'>
                            <div className='shrink-0 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300'>
                                <Icon size={22} className='text-primary group-hover:text-accent transition-colors duration-300' />
                            </div>
                            <div>
                                <h3 className='font-semibold text-text-primary mb-1.5'>{title}</h3>
                                <p className='text-sm text-text-secondary leading-relaxed'>{description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs
