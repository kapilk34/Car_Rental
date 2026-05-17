import React, { useState } from 'react'
import Title from "../../components/owners/Title"
import { FiUpload, FiCheck, FiImage, FiInfo, FiSettings, FiDollarSign, FiMapPin } from "react-icons/fi"
import axios from 'axios'
import toast from 'react-hot-toast'

const AddCar = () => {
  const currency = import.meta.env.VITE_CURRENCY || '₹'

  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: '',
    pricePerDay: '',
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: '',
    location: '',
    description: '',
  })

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!image) {
      toast.error("Please upload a car image")
      return
    }

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('image', image)
      formData.append('carData', JSON.stringify(car))

      const { data } = await axios.post('api/owner/add-car', formData)

      if (data.success) {
        toast.success('Car added successfully!')
        setImage(null)
        setCar({
          brand: '',
          model: '',
          year: '',
          pricePerDay: '',
          category: '',
          transmission: '',
          fuel_type: '',
          seating_capacity: '',
          location: '',
          description: '',
        })
      } else {
        toast.error(data.message || 'Failed to add car')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error(error.response?.data?.message || 'Error adding car')
    } finally {
      setLoading(false)
    }
  }

  const InputWrapper = ({ label, icon: Icon, children }) => (
    <div className="flex flex-col w-full">
      <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
        {Icon && <Icon className="text-orange-500" />}
        {label}
      </label>
      <div className="relative group">
        {children}
        <div className="absolute inset-0 rounded-xl bg-orange-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none -m-1"></div>
      </div>
    </div>
  )

  const commonInputClass = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 text-slate-700 placeholder:text-slate-400"

  return (
    <div className="max-w-5xl mx-auto w-full pb-10">
      
      {/* Header Area */}
      <div className="mb-8">
        <Title
          title="Add New Vehicle"
          subTitle="List your car for booking. Provide accurate details to attract more renters."
        />
      </div>

      <form onSubmit={onSubmitHandler} className="space-y-8">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column - Image & Basic Details */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Image Upload Card */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(251,146,60,0.06)] transition-all duration-500">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <FiImage className="text-orange-500" /> Vehicle Image
              </h3>
              
              <div className="relative w-full aspect-square rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 overflow-hidden group hover:border-orange-300 transition-colors cursor-pointer flex flex-col items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="car preview"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="text-center p-6">
                    <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm text-orange-500 mb-4 group-hover:-translate-y-1 transition-transform">
                      <FiUpload className="text-2xl" />
                    </div>
                    <p className="text-sm font-semibold text-slate-700">Click to upload</p>
                    <p className="text-xs text-slate-500 mt-2">SVG, PNG, JPG or GIF (max. 5MB)</p>
                  </div>
                )}
                
                {image && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="text-white font-medium bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">Change Image</span>
                  </div>
                )}
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(251,146,60,0.06)] transition-all duration-500">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <FiDollarSign className="text-orange-500" /> Pricing & Location
              </h3>
              
              <div className="space-y-5">
                <InputWrapper label={`Daily Price (${currency})`}>
                  <input
                    type="number"
                    placeholder="e.g. 2499"
                    required
                    min="0"
                    className={commonInputClass}
                    value={car.pricePerDay}
                    onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
                  />
                </InputWrapper>

                <InputWrapper label="Location">
                  <select
                    required
                    className={commonInputClass}
                    value={car.location}
                    onChange={(e) => setCar({ ...car, location: e.target.value })}
                  >
                    <option value="" disabled>Select a Location</option>
                    {['Delhi', 'Mumbai', 'Bangalore', 'Chandigarh', 'Pune', 'Hyderabad', 'Jaipur', 'Kolkata', 'Chennai', 'Ahmedabad'].map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </InputWrapper>
              </div>
            </div>

          </div>

          {/* Right Column - Form Details */}
          <div className="lg:col-span-8">
            <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              
              <div className="mb-8 border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <FiInfo className="text-orange-500" /> Vehicle Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <InputWrapper label="Brand">
                  <input
                    type="text"
                    placeholder="e.g. BMW, Mercedes..."
                    required
                    className={commonInputClass}
                    value={car.brand}
                    onChange={(e) => setCar({ ...car, brand: e.target.value })}
                  />
                </InputWrapper>

                <InputWrapper label="Model">
                  <input
                    type="text"
                    placeholder="e.g. X5, C-Class..."
                    required
                    className={commonInputClass}
                    value={car.model}
                    onChange={(e) => setCar({ ...car, model: e.target.value })}
                  />
                </InputWrapper>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <InputWrapper label="Year">
                  <input
                    type="number"
                    placeholder="e.g. 2024"
                    required
                    className={commonInputClass}
                    value={car.year}
                    onChange={(e) => setCar({ ...car, year: e.target.value })}
                  />
                </InputWrapper>

                <InputWrapper label="Category">
                  <select
                    required
                    className={commonInputClass}
                    value={car.category}
                    onChange={(e) => setCar({ ...car, category: e.target.value })}
                  >
                    <option value="" disabled>Select Category</option>
                    {['Maruti Suzuki', 'Tata Motors', 'Mahindra', 'Hyundai', 'Kia', 'Honda', 'Toyota', 'MG Motors', 'Skoda', 'Volkswagen'].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </InputWrapper>
                
                <InputWrapper label="Seats">
                  <input
                    type="number"
                    placeholder="e.g. 4"
                    required
                    min="1"
                    className={commonInputClass}
                    value={car.seating_capacity}
                    onChange={(e) => setCar({ ...car, seating_capacity: e.target.value })}
                  />
                </InputWrapper>
              </div>

              <div className="mb-8 border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <FiSettings className="text-orange-500" /> Specifications
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <InputWrapper label="Transmission">
                  <select
                    required
                    className={commonInputClass}
                    value={car.transmission}
                    onChange={(e) => setCar({ ...car, transmission: e.target.value })}
                  >
                    <option value="" disabled>Select Transmission</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                    <option value="Semi-Automatic">Semi-Automatic</option>
                  </select>
                </InputWrapper>

                <InputWrapper label="Fuel Type">
                  <select
                    required
                    className={commonInputClass}
                    value={car.fuel_type}
                    onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
                  >
                    <option value="" disabled>Select Fuel Type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Gas">Gas</option>
                  </select>
                </InputWrapper>
              </div>

              <div className="mb-8">
                <InputWrapper label="Vehicle Description">
                  <textarea
                    rows={4}
                    placeholder="Describe the vehicle's features, condition, and any special terms..."
                    required
                    className={`${commonInputClass} resize-none`}
                    value={car.description}
                    onChange={(e) => setCar({ ...car, description: e.target.value })}
                  ></textarea>
                </InputWrapper>
              </div>

              {/* Submit Action */}
              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-slate-900 text-white font-semibold text-lg shadow-xl hover:shadow-2xl hover:shadow-slate-900/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden w-full sm:w-auto"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <span className="relative z-10 flex items-center gap-2">
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <FiCheck className="text-xl" />
                        Publish Listing
                      </>
                    )}
                  </span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </form>
    </div>
  )
}

export default AddCar
