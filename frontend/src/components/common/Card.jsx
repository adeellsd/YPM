import React from 'react';

const Card = ({ children, title, footer, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {title && (
        <div className="border-b border-gray-200 p-4 bg-gray-50">
          {typeof title === 'string' ? (
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          ) : (
            title
          )}
        </div>
      )}
      
      <div className="p-4">
        {children}
      </div>
      
      {footer && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;