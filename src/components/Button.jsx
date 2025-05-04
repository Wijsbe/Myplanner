import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200';

  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500 shadow-sm',
    secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white focus:ring-secondary-500 shadow-sm',
    accent: 'bg-accent-500 hover:bg-accent-600 text-white focus:ring-accent-500 shadow-sm',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 shadow-sm',
    outline: 'border border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-primary-500',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-primary-500',
  };

  const sizeClasses = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base',
    xl: 'px-6 py-3.5 text-base',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
