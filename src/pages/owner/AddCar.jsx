import React, { useState } from 'react'
import Title from "../../components/owners/Title"
import { FiUpload, FiCheck, FiCamera } from "react-icons/fi"
import { Car, MapPin, Calendar, Users, Zap, Droplets, AlignLeft, DollarSign, Tag } from "lucide-react"
import axios from 'axios'
import toast from 'react-hot-toast'

const LOCATIONS = ['Delhi', 'Mumbai', 'Bangalore', 'Chandigarh', 'Pune', 'Hyderabad', 'Jaipur', 'Kolkata', 'Chennai', 'Ahmedabad']
const CATEGORIES = ['Maruti Suzuki', 'Tata Motors', 'Mahindra', 'Hyundai', 'Kia', 'Honda', 'Toyota', 'MG Motors', 'Skoda', 'Volkswagen']

const inputStyle = {
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  color: 'var(--color-text-primary)',
}
const optionStyle = { backgroundColor: 'var(--color-card)' }
const onFocus = (e) => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.15)' }
const onBlur  = (e) => { e.target.style.borderColor = 'var(--color-border)';  e.target.style.boxShadow = 'none' }

const inputCls = "w-full px-3.5 py-2.5 rounded-lg text-sm outline-none transition-all duration-200"

const Field = ({ label, icon: Icon, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-text-secondary flex items-center gap-1.5">
      {Icon && <Icon size={14} className="text-primary" />}
      {label}
    </label>
    {children}
  </div>
)

const SectionTitle = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
    <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
      <Icon size={16} />
    </div>
    <h2 className="font-semibold text-text-primary">{title}</h2>
  </div>
)

const AddCar = () => {
  const currency = import.meta.env.VITE_CURRENCY || '₹'
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [car, setCar] = useState({
    brand: '', model: '', year: '', pricePerDay: '',
    category: '', transmission: '', fuel_type: '',
    seating_capacity: '', location: '', description: '',
  })

  const set = (key) => (e) => setCar(prev => ({ ...prev, [key]: e.target.value }))

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (!image) { toast.error("Please upload a car image"); return }
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('image', image)
      formData.append('carData', JSON.stringify(car))
      const { data } = await axios.post('api/owner/add-car', formData)
      if (data.success) {
        toast.success('Car listed successfully!')
        setImage(null)
        setCar({ brand: '', model: '', year: '', pricePerDay: '', category: '', transmission: '', fuel_type: '', seating_capacity: '', location: '', description: '' })
      } else {
        toast.error(data.message || 'Failed to add car')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding car')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto w-full pb-10">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <Title title="Add New Vehicle" subTitle="Fill in the details below to list your car for rental." />
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-semibold self-start">
          <Car size={14} />
          New Listing
        </div>
      </div>

      <form onSubmit={onSubmitHandler}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ── Left Column ── */}
          <div className="lg:col-span-4 flex flex-col gap-6">

            {/* Image Upload */}
            <div className="bg-card border border-border rounded-lg p-5 shadow">
              <SectionTitle icon={FiCamera} title="Vehicle Photo" />
              <label className="block cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setImage(e.target.files[0])} />
                <div className={`relative w-full aspect-[4/3] rounded-lg overflow-hidden flex flex-col items-center justify-center group transition-all duration-300 border-2 border-dashed ${image ? 'border-primary' : 'border-border'} bg-surface`}>
                  {image ? (
                    <>
                      <img src={URL.createObjectURL(image)} alt="preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                        <FiCamera size={22} className="text-white" />
                        <span className="text-white text-xs font-semibold">Change Photo</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-3 p-6 text-center">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
                        <FiUpload size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text-primary">Click to upload</p>
                        <p className="text-xs text-text-secondary mt-1">PNG, JPG or WEBP · max 5MB</p>
                      </div>
                      <span className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-primary">
                        Browse Files
                      </span>
                    </div>
                  )}
                </div>
              </label>
              {image && (
                <p className="mt-2 text-xs text-text-secondary text-center truncate">✓ {image.name}</p>
              )}
            </div>

            {/* Pricing & Location */}
            <div className="bg-card border border-border rounded-lg p-5 shadow">
              <SectionTitle icon={DollarSign} title="Pricing & Location" />
              <div className="flex flex-col gap-4">
                <Field label={`Daily Rate (${currency})`} icon={DollarSign}>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-primary">{currency}</span>
                    <input type="number" placeholder="2499" required min="0"
                      className={inputCls} style={{ ...inputStyle, paddingLeft: '1.75rem' }}
                      onFocus={onFocus} onBlur={onBlur}
                      value={car.pricePerDay} onChange={set('pricePerDay')} />
                  </div>
                </Field>
                <Field label="City / Location" icon={MapPin}>
                  <select required className={inputCls} style={inputStyle}
                    onFocus={onFocus} onBlur={onBlur}
                    value={car.location} onChange={set('location')}>
                    <option value="" disabled style={optionStyle}>Select city</option>
                    {LOCATIONS.map(l => <option key={l} value={l} style={optionStyle}>{l}</option>)}
                  </select>
                </Field>
              </div>
            </div>

          </div>

          {/* ── Right Column ── */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* Vehicle Info */}
            <div className="bg-card border border-border rounded-lg p-5 shadow">
              <SectionTitle icon={Tag} title="Vehicle Information" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Field label="Brand" icon={Tag}>
                  <input type="text" placeholder="e.g. Hyundai, Tata..." required
                    className={inputCls} style={inputStyle} onFocus={onFocus} onBlur={onBlur}
                    value={car.brand} onChange={set('brand')} />
                </Field>
                <Field label="Model" icon={Tag}>
                  <input type="text" placeholder="e.g. Creta, Nexon..." required
                    className={inputCls} style={inputStyle} onFocus={onFocus} onBlur={onBlur}
                    value={car.model} onChange={set('model')} />
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Year" icon={Calendar}>
                  <input type="number" placeholder="2024" required
                    className={inputCls} style={inputStyle} onFocus={onFocus} onBlur={onBlur}
                    value={car.year} onChange={set('year')} />
                </Field>
                <Field label="Category" icon={Tag}>
                  <select required className={inputCls} style={inputStyle}
                    onFocus={onFocus} onBlur={onBlur}
                    value={car.category} onChange={set('category')}>
                    <option value="" disabled style={optionStyle}>Select</option>
                    {CATEGORIES.map(c => <option key={c} value={c} style={optionStyle}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Seats" icon={Users}>
                  <input type="number" placeholder="5" required min="1"
                    className={inputCls} style={inputStyle} onFocus={onFocus} onBlur={onBlur}
                    value={car.seating_capacity} onChange={set('seating_capacity')} />
                </Field>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-card border border-border rounded-lg p-5 shadow">
              <SectionTitle icon={Zap} title="Specifications" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Transmission" icon={Zap}>
                  <select required className={inputCls} style={inputStyle}
                    onFocus={onFocus} onBlur={onBlur}
                    value={car.transmission} onChange={set('transmission')}>
                    <option value="" disabled style={optionStyle}>Select</option>
                    {['Automatic', 'Manual', 'Semi-Automatic'].map(t => <option key={t} value={t} style={optionStyle}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Fuel Type" icon={Droplets}>
                  <select required className={inputCls} style={inputStyle}
                    onFocus={onFocus} onBlur={onBlur}
                    value={car.fuel_type} onChange={set('fuel_type')}>
                    <option value="" disabled style={optionStyle}>Select</option>
                    {['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'].map(f => <option key={f} value={f} style={optionStyle}>{f}</option>)}
                  </select>
                </Field>
              </div>
            </div>

            {/* Description */}
            <div className="bg-card border border-border rounded-lg p-5 shadow">
              <SectionTitle icon={AlignLeft} title="Description" />
              <Field label="Tell renters about this vehicle" icon={AlignLeft}>
                <textarea rows={4} required placeholder="Describe the car's condition, features, and any rental terms..."
                  className={`${inputCls} resize-none`} style={inputStyle}
                  onFocus={onFocus} onBlur={onBlur}
                  value={car.description} onChange={set('description')} />
              </Field>
            </div>

            {/* Submit */}
            <div className="bg-card border border-border rounded-lg p-5 shadow flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-text-secondary">All fields are required. Your listing goes live immediately.</p>
              <button type="submit" disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white font-semibold text-sm hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 whitespace-nowrap">
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Publishing...
                  </>
                ) : (
                  <><FiCheck size={16} /> Publish Listing</>
                )}
              </button>
            </div>

          </div>
        </div>
      </form>
    </div>
  )
}

export default AddCar
