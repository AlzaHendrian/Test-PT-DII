import React from 'react';

interface FormActionsProps {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const FormActions: React.FC<FormActionsProps> = ({ 
  children, 
  align = 'right',
  className = '' 
}) => {
  const alignClass = {
    'left': 'justify-start',
    'center': 'justify-center', 
    'right': 'justify-end'
  }[align];

  return (
    <div className={`flex flex-col sm:flex-row ${alignClass} space-y-3 sm:space-y-0 sm:space-x-4 px-6 py-4 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  );
};