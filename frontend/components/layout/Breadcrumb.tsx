import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Fil d'Ariane" className="py-4">
      <ol className="flex items-center space-x-2 text-xs font-medium text-gray-400">
        <li>
          <Link href="/" className="hover:text-brand-400 flex items-center transition-colors">
            <Home size={14} className="mr-1" />
            <span>Accueil</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <ChevronRight size={12} className="text-gray-600" />
            {item.href ? (
              <Link href={item.href} className="hover:text-brand-400 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-brand-300 font-semibold">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
