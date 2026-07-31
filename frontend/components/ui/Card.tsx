import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = true,
  padding = 'md',
}) => {
  const paddings = {
    sm: 'p-4',
    md: 'p-6 sm:p-7',
    lg: 'p-8 sm:p-10',
  };

  return (
    <div
      className={cn(
        'glass-panel rounded-2xl sm:rounded-3xl border border-gray-800/80',
        paddings[padding],
        hover && 'glass-card-hover',
        className
      )}
    >
      {children}
    </div>
  );
};
