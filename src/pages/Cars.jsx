import React, { useState, useEffect } from 'react';
import Title from "../components/Title";
import CarCard from "../components/CarCard";
import { assets } from "../assets/assets";
import { useAppContext } from '../context/AppContext';

const Cars = () => {
  const [input, setInput] = useState("");
  const { cars, fetchCars } = useAppContext();
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    if (input === "") {
      setFilteredCars(cars);
    } else {
      const filtered = cars.filter(car =>
        car.brand?.toLowerCase().includes(input.toLowerCase()) ||
        car.model?.toLowerCase().includes(input.toLowerCase()) ||
        car.category?.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredCars(filtered);
    }
  }, [input, cars]);

  return (
    <div className="bg-light min-h-screen">
      <div className="flex flex-col items-center py-20 px-4">
        <Title 
          title="Available Cars" 
          subTitles="Browse our selection of premium vehicles available for your next adventure" 
        />

        {/* Search Bar */}
        <div className="flex items-center bg-white px-5 mt-8 max-w-2xl w-full h-14 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img src={assets.search_icon} alt="search" className="w-5 h-5 mr-3 opacity-70"/>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text" 
            placeholder="Search by make, model, or features..." 
            className="w-full h-full outline-none text-gray-600 placeholder-gray-400"
          />
          <button className="ml-3 px-4 py-1 bg-primary text-white rounded-full hover:bg-primary-dark transition">
            Search
          </button>
          <img src={assets.filter_icon} alt="filter" className="w-4.5 h-4.5 ml-2"/>
        </div>

        <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
          <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>Showing {filteredCars.length} Cars</p>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
            {filteredCars.length > 0 ? (
              filteredCars.map((car, index) => (
                <div key={index}>
                  <CarCard car={car} />
                </div>
              ))
            ) : (
              <p className='text-gray-400 text-center col-span-full'>No cars available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cars;
