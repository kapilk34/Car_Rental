import React from "react";
import { FaArrowRight, FaPlayCircle } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      <div className="absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -right-20 top-20 h-[380px] w-[380px] rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-10 md:px-14">
        <div className="grid items-center gap-10 py-12 md:py-16 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-surface/70 px-4 py-2 text-sm font-medium text-accent backdrop-blur">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                🚗
              </span>
              Premium Car Rental Experience
            </div>

            <h1 className="text-4xl font-semibold leading-tight text-text-primary sm:text-5xl md:text-6xl">
              Hello, Ready To
              <br />
              Drive Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">
                {" "}Dream Car?
              </span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-text-secondary">
              Rent luxury, sports, and everyday cars with ease. Fast booking,
              affordable pricing, and premium comfort for every journey you take.
            </p>

            <div className="grid grid-cols-3 gap-5 pt-4">
              <div className="rounded-2xl border border-border bg-card/60 p-4">
                <h2 className="text-2xl font-bold text-text-primary">500+</h2>
                <p className="mt-1 text-sm text-text-secondary">Cars Available</p>
              </div>
              <div className="rounded-2xl border border-border bg-card/60 p-4">
                <h2 className="text-2xl font-bold text-text-primary">20k+</h2>
                <p className="mt-1 text-sm text-text-secondary">Happy Clients</p>
              </div>
              <div className="rounded-2xl border border-border bg-card/60 p-4">
                <h2 className="text-2xl font-bold text-text-primary">120+</h2>
                <p className="mt-1 text-sm text-text-secondary">Pickup Locations</p>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center pt-3">
            <div className="absolute h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />

            <div className="relative rounded-[40px] border border-primary/30 bg-gradient-to-br from-surface to-card p-6 shadow-2xl backdrop-blur-xl">
              <div className="overflow-hidden rounded-3xl border border-border/50">
                <img
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop"
                  alt="Luxury Car"
                  className="h-full w-full max-w-xl object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>

              <div className="absolute -bottom-6 left-1/2 w-[calc(100%-24px)] -translate-x-1/2 sm:w-auto">
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card/95 px-5 py-4 shadow-xl backdrop-blur">
                  <div>
                    <p className="text-sm text-text-secondary">Starting From</p>
                    <h3 className="text-2xl font-bold text-primary">₹2,499/day</h3>
                  </div>
                  <button className="px-5 py-3 text-white font-semibold bg-primary hover:opacity-90 transition-all duration-300 rounded-xl">
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-primary/5 blur-xl" />
            <div className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-accent/5 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
