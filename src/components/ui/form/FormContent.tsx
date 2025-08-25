import React from 'react';

interface FormContentProps {
  children: React.ReactNode;
  className?: string;
}

export const FormContent: React.FC<FormContentProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};