import React from 'react';

interface FormButtonProps {
  children: React.ReactNode;
  type?: 'submit' | 'button' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}

export const FormButton: React.FC<FormButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className = ''
}) => {
  const baseClass = 'font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:cursor-not-allowed';
  
  const variantClass = {
    'primary': 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white focus:ring-blue-500 disabled:bg-blue-400',
    'secondary': 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 focus:ring-gray-500',
    'danger': 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 disabled:bg-red-400'
  }[variant];

  const sizeClass = {
    'sm': 'px-4 py-2 text-sm',
    'md': 'px-6 py-3 text-sm',
    'lg': 'px-8 py-4 text-base'
  }[size];

  const loadingSpinner = (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
    >
      {loading && (
        <span className="flex items-center justify-center">
          {loadingSpinner}
          Memproses...
        </span>
      )}
      {!loading && children}
    </button>
  );
};