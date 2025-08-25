import React from 'react';

interface FormContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
  className?: string;
}

export const FormContainer: React.FC<FormContainerProps> = ({ 
  children, 
  maxWidth = '4xl',
  className = '' 
}) => {
  const maxWidthClass = {
    'sm': 'max-w-sm',
    'md': 'max-w-md', 
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl'
  }[maxWidth];

  return (
    <div className={`${maxWidthClass} mx-auto ${className}`}>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        {children}
      </div>
    </div>
  );
};