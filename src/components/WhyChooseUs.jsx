import React from 'react'
import Title from './Title'

const reasons = [
    { title: 'Fully Insured', description: 'Every rental comes with comprehensive insurance coverage so you drive with complete peace of mind.' },
    { title: 'Flexible Hours', description: 'Pick up and drop off at any time. Our 24/7 availability means your schedule is never compromised.' },
    { title: 'Wide Coverage', description: 'With 120+ pickup points across major Indian cities, there is always a DriveSphere location near you.' },
    { title: '24/7 Support', description: 'Our dedicated support team is always on standby to assist you before, during, and after your trip.' },
    { title: 'Premium Quality', description: 'Every vehicle in our fleet is regularly serviced, cleaned, and inspected to meet the highest standards.' },
    { title: 'Instant Booking', description: 'No waiting, no paperwork. Book your car in under 60 seconds and get a confirmation immediately.' },
]

const WhyChooseUs = () => {
    return (
        <section className='relative w-full py-15 md:py-15 px-4 md:px-8 lg:px-16 xl:px-20 bg-[var(--color-background)] overflow-hidden mb-20'>
            <div className='absolute -left-32 top-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-60'
                style={{ background: 'radial-gradient(circle, rgba(26,86,219,0.15) 0%, transparent 70%)' }} />
            <div className='absolute -right-32 bottom-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-60'
                style={{ background: 'radial-gradient(circle, rgba(244,162,97,0.1) 0%, transparent 70%)' }} />

            <div className='absolute inset-0 pointer-events-none opacity-[0.03]'
                style={{ backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className='relative z-10 max-w-7xl mx-auto'>
                <div className='flex flex-col items-center text-center mb-16'>
                    <Title
                        title='Built Around Your Journey'
                        subtitle='We go beyond just renting cars. Every detail is crafted to give you a seamless, premium experience from start to finish.'
                        align='center'
                    />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {reasons.map(({ title, description }, idx) => (
                        <div key={idx} className='group relative flex flex-col gap-3 p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] hover:-translate-y-1 transition-all duration-300'>
                            <span className='text-xs font-bold text-[var(--color-text-secondary)] opacity-40 group-hover:opacity-70 transition-opacity'>0{idx + 1}</span>
                            <h3 className='font-bold text-[var(--color-text-primary)] text-base'>{title}</h3>
                            <p className='text-sm text-[var(--color-text-secondary)] leading-relaxed'>{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs
