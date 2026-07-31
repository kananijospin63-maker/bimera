import React from 'react';
import { Badge } from './Badge';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: 'green' | 'gold' | 'blue' | 'purple' | 'gray';
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeVariant = 'green',
  title,
  subtitle,
  align = 'center',
  className,
}) => {
  return (
    <div
      className={cn(
        'space-y-3 mb-12 lg:mb-16',
        align === 'center' ? 'text-center max-w-3xl mx-auto' : 'text-left',
        className
      )}
    >
      {badge && (
        <Badge variant={badgeVariant} className="mb-1">
          {badge}
        </Badge>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
};
