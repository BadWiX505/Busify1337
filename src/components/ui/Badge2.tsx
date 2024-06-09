import React, { ReactNode } from 'react';

interface BadgeProps {
  variant: 'success' | 'danger' | 'warning' | 'info'; // Define possible variants
  children?: ReactNode; // Make children property optional
}

const Badge: React.FC<BadgeProps> = ({ variant, children }) => {
  let bgColor;
  switch (variant) {
    case 'success':
      bgColor = 'bg-green-500';
      break;
    case 'danger':
      bgColor = 'bg-red-500';
      break;
    case 'warning':
      bgColor = 'bg-yellow-500';
      break;
    case 'info':
      bgColor = 'bg-blue-500';
      break;
    default:
      bgColor = 'bg-gray-500';
  }

  return (
    <span className={`inline-block px-2 py-1 text-xs font-semibold text-white rounded ${bgColor}`}>
      {children}
    </span>
  );
};

export default Badge;
