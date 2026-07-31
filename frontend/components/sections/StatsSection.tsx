import React from 'react';
import { Award, Users, Tractor, CheckCircle2 } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    { label: 'Hectares Exploités', value: '1,200+', icon: Tractor, color: 'text-brand-400' },
    { label: 'Membres & Partenaires', value: '100%', icon: Users, color: 'text-gold-400' },
    { label: 'Projets IT & Ingenierie', value: '85+', icon: Award, color: 'text-blue-400' },
    { label: 'Taux de Satisfaction', value: '98%', icon: CheckCircle2, color: 'text-emerald-400' },
  ];

  return (
    <section className="py-16 bg-navy-900/60 border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="text-center space-y-2">
                <div className="flex justify-center">
                  <Icon size={32} className={stat.color} />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
