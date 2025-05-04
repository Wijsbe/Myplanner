import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  ...props 
}) => {
  return (
    <div 
      className={`
        bg-white dark:bg-gray-800 
        rounded-lg shadow-soft 
        overflow-hidden 
        ${hover ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1' : ''}
        ${className}
      `} 
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardBody = ({ children, className = '', ...props }) => {
  return (
    <div className={`px-4 py-5 sm:p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`px-4 py-4 sm:px-6 border-t border-gray-200 dark:border-gray-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
