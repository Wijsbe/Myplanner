import React from 'react';

const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center rounded-full font-medium';
  
  const variantClasses = {
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300',
    secondary: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-300',
    accent: 'bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-300',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  };
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-sm',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

export default Badge;
