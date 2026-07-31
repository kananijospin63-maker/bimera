import React from 'react';
import { Card } from '../ui/Card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  color?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  color = 'text-brand-400',
}) => {
  return (
    <Card hover={false} className="flex items-center justify-between p-5 border border-gray-800">
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-extrabold text-white mt-1">{value}</h3>
        {change && <p className="text-xs text-brand-400 font-medium mt-1">{change}</p>}
      </div>
      <div className={`p-3 rounded-xl bg-navy-900 border border-gray-800 ${color}`}>
        <Icon size={24} />
      </div>
    </Card>
  );
};
