import React, { useEffect, useMemo } from 'react';
import { Heart, MapPin, Users } from 'lucide-react';
import Title from '../../components/Title';
import { useAppContext } from '../../context/AppContext';

const Wishlist = () => {
  const { cars, fetchCars, navigate, wishlist, toggleWishlist } = useAppContext();
  const currency = import.meta.env.VITE_CURRENCY;

  const wishlistCars = useMemo(
    () => cars.filter((car) => wishlist.includes(car._id)),
    [cars, wishlist]
  );

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="px-4 md:px-8 py-8 text-text-primary">
      <div className="max-w-6xl">
        <Title
          title="Wishlist"
          subtitle="Cars you saved for your next trip."
          align="left"
        />

        {wishlistCars.length === 0 ? (
          <div className="mt-8 rounded-lg border border-border bg-card px-6 py-16 text-center">
            <Heart className="mx-auto text-primary" size={34} />
            <h2 className="mt-4 text-xl font-semibold text-text-primary">No saved cars yet</h2>
            <p className="mt-2 text-sm text-text-secondary">Browse cars and tap the heart icon to save them here.</p>
            <button
              onClick={() => navigate('/cars')}
              className="mt-6 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
            >
              Browse Cars
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {wishlistCars.map((car) => (
              <div key={car._id} className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
                <img src={car.image} alt="" className="h-44 w-full object-cover" />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-text-primary">{car.brand} {car.model}</h2>
                      <p className="mt-1 text-sm text-text-secondary">{car.category} . {car.year}</p>
                    </div>
                    <p className="text-sm font-semibold text-primary">{currency}{car.pricePerDay}/day</p>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-text-secondary">
                    <span className="inline-flex items-center gap-2">
                      <Users size={16} />
                      {car.seating_capacity} Seats
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <MapPin size={16} />
                      {car.location}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => navigate(`/car-details/${car._id}`)}
                      className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition"
                    >
                      Book
                    </button>
                    <button
                      onClick={() => toggleWishlist(car._id)}
                      className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-text-secondary hover:border-primary hover:text-primary transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
