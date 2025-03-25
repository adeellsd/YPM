import React from 'react';

const InputField = ({
  label,
  id,
  type = 'text',
  error,
  helperText,
  className = '',
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-clash font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      
      <input
        id={id}
        type={type}
        className={`w-full px-3 py-2 border rounded-md font-clash font-light focus:outline-none focus:ring-2 ${
          error 
            ? 'border-red-500 focus:ring-red-200' 
            : 'border-gray-300 focus:ring-[#292F6A]/20 focus:border-[#292F6A]'
        }`}
        {...props}
      />
      
      {(error || helperText) && (
        <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500'} font-clash font-light`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default InputField;