'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  Image as ImageIcon,
  Calendar,
  Users,
  KeyRound,
  Search,
  Database,
  ArrowLeft,
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { href: '/admin/contenu/pages', label: 'Pages CMS', icon: FileText },
    { href: '/admin/contenu/articles', label: 'Articles & News', icon: Newspaper },
    { href: '/admin/medias', label: 'Gestion Médias', icon: ImageIcon },
    { href: '/admin/calendrier', label: 'Événements', icon: Calendar },
    { href: '/admin/utilisateurs', label: 'Utilisateurs & Rôles', icon: Users },
    { href: '/admin/portail-acces', label: 'Accès Portail', icon: KeyRound },
    { href: '/admin/parametres/seo', label: 'Paramètres SEO', icon: Search },
    { href: '/admin/parametres/sauvegardes', label: 'Sauvegardes BD', icon: Database },
  ];

  return (
    <aside className="w-64 bg-navy-950 border-r border-gray-800 flex flex-col justify-between min-h-screen p-4">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center space-x-3 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-gold-500 flex items-center justify-center text-navy-950 font-black text-xl">
            B
          </div>
          <div>
            <span className="font-bold text-white text-base">BIMERA ADMIN</span>
            <span className="block text-[10px] text-brand-400 font-semibold uppercase">Back-Office</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-brand-600 text-white font-bold shadow-md shadow-brand-900/50'
                    : 'text-gray-400 hover:text-white hover:bg-navy-900/60'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-gray-800">
        <Link
          href="/"
          className="flex items-center space-x-2 text-xs font-bold text-gray-400 hover:text-brand-400 px-3 py-2 rounded-lg hover:bg-navy-900/60 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Retour au site public</span>
        </Link>
      </div>
    </aside>
  );
};
