import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-75 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 disabled:opacity-50 disabled:cursor-not-allowed select-none active:brightness-90';

  const variants: Record<string, string> = {
    primary:
      'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-900/40 border border-brand-400/20',
    secondary:
      'bg-gold-500 hover:bg-gold-400 text-navy-950 shadow-lg shadow-gold-900/30 font-bold border border-gold-400/20',
    outline:
      'border border-gray-700 hover:border-brand-500/60 text-gray-200 hover:text-brand-300 bg-transparent hover:bg-brand-500/5',
    ghost:
      'text-gray-300 hover:text-white hover:bg-white/8 border border-transparent',
    danger:
      'bg-red-600 hover:bg-red-500 text-white shadow-md border border-red-500/30',
  };

  const sizes: Record<string, string> = {
    xs: 'px-2.5 py-1 text-[11px] gap-1 rounded-lg',
    sm: 'px-3.5 py-2 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2.5',
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
