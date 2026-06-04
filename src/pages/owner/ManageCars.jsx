import React, { useState, useEffect } from 'react';
import { assets } from "../../assets/assets";
import Title from '../../components/owners/Title';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiCamera, FiX, FiCheck, FiEdit2, FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi';
import { Tag, MapPin, Calendar, Users, Zap, Droplets, DollarSign, AlignLeft, Car } from 'lucide-react';

const LOCATIONS = ['Delhi', 'Mumbai', 'Bangalore', 'Chandigarh', 'Pune', 'Hyderabad', 'Jaipur', 'Kolkata', 'Chennai', 'Ahmedabad'];
const CATEGORIES = ['Maruti Suzuki', 'Tata Motors', 'Mahindra', 'Hyundai', 'Kia', 'Honda', 'Toyota', 'MG Motors', 'Skoda', 'Volkswagen'];

const inputStyle = {
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  color: 'var(--color-text-primary)',
};
const optionStyle = { backgroundColor: 'var(--color-card)' };
const onFocus = (e) => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.15)'; };
const onBlur  = (e) => { e.target.style.borderColor = 'var(--color-border)';  e.target.style.boxShadow = 'none'; };
const inputCls = "w-full px-3.5 py-2.5 rounded-lg text-sm outline-none transition-all duration-200";

const Field = ({ label, icon: Icon, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide flex items-center gap-1.5">
      {Icon && <Icon size={12} className="text-primary" />}
      {label}
    </label>
    {children}
  </div>
);

const EditModal = ({ car, onClose, onSaved }) => {
  const currency = import.meta.env.VITE_CURRENCY || '₹';
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    brand: car.brand, model: car.model, year: car.year,
    pricePerDay: car.pricePerDay, category: car.category,
    transmission: car.transmission, fuel_type: car.fuel_type,
    seating_capacity: car.seating_capacity, location: car.location,
    description: car.description,
  });

  const set = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('carId', car._id);
      formData.append('carData', JSON.stringify(form));
      if (newImage) formData.append('image', newImage);
      const { data } = await axios.post('api/owner/update-car', formData);
      if (data.success) {
        toast.success(data.message);
        onSaved();
        onClose();
      } else {
        toast.error(data.message || 'Failed to update car');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating car');
    } finally {
      setLoading(false);
    }
  };

  const previewSrc = newImage ? URL.createObjectURL(newImage) : car.image;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl border border-border shadow-2xl animate-slideUp"
        style={{ backgroundColor: 'var(--color-card)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-border rounded-t-2xl"
          style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <FiEdit2 size={16} className="text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-text-primary text-base leading-tight">Edit Vehicle</h2>
              <p className="text-xs text-text-secondary">{car.brand} {car.model}</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface transition-all">
            <FiX size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">

          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <FiCamera size={12} className="text-primary" /> Vehicle Photo
            </p>
            <label className="block cursor-pointer group">
              <input type="file" accept="image/*" className="hidden" onChange={(e) => setNewImage(e.target.files[0])} />
              <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-dashed border-border group-hover:border-primary transition-colors duration-300">
                <img src={previewSrc} alt="preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <FiCamera size={20} className="text-white" />
                  </div>
                  <span className="text-white text-sm font-semibold">Change Photo</span>
                  <span className="text-white/60 text-xs">PNG, JPG or WEBP</span>
                </div>
              </div>
              {newImage && (
                <p className="mt-1.5 text-xs text-primary text-center">✓ {newImage.name}</p>
              )}
            </label>
          </div>

          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-3 pb-2 border-b border-border">
              Vehicle Information
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Brand" icon={Tag}>
                <input type="text" required className={inputCls} style={inputStyle} onFocus={onFocus} onBlur={onBlur} value={form.brand} onChange={set('brand')} />
              </Field>
              <Field label="Model" icon={Tag}>
                <input type="text" required className={inputCls} style={inputStyle} onFocus={onFocus} onBlur={onBlur} value={form.model} onChange={set('model')} />
              </Field>
              <Field label="Year" icon={Calendar}>
                <input type="number" required className={inputCls} style={inputStyle} onFocus={onFocus} onBlur={onBlur} value={form.year} onChange={set('year')} />
              </Field>
              <Field label="Seats" icon={Users}>
                <input type="number" required min="1" className={inputCls} style={inputStyle} onFocus={onFocus} onBlur={onBlur} value={form.seating_capacity} onChange={set('seating_capacity')} />
              </Field>
              <Field label="Category" icon={Tag}>
                <select required className={inputCls} style={inputStyle} onFocus={onFocus} onBlur={onBlur} value={form.category} onChange={set('category')}>
                  {CATEGORIES.map(c => <option key={c} value={c} style={optionStyle}>{c}</option>)}
                </select>
              </Field>
              <Field label="Location" icon={MapPin}>
                <select required className={inputCls} style={inputStyle} onFocus={onFocus} onBlur={onBlur} value={form.location} onChange={set('location')}>
                  {LOCATIONS.map(l => <option key={l} value={l} style={optionStyle}>{l}</option>)}
                </select>
              </Field>
              <Field label="Transmission" icon={Zap}>
                <select required className={inputCls} style={inputStyle} onFocus={onFocus} onBlur={onBlur} value={form.transmission} onChange={set('transmission')}>
                  {['Automatic', 'Manual', 'Semi-Automatic'].map(t => <option key={t} value={t} style={optionStyle}>{t}</option>)}
                </select>
              </Field>
              <Field label="Fuel Type" icon={Droplets}>
                <select required className={inputCls} style={inputStyle} onFocus={onFocus} onBlur={onBlur} value={form.fuel_type} onChange={set('fuel_type')}>
                  {['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'].map(f => <option key={f} value={f} style={optionStyle}>{f}</option>)}
                </select>
              </Field>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-3 pb-2 border-b border-border">
              Pricing
            </p>
            <Field label={`Daily Rate (${currency})`} icon={DollarSign}>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-primary">{currency}</span>
                <input type="number" required min="0" className={inputCls} style={{ ...inputStyle, paddingLeft: '1.75rem' }}
                  onFocus={onFocus} onBlur={onBlur} value={form.pricePerDay} onChange={set('pricePerDay')} />
              </div>
            </Field>
          </div>

          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-3 pb-2 border-b border-border">
              Description
            </p>
            <Field label="About this vehicle" icon={AlignLeft}>
              <textarea rows={3} required className={`${inputCls} resize-none`} style={inputStyle}
                onFocus={onFocus} onBlur={onBlur} value={form.description} onChange={set('description')} />
            </Field>
          </div>

          <div className="flex justify-end gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-text-secondary border border-border hover:bg-surface hover:text-text-primary transition-all">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-glow">
              {loading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : <FiCheck size={15} />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CarCard = ({ car, currency, onEdit, onToggle, onDelete }) => (
  <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all duration-300">

    <div className="relative h-44 overflow-hidden bg-surface">
      <img src={car.image} alt={`${car.brand} ${car.model}`}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

      <div className="absolute top-3 left-3">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
          car.isAvaliable
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${car.isAvaliable ? 'bg-green-400' : 'bg-red-400'}`} />
          {car.isAvaliable ? 'Available' : 'Unavailable'}
        </span>
      </div>

      <div className="absolute top-3 right-3">
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-black/60 text-white backdrop-blur-sm border border-white/10">
          {currency}{car.pricePerDay}/day
        </span>
      </div>
    </div>

    <div className="p-4">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="font-bold text-text-primary text-base leading-tight">{car.brand} {car.model}</h3>
          <p className="text-xs text-text-secondary mt-0.5">{car.category} · {car.year}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { icon: Users, label: `${car.seating_capacity} Seats` },
          { icon: Zap,   label: car.transmission },
          { icon: Droplets, label: car.fuel_type },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-1 py-2 rounded-xl bg-surface border border-border">
            <Icon size={13} className="text-primary" />
            <span className="text-xs text-text-secondary font-medium leading-tight text-center">{label}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1.5 text-xs text-text-secondary">
        <MapPin size={12} className="text-primary shrink-0" />
        <span>{car.location}</span>
      </div>
    </div>

    <div className="px-4 pb-4 flex items-center justify-between gap-2 border-t border-border pt-3">
      <button onClick={() => onEdit(car)}
        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-primary border border-primary/30 hover:bg-primary/10 transition-all">
        <FiEdit2 size={12} /> Edit Details
      </button>
      <button onClick={() => onToggle(car._id)}
        className="w-9 h-9 rounded-xl flex items-center justify-center border border-border text-text-secondary hover:text-text-primary hover:bg-surface transition-all"
        title={car.isAvaliable ? 'Mark unavailable' : 'Mark available'}>
        {car.isAvaliable ? <FiEyeOff size={14} /> : <FiEye size={14} />}
      </button>
      <button onClick={() => onDelete(car._id)}
        className="w-9 h-9 rounded-xl flex items-center justify-center border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all"
        title="Delete car">
        <FiTrash2 size={14} />
      </button>
    </div>
  </div>
);

const ManageCars = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingCar, setEditingCar] = useState(null);

  const fetchOwnerCars = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('api/owner/cars');
      if (data.success) setCars(data.cars);
      else { toast.error(data.message || 'Failed to fetch cars'); setCars([]); }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching cars');
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (carId) => {
    try {
      const { data } = await axios.post('api/owner/toggle-car', { carId });
      if (data.success) { toast.success(data.message || 'Availability updated'); fetchOwnerCars(); }
      else toast.error(data.message || 'Failed to update');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating availability');
    }
  };

  const handleDelete = async (carId) => {
    if (!window.confirm('Are you sure you want to remove this car?')) return;
    try {
      const { data } = await axios.post('api/owner/delete-car', { carId });
      if (data.success) { toast.success(data.message || 'Car removed'); fetchOwnerCars(); }
      else toast.error(data.message || 'Failed to delete');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting car');
    }
  };

  useEffect(() => { fetchOwnerCars(); }, []);

  const available = cars.filter(c => c.isAvaliable).length;
  const unavailable = cars.length - available;

  return (
    <div className="px-4 pt-10 md:px-10 w-full pb-12">

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <Title
          title="Manage Cars"
          subTitle="View, edit, and manage all your listed vehicles from one place."
        />
        <div className="flex items-center gap-2 text-xs font-semibold shrink-0">
          <span className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {cars.length} Total
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20">
            {available} Active
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
            {unavailable} Inactive
          </span>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-text-secondary font-medium">Loading your fleet...</p>
        </div>
      ) : cars.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center">
            <Car size={36} className="text-primary" />
          </div>
          <div className="text-center">
            <p className="text-text-primary font-semibold text-lg">No cars listed yet</p>
            <p className="text-text-secondary text-sm mt-1">Add your first car to start receiving bookings.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {cars.map((car) => (
            <CarCard
              key={car._id}
              car={car}
              currency={currency}
              onEdit={setEditingCar}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {editingCar && (
        <EditModal
          car={editingCar}
          onClose={() => setEditingCar(null)}
          onSaved={fetchOwnerCars}
        />
      )}
    </div>
  );
};

export default ManageCars;
