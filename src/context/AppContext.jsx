import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL || "https://car-rental-backend-vq0h.onrender.com";
// axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

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

  const [loginLoading, setLoginLoading] = useState(false);

  const login = async (email, password) => {
    setLoginLoading(true);
    try {
      const { data } = await axios.post('api/user/login', { email, password });
      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);
        setIsOwner(data.user.role === 'owner');
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        toast.success('Login successful');
        setShowLogin(false);
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Login failed');
    } finally {
      setLoginLoading(false);
    }
  };

  const register = async (name, email, password, role = 'user') => {
    setLoginLoading(true);
    try {
      const { data } = await axios.post('api/user/register', { name, email, password, role });
      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);
        setIsOwner(data.user.role === 'owner');
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        toast.success('Registration successful');
        setShowLogin(false);
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Registration failed');
    } finally {
      setLoginLoading(false);
    }
  };

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

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    fetchCars();
  }, []);

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
    login,
    register,
    loginLoading,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);