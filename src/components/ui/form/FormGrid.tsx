import React from 'react';

interface FormGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const FormGrid: React.FC<FormGridProps> = ({ 
  children, 
  columns = 2,
  gap = 'md',
  className = '' 
}) => {
  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 lg:grid-cols-2', 
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }[columns];

  const gapClass = {
    'sm': 'gap-4',
    'md': 'gap-6',
    'lg': 'gap-8'
  }[gap];

  return (
    <div className={`grid ${gridClass} ${gapClass} ${className}`}>
      {children}
    </div>
  );
};