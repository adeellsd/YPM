import React from 'react';

const FormWrapper = ({ 
  title, 
  description, 
  children, 
  className = '', 
  onSubmit,
  ...props 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`} {...props}>
      {title && (
        <h2 className="text-xl font-clash font-bold text-[#292F6A] mb-2">{title}</h2>
      )}
      {description && (
        <p className="text-gray-600 font-clash font-light mb-6">{description}</p>
      )}
      
      <form onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
};

export default FormWrapper;