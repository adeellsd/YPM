import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyle = 'inline-flex items-center justify-center rounded-md font-clash font-medium transition-colors focus:outline-none';
  
  const variantStyles = {
    primary: 'bg-[#292F6A] text-[#F6F3D0] hover:bg-opacity-90',
    secondary: 'bg-[#E2E2E2] text-[#292F6A] hover:bg-opacity-90',
    outline: 'border border-[#292F6A] text-[#292F6A] hover:bg-[#292F6A] hover:text-[#F6F3D0]',
    ghost: 'text-[#292F6A] hover:bg-[#E2E2E2]',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
  
  return (
    <button 
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;