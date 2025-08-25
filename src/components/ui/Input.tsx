import React from 'react';

interface InputProps {
  name?: string;
  type?: 'text' | 'date' | 'email' | 'password' | 'number';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  maxLength?: number;
  className?: string;
  leftIcon?: React.ReactNode;
  rightContent?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  maxLength,
  className = '',
  leftIcon,
  rightContent,
  disabled = false,
  required = false
}) => {
  const baseClasses = `
    w-full px-3 py-2 border rounded-md 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
    transition-all duration-200
    ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'}
    ${leftIcon ? 'pl-10' : ''}
    ${rightContent ? 'pr-10' : ''}
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className="relative">
      {/* Left Icon */}
      {leftIcon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {leftIcon}
        </div>
      )}

      {/* Input */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        required={required}
        className={`${baseClasses} ${className}`}
      />

      {/* Right Content */}
      {rightContent && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {rightContent}
        </div>
      )}
    </div>
  );
};
