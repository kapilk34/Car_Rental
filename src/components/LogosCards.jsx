import React from "react";
import Title from "./Title";

const carBrands = [
  { name: "Tata", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_logo.svg" },
  { name: "Mahindra", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt-UplgweVikarHA-VbFMIV9cw6EftrjNnGg&s" },
  { name: "Maruti Suzuki", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbTldPeFhG7OlwL7iVbqgNsQVHGmZ5_gH34Q&s" },
  { name: "Hyundai", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg" },
  { name: "Kia", logo: "https://e7.pngegg.com/pngimages/386/214/png-clipart-kia-new-logo-car-logos-thumbnail.png" },
  { name: "Toyota", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Toyota_logo_%28Red%29.svg/3840px-Toyota_logo_%28Red%29.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail" },
  { name: "Honda", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg" },
  { name: "MG", logo: "https://icon2.cleanpng.com/20190315/cfr/kisspng-mg-zs-car-mg-6-saic-motor-1713901018465.webp" },
];

const RunningStackCards = () => {
  return (
    <div className="w-full overflow-hidden py-10 md:py-12 bg-surface">
      <div className="mb-8">
        <Title title="Drive Your Dream Car" subtitle="Thousands of happy drivers trust DriveSphere for their journeys. Here's what they have to say." align="center" />
      </div>

      <div className="relative">
        <div className="flex w-max animate-marquee gap-8">
          {[...carBrands, ...carBrands].map((brand, index) => (
            <div
              key={index}
              className="group min-w-[220px] h-[140px] border border-border bg-card rounded-3xl shadow-lg transition-all duration-500 flex flex-col items-center justify-center hover:border-accent/40 hover:bg-surface hover:shadow-primary/10"
            >
              <div className="w-16 h-16 flex items-center justify-center">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 brightness-75 group-hover:brightness-100"
                />
              </div>
              <p className="mt-3 text-lg font-semibold text-text-primary">{brand.name}</p>
            </div>
          ))}
        </div>

        <div className="absolute top-0 left-0 w-32 h-full z-10"
          style={{ background: "linear-gradient(to right, #111827, transparent)" }} />
        <div className="absolute top-0 right-0 w-32 h-full z-10"
          style={{ background: "linear-gradient(to left, #111827, transparent)" }} />
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default RunningStackCards;
