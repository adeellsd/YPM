import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default', 
  className = '', 
  ...props 
}) => {
  const baseStyle = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-clash font-medium';
  
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-[#292F6A] text-[#F6F3D0]',
    secondary: 'bg-[#E2E2E2] text-[#292F6A]',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800'
  };
  
  return (
    <span 
      className={`${baseStyle} ${variantStyles[variant]} ${className}`} 
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;