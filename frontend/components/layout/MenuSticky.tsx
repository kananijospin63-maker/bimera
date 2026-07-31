'use client';

import React from 'react';
import Link from 'next/link';
import { Sprout, Building2, Cpu, Wrench } from 'lucide-react';

export const MenuSticky: React.FC = () => {
  const items = [
    { href: '/activites/agriculture', label: 'Agriculture', icon: Sprout },
    { href: '/activites/elevage', label: 'Élevage', icon: Building2 },
    { href: '/activites/informatique', label: 'Informatique', icon: Cpu },
    { href: '/activites/technique', label: 'Technique', icon: Wrench },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center space-x-2 bg-navy-900/90 border border-brand-500/40 p-2 rounded-full shadow-2xl backdrop-blur-md animate-bounce-subtle">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="p-2.5 rounded-full hover:bg-brand-600 text-gray-300 hover:text-white transition-colors group relative"
            title={item.label}
          >
            <Icon size={18} />
            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-navy-950 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none border border-gray-700">
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};
