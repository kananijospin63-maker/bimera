import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'gold' | 'blue' | 'purple' | 'gray' | 'red';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'green', className }) => {
  const variants: Record<string, string> = {
    green: 'bg-brand-950/80 text-brand-300 border-brand-700/50',
    gold: 'bg-gold-950/80 text-gold-300 border-gold-700/50',
    blue: 'bg-blue-950/80 text-blue-300 border-blue-700/50',
    purple: 'bg-purple-950/80 text-purple-300 border-purple-700/50',
    gray: 'bg-gray-900 text-gray-300 border-gray-700/50',
    red: 'bg-red-950/80 text-red-300 border-red-700/50',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold border tracking-wide uppercase',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
