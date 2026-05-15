import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [pickUpDate, setPickUpDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [cars, setCars] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Function to check the user is logged in
  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get('api/user/data');
      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === 'owner');
        return data.user;
      } else {
        setUser(null);
        setIsOwner(false);
        navigate('/');
        return null;
      }
    } catch (error) {
      setUser(null);
      setIsOwner(false);
      toast.error(error.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch all cars from the server
  const fetchCars = async () => {
    try {
      const { data } = await axios.get('api/user/cars');
      if (data.success) {
        setCars(data.cars);
      } else {
        setCars([]);
        toast.error(data.message);
      }
    } catch (error) {
      setCars([]);
      toast.error(error.message);
    }
  };

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsOwner(false);
    axios.defaults.headers.common['Authorization'] = '';
    toast.success('You have been logged out successfully');
    navigate('/');
  };

  const toggleWishlist = (carId) => {
    if (!user) {
      setShowLogin(true);
      toast.error('Please login to manage your wishlist');
      return;
    }

    setWishlist((current) => {
      const next = current.includes(carId)
        ? current.filter((id) => id !== carId)
        : [...current, carId];

      localStorage.setItem(`wishlist-${user._id}`, JSON.stringify(next));
      toast.success(current.includes(carId) ? 'Removed from wishlist' : 'Added to wishlist');
      return next;
    });
  };

  // useEffect to retrieve the token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    fetchCars();
  }, []);

  // useEffect to fetch user data when token is available
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setUser(null);
      setIsOwner(false);
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (user?._id) {
      const savedWishlist = JSON.parse(localStorage.getItem(`wishlist-${user._id}`) || '[]');
      setWishlist(savedWishlist);
    } else {
      setWishlist([]);
    }
  }, [user?._id]);

  const value = {
    navigate,
    currency,
    axios,
    user,
    setUser,
    token,
    setToken,
    isOwner,
    setIsOwner,
    fetchUser,
    isLoading,
    showLogin,
    setShowLogin,
    logout,
    fetchCars,
    cars,
    setCars,
    wishlist,
    toggleWishlist,
    pickUpDate,
    setPickUpDate,
    returnDate,
    setReturnDate,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
