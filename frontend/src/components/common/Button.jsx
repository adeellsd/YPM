import React from 'react';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  className = '', 
  disabled = false,
  onClick 
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors';
  
  const variants = {
    primary: 'bg-ypm-navy text-white hover:bg-ypm-navy/90',
    secondary: 'bg-ypm-blue text-white hover:bg-ypm-blue/90',
    outline: 'border border-ypm-navy text-ypm-navy bg-transparent hover:bg-ypm-navy/10',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };
  
  const classes = `${baseStyles} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;