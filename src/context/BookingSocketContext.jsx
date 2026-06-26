import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';

const BookingSocketContext = createContext();

export const useBookingSocket = () => {
    const context = useContext(BookingSocketContext);
    if (!context) {
        throw new Error('useBookingSocket must be used within BookingSocketProvider');
    }
    return context;
};

export const BookingSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [newBookings, setNewBookings] = useState([]);
    const [bookingUpdates, setBookingUpdates] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [userBookings, setUserBookings] = useState([]);
    const [adminBookings, setAdminBookings] = useState([]);

    useEffect(() => {
    const socketUrl = import.meta.env.VITE_SERVER_URL || 'https://car-rental-backend-vq0h.onrender.com';
        
        const newSocket = io(socketUrl, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5,
            transports: ['websocket']
        });

        newSocket.on('connect', () => {
            console.log('Socket connected:', newSocket.id);
            setIsConnected(true);
        });

        newSocket.on('disconnect', () => {
            console.log('Socket disconnected');
            setIsConnected(false);
        });

        newSocket.on('error', (error) => {
            console.error('Socket error:', error);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const joinSocket = useCallback((userId, userType = 'user') => {
        if (socket && isConnected) {
            socket.emit('userJoined', userId, userType);
            console.log('User joined socket:', userId, userType);
        }
    }, [socket, isConnected]);

    useEffect(() => {
        if (!socket) return;

        socket.on('newBooking', (booking) => {
            console.log('New booking received:', booking);
            setNewBookings((prev) => [booking, ...prev]);
            setAdminBookings((prev) => [booking, ...prev]);
            setNotifications((prev) => [...prev, {
                id: Date.now(),
                type: 'newBooking',
                message: `New booking from ${booking.user.name}`,
                booking,
                timestamp: new Date()
            }]);
        });

        return () => {
            socket.off('newBooking');
        };
    }, [socket]);

    useEffect(() => {
        if (!socket) return;

        socket.on('bookingStatusUpdated', (data) => {
            console.log('Booking status updated:', data);
            setBookingUpdates((prev) => [data, ...prev]);
            setUserBookings((prev) =>
                prev.map((booking) =>
                    booking.bookingId === data.bookingId
                        ? { ...booking, status: data.status }
                        : booking
                )
            );
            setNotifications((prev) => [...prev, {
                id: Date.now(),
                type: 'statusUpdate',
                message: data.message,
                status: data.status,
                timestamp: data.timestamp
            }]);
        });

        return () => {
            socket.off('bookingStatusUpdated');
        };
    }, [socket]);

    useEffect(() => {
        if (!socket) return;

        socket.on('bookingStatusChanged', (data) => {
            console.log('Booking status changed:', data);
            setAdminBookings((prev) =>
                prev.map((booking) =>
                    booking.bookingId === data.bookingId
                        ? { ...booking, status: data.status }
                        : booking
                )
            );
        });

        return () => {
            socket.off('bookingStatusChanged');
        };
    }, [socket]);

    useEffect(() => {
        if (!socket) return;

        socket.on('bookingCreated', (data) => {
            console.log('Booking created:', data);
            setNotifications((prev) => [...prev, {
                id: Date.now(),
                type: 'bookingCreated',
                message: data.message,
                bookingId: data.bookingId,
                status: data.status,
                timestamp: new Date()
            }]);
        });

        return () => {
            socket.off('bookingCreated');
        };
    }, [socket]);

    useEffect(() => {
        if (!socket) return;

        socket.on('allBookings', (data) => {
            console.log('All bookings received:', data);
            setAdminBookings(data.bookings);
        });

        return () => {
            socket.off('allBookings');
        };
    }, [socket]);

    useEffect(() => {
        if (!socket) return;

        socket.on('userBookings', (data) => {
            console.log('User bookings received:', data);
            setUserBookings(data.bookings);
        });

        return () => {
            socket.off('userBookings');
        };
    }, [socket]);

    const updateBookingStatus = useCallback((bookingId, newStatus) => {
        if (socket && isConnected) {
            socket.emit('updateBookingStatus', { bookingId, newStatus });
        }
    }, [socket, isConnected]);

    const requestAllBookings = useCallback((ownerId) => {
        if (socket && isConnected) {
            socket.emit('requestAllBookings', ownerId);
        }
    }, [socket, isConnected]);

    const requestUserBookings = useCallback((userId) => {
        if (socket && isConnected) {
            socket.emit('requestUserBookings', userId);
        }
    }, [socket, isConnected]);

    const emitNewBooking = useCallback((bookingData) => {
        if (socket && isConnected) {
            socket.emit('newBookingCreated', bookingData);
        }
    }, [socket, isConnected]);

    const value = {
        socket,
        isConnected,
        newBookings,
        bookingUpdates,
        notifications,
        setNotifications,
        userBookings,
        adminBookings,
        joinSocket,
        updateBookingStatus,
        requestAllBookings,
        requestUserBookings,
        emitNewBooking
    };

    return (
        <BookingSocketContext.Provider value={value}>
            {children}
        </BookingSocketContext.Provider>
    );
};
