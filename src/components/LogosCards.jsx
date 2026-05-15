import React from "react";

const carBrands = [
  {
    name: "BMW",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
  },
  {
    name: "Mercedes",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg",
  },
  {
    name: "Audi",
    logo: "https://pngimg.com/uploads/car_logo/car_logo_PNG1640.png",
  },
  {
    name: "Tesla",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg",
  },
  {
    name: "Lamborghini",
    logo: "https://upload.wikimedia.org/wikipedia/en/d/df/Lamborghini_Logo.svg",
  },
  {
    name: "Ferrari",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvd0HzN38mxkOQbvQmG8b3z0abov30OVwDGw&s",
  },
  {
    name: "Porsche",
    logo: "https://pngimg.com/uploads/porsche_logo/porsche_logo_PNG7.png",
  },
  {
    name: "Rolls Royce",
    logo: "https://toppng.com/uploads/preview/rolls-royce-car-logo-11530960515avtvcw0obc.png",
  },
];

const RunningStackCards = () => {
  return (
    <div className="w-full overflow-hidden py-10 md:py-12 bg-gradient-to-b from-white to-gray-100">
      {/* Heading */}
      <div className="text-center mb-8">
        <p className="text-orange-600 font-semibold uppercase tracking-[4px]\">
          Premium Brands
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
          Drive Your Dream Car
        </h2>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="flex w-max animate-marquee gap-8">
          {[...carBrands, ...carBrands].map((brand, index) => (
            <div
              key={index}
              className="group min-w-[220px] h-[140px] bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-lg transition-all duration-500 flex flex-col items-center justify-center"
            >
                <div className="w-16 h-16 flex items-center justify-center">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <p className="mt-3 text-lg font-semibold text-gray-700">
                {brand.name}
              </p>
            </div>
          ))}
        </div>

        {/* Left Blur */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10" />

        {/* Right Blur */}
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10" />
      </div>

      {/* Tailwind Custom Animation */}
      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-marquee {
            animation: marquee 20s linear infinite;
          }

          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </div>
  );
};

export default RunningStackCards;
