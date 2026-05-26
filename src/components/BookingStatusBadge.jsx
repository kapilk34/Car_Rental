import React from 'react';

export const BookingStatusBadge = ({ status, isLive = false }) => {
  const statusConfig = {
    pending: {
      color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      label: 'Pending',
      icon: '⏳'
    },
    confirmed: {
      color: 'bg-green-500/10 text-green-400 border-green-500/20',
      label: 'Confirmed',
      icon: '✓'
    },
    cancelled: {
      color: 'bg-red-500/10 text-red-400 border-red-500/20',
      label: 'Cancelled',
      icon: '✕'
    },
    completed: {
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      label: 'Completed',
      icon: '✓✓'
    }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.color}`}>
      {isLive && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current"></span>
        </span>
      )}
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </div>
  );
};

export default BookingStatusBadge;
