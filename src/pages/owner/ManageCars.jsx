import React, { useState, useEffect } from 'react';
import { assets } from "../../assets/assets";
import Title from '../../components/owners/Title';
import axios from 'axios';
import toast from 'react-hot-toast';

const ManageCars = () => {
  const currency = import.meta.env.VITE_CURRENCY
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOwnerCars = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('api/owner/cars');

      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message || 'Failed to fetch cars');
        setCars([]);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
      toast.error(error.response?.data?.message || 'Error fetching cars');
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAvailability = async (carId, currentStatus) => {
    try {
      const { data } = await axios.post('api/owner/toggle-car', { carId });

      if (data.success) {
        toast.success(data.message || 'Car availability updated');
        fetchOwnerCars();
      } else {
        toast.error(data.message || 'Failed to update car availability');
      }
    } catch (error) {
      console.error('Error toggling availability:', error);
      toast.error(error.response?.data?.message || 'Error updating car availability');
    }
  };

  const handleDeleteCar = async (carId) => {
    if (!window.confirm('Are you sure you want to delete this car?')) {
      return;
    }

    try {
      const { data } = await axios.post('api/owner/delete-car', { carId });

      if (data.success) {
        toast.success(data.message || 'Car removed successfully');
        fetchOwnerCars();
      } else {
        toast.error(data.message || 'Failed to delete car');
      }
    } catch (error) {
      console.error('Error deleting car:', error);
      toast.error(error.response?.data?.message || 'Error deleting car');
    }
  };

  useEffect(() => {
    fetchOwnerCars();
  }, []);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Cars"
        subTitle="View all listed cars, update their details, or remove them from the booking platform"
      />

      {loading ? (
        <div className="text-center py-10">
          <p className="text-text-secondary">Loading cars...</p>
        </div>
      ) : cars.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-text-secondary">No cars listed yet. Add your first car to get started!</p>
        </div>
      ) : (
        <div className="max-w-3xl w-full rounded-xl overflow-hidden border border-border mt-6">
          <table className="w-full border-collapse text-left text-sm text-text-secondary">
            <thead className="text-text-secondary bg-surface">
              <tr>
                <th className="p-3 font-medium">Car</th>
                <th className="p-3 font-medium max-md:hidden">Category</th>
                <th className="p-3 font-medium">Price</th>
                <th className="p-3 font-medium max-md:hidden">Status</th>
                <th className="p-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car._id} className="border-t border-border hover:bg-card transition-colors">
                  <td className="p-3 flex items-center gap-3">
                    <img src={car.image} alt={car.model} className="h-12 w-12 aspect-square rounded-md object-cover" />
                    <div className="max-md:hidden">
                      <p className="font-medium text-text-primary">{car.brand} {car.model}</p>
                      <p className="text-xs text-text-secondary">{car.seating_capacity} seats · {car.transmission}</p>
                    </div>
                  </td>
                  <td className="p-3 max-md:hidden">{car.category}</td>
                  <td className="p-3 text-text-primary">{currency}{car.pricePerDay} /day</td>
                  <td className="p-3 max-md:hidden">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      car.isAvaliable
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {car.isAvaliable ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td className="p-3 flex items-center gap-2">
                    <img src={car.isAvaliable ? assets.eye_close_icon : assets.eye_icon} alt="toggle"
                      className='cursor-pointer hover:opacity-70'
                      onClick={() => handleToggleAvailability(car._id, car.isAvaliable)}
                      title={car.isAvaliable ? 'Mark as unavailable' : 'Mark as available'} />
                    <img src={assets.delete_icon} alt='delete'
                      className='cursor-pointer hover:opacity-70'
                      onClick={() => handleDeleteCar(car._id)}
                      title='Delete car' />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageCars;
