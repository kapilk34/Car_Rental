import React, { useState, useRef } from 'react'
import Title from './Title'

const NewsLetter = () => {
    const [email, setEmail] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const inputRef = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email || !email.includes('@')) return
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setIsLoading(false)
        setIsSubmitted(true)
        setEmail('')
    }

    const handleReset = () => {
        setIsSubmitted(false)
        setEmail('')
        setTimeout(() => inputRef.current?.focus(), 100)
    }

    return (
        <div className="relative w-full overflow-hidden py-14 md:py-16 px-4 bg-background">
            <div className="absolute inset-0 opacity-60"
                style={{ background: "linear-gradient(135deg, rgba(26,86,219,0.08) 0%, rgba(56,189,248,0.04) 100%)" }} />
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(26,86,219,0.12), transparent)" }} />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(56,189,248,0.08), transparent)" }} />

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full animate-float"
                        style={{
                            background: "rgba(26,86,219,0.3)",
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${Math.random() * 8 + 6}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-3xl mx-auto text-center">
                {!isSubmitted ? (
                    <>
                        <div className="mb-6">
                            <Title
                                title="Never Miss a Deal!"
                                subtitle="Subscribe to get the latest offers, new arrivals, and exclusive discounts delivered straight to your inbox."
                                align="center"
                            />
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className={`relative flex flex-col sm:flex-row items-center gap-3 max-w-xl mx-auto transition-all duration-500 ${isFocused ? 'scale-[1.02]' : 'scale-100'}`}
                        >
                            <div className="relative flex-1 w-full group">
                                <div className="relative flex items-center border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-card"
                                    style={{ borderColor: isFocused ? "#38BDF8" : "#1E2D45" }}
                                >
                                    <div className="pl-4 transition-colors duration-300"
                                        style={{ color: isFocused ? "#38BDF8" : "#94A3B8" }}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <input
                                        ref={inputRef}
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        placeholder="Enter your email address"
                                        required
                                        className="w-full px-3 py-4 bg-transparent outline-none text-base text-text-primary placeholder-text-secondary"
                                    />
                                    {email && (
                                        <button type="button" onClick={() => setEmail('')} className="pr-4 text-text-secondary hover:text-text-primary transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || !email}
                                className="relative w-full sm:w-auto px-8 py-4 rounded-xl text-white font-semibold text-base bg-primary shadow-lg shadow-primary/30 hover:opacity-90 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                {isLoading ? (
                                    <span className="relative z-10 flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                        </svg>
                                        Subscribing...
                                    </span>
                                ) : (
                                    <span className="relative z-10 flex items-center gap-2">
                                        Subscribe
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                )}
                            </button>
                        </form>

                        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-text-secondary">
                            {[
                                { text: "No spam, ever", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
                                { text: "Unsubscribe anytime", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
                                { text: "10,000+ subscribers", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
                            ].map(({ text, icon }) => (
                                <div key={text} className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                                    </svg>
                                    <span>{text}</span>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="py-8">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg"
                            style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 10px 25px rgba(16,185,129,0.3)" }}
                        >
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">You're Subscribed!</h3>
                        <p className="text-text-secondary mb-8 max-w-md mx-auto">
                            Welcome aboard! Check your inbox for a confirmation email and get ready for exclusive deals.
                        </p>
                        <button
                            onClick={handleReset}
                            className="px-6 py-3 rounded-xl border border-border text-text-secondary font-medium hover:bg-card hover:border-primary/40 transition-all duration-300"
                        >
                            Subscribe another email
                        </button>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(5deg); }
                }
                .animate-float { animation: float 6s ease-in-out infinite; }
            `}</style>
        </div>
    )
}

export default NewsLetter
