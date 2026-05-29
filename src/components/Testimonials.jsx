import React from 'react';
import Title from './Title';

const cardsData = [
    {
        image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
        name: 'Briar Martin',
        handle: '@neilstellar',
        date: 'April 20, 2025'
    },
    {
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
        name: 'Avery Johnson',
        handle: '@averywrites',
        date: 'May 10, 2025'
    },
    {
        image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
        name: 'Jordan Lee',
        handle: '@jordantalks',
        date: 'June 5, 2025'
    },
    {
        image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
        name: 'Avery Johnson',
        handle: '@averywrites',
        date: 'May 10, 2025'
    },
];

const CreateCard = ({ card }) => (
    <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0 bg-card border border-border hover:border-primary/30">
        <div className="flex gap-2">
            <img className="w-11 h-11 rounded-full object-cover" src={card.image} alt="User" />
            <div className="flex flex-col">
                <div className="flex items-center gap-1">
                    <p className="font-medium text-text-primary">{card.name}</p>
                    <svg className="mt-0.5" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <circle cx="6" cy="6" r="5" fill="#38BDF8" />
                        <path d="M3.75 6.15L5.25 7.65L8.45 4.35" stroke="white" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <span className="text-xs text-text-secondary">{card.handle}</span>
            </div>
        </div>
        <p className="text-sm py-4 text-text-secondary">Radiant made undercutting all of our competitors an absolute breeze.</p>
        <div className="flex items-center justify-between text-xs text-text-secondary">
            <div className="flex items-center gap-1">
                <span>Posted on</span>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                    <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="m.027 0 4.247 5.516L0 10h.962l3.742-3.926L7.727 10H11L6.514 4.174 10.492 0H9.53L6.084 3.616 3.3 0zM1.44.688h1.504l6.64 8.624H8.082z" fill="currentColor" />
                    </svg>
                </a>
            </div>
            <p>{card.date}</p>
        </div>
    </div>
);

const Testimonials = () => {
    return (
        <>
            <style>{`
                @keyframes marqueeScroll {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .marquee-inner {
                    animation: marqueeScroll 25s linear infinite;
                }
                .marquee-reverse {
                    animation-direction: reverse;
                }
            `}</style>

            <div className="py-14 md:py-20 bg-surface">
                <div className="flex flex-col items-center text-center mb-10">
                    <Title
                        title="What Our Customers Say"
                        subtitle="Thousands of happy drivers trust DriveSphere for their journeys. Here's what they have to say."
                        align="center"
                    />
                </div>
                <div className="marquee-row w-full mx-auto max-w-7xl overflow-hidden relative">
                    <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none"
                        style={{ background: "linear-gradient(to right, #111827, transparent)" }}></div>
                    <div className="marquee-inner flex min-w-[200%] pt-6 pb-4">
                        {[...cardsData, ...cardsData].map((card, index) => (
                            <CreateCard key={`top-${index}`} card={card} />
                        ))}
                    </div>
                    <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none"
                        style={{ background: "linear-gradient(to left, #111827, transparent)" }}></div>
                </div>

                <div className="marquee-row w-full mx-auto max-w-7xl overflow-hidden relative mt-5">
                    <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none"
                        style={{ background: "linear-gradient(to right, #111827, transparent)" }}></div>
                    <div className="marquee-inner marquee-reverse flex min-w-[200%] pt-6 pb-4">
                        {[...cardsData, ...cardsData].map((card, index) => (
                            <CreateCard key={`bottom-${index}`} card={card} />
                        ))}
                    </div>
                    <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none"
                        style={{ background: "linear-gradient(to left, #111827, transparent)" }}></div>
                </div>
            </div>
        </>
    );
};

export default Testimonials;
