'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import {
  Menu, X, ChevronDown, User as UserIcon,
  Sprout, Building2, Cpu, Wrench,
  Calendar, Newspaper, Image as ImageIcon,
} from 'lucide-react';
import { Button } from '../ui/Button';

const activities = [
  { href: '/activites/agriculture', label: 'Agriculture', icon: Sprout, color: 'text-brand-400 bg-brand-500/10 border-brand-500/20' },
  { href: '/activites/elevage', label: 'Élevage', icon: Building2, color: 'text-gold-400 bg-gold-500/10 border-gold-500/20' },
  { href: '/activites/informatique', label: 'Informatique & Tech', icon: Cpu, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  { href: '/activites/technique', label: 'Services Techniques', icon: Wrench, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
];

const mediaLinks = [
  { href: '/medias-actualites/blog', label: 'Blog', icon: Newspaper, color: 'text-brand-400 bg-brand-500/10 border-brand-500/20' },
  { href: '/medias-actualites/galerie', label: 'Galerie', icon: ImageIcon, color: 'text-gold-400 bg-gold-500/10 border-gold-500/20' },
  { href: '/medias-actualites/evenements', label: 'Événements', icon: Calendar, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activitiesOpen, setActivitiesOpen] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);
  const [activitiesLocked, setActivitiesLocked] = useState(false);
  const [mediaLocked, setMediaLocked] = useState(false);
  const [mobileActivitiesOpen, setMobileActivitiesOpen] = useState(false);
  const [mobileMediaOpen, setMobileMediaOpen] = useState(false);

  const pathname = usePathname();
  const activitiesRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActivitiesOpen(false);
    setMediaOpen(false);
    setActivitiesLocked(false);
    setMediaLocked(false);
    setMobileActivitiesOpen(false);
    setMobileMediaOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (activitiesRef.current && !activitiesRef.current.contains(e.target as Node)) {
        setActivitiesOpen(false); setActivitiesLocked(false);
      }
      if (mediaRef.current && !mediaRef.current.contains(e.target as Node)) {
        setMediaOpen(false); setMediaLocked(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const isActivityActive = pathname.startsWith('/activites');
  const isMediaActive = pathname.startsWith('/medias-actualites');

  const navLink = (active: boolean) =>
    `px-3 py-2 text-sm font-semibold rounded-lg transition-colors no-underline ${active
      ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
      : 'text-gray-300 hover:text-white hover:bg-white/5'}`;

  return (
    <header className="sticky top-0 z-50 bg-navy-950/90 backdrop-blur-md border-b border-gray-800/80 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group focus:outline-none">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-gold-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
              <span className="text-navy-950 font-black text-2xl tracking-tighter">B</span>
            </div>
            <div>
              <span className="text-xl font-black tracking-wider text-white">BIMERA</span>
              <span className="block text-[10px] uppercase font-extrabold tracking-widest text-brand-400 -mt-1">Group</span>
            </div>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Navigation principale">
            <Link href="/" className={navLink(pathname === '/')}>Accueil</Link>
            <Link href="/a-propos" className={navLink(pathname === '/a-propos')}>À Propos</Link>

            {/* Dropdown Activités */}
            <div ref={activitiesRef} className="relative"
              onMouseEnter={() => { if (!activitiesLocked) setActivitiesOpen(true); }}
              onMouseLeave={() => { if (!activitiesLocked) setActivitiesOpen(false); }}
            >
              <button
                onClick={() => {
                  const next = !activitiesLocked;
                  setActivitiesLocked(next); setActivitiesOpen(next);
                  setMediaLocked(false); setMediaOpen(false);
                }}
                className={`flex items-center space-x-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors focus:outline-none ${
                  isActivityActive || activitiesOpen
                    ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
                aria-expanded={activitiesOpen} aria-haspopup="true"
              >
                <span>Activités</span>
                <ChevronDown size={15} className={`transition-transform duration-200 ${activitiesOpen ? 'rotate-180 text-brand-400' : 'text-gray-400'}`} />
              </button>
              <div className={`absolute top-full left-0 mt-2 w-72 bg-navy-950/95 backdrop-blur-xl border border-gray-800/90 rounded-2xl p-2 shadow-2xl transition-all duration-200 z-50 ${
                activitiesOpen ? 'opacity-100 visible translate-y-0 scale-100' : 'opacity-0 invisible -translate-y-2 pointer-events-none scale-95'
              }`}>
                <p className="px-3 py-2 text-[11px] uppercase font-extrabold text-brand-400 tracking-wider border-b border-gray-800/80 mb-1">Secteurs d&apos;Activité</p>
                {activities.map((act) => {
                  const Icon = act.icon;
                  return (
                    <Link key={act.href} href={act.href} className={`flex items-center space-x-3 p-2.5 rounded-xl transition-all no-underline ${
                      pathname === act.href ? 'bg-navy-900 text-white font-semibold border border-brand-500/30' : 'text-gray-300 hover:text-white hover:bg-navy-900/80'
                    }`}>
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${act.color}`}><Icon size={18} /></div>
                      <span className="text-sm font-medium">{act.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <Link href="/infos-pratiques" className={navLink(pathname === '/infos-pratiques')}>Infos Pratiques</Link>

            {/* Dropdown Médias */}
            <div ref={mediaRef} className="relative"
              onMouseEnter={() => { if (!mediaLocked) setMediaOpen(true); }}
              onMouseLeave={() => { if (!mediaLocked) setMediaOpen(false); }}
            >
              <button
                onClick={() => {
                  const next = !mediaLocked;
                  setMediaLocked(next); setMediaOpen(next);
                  setActivitiesLocked(false); setActivitiesOpen(false);
                }}
                className={`flex items-center space-x-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors focus:outline-none ${
                  isMediaActive || mediaOpen
                    ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
                aria-expanded={mediaOpen} aria-haspopup="true"
              >
                <span>Médias & Actualités</span>
                <ChevronDown size={15} className={`transition-transform duration-200 ${mediaOpen ? 'rotate-180 text-brand-400' : 'text-gray-400'}`} />
              </button>
              <div className={`absolute top-full left-0 mt-2 w-64 bg-navy-950/95 backdrop-blur-xl border border-gray-800/90 rounded-2xl p-2 shadow-2xl transition-all duration-200 z-50 ${
                mediaOpen ? 'opacity-100 visible translate-y-0 scale-100' : 'opacity-0 invisible -translate-y-2 pointer-events-none scale-95'
              }`}>
                <p className="px-3 py-2 text-[11px] uppercase font-extrabold text-gold-400 tracking-wider border-b border-gray-800/80 mb-1">Actualités & Médias</p>
                {mediaLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.href} href={item.href} className={`flex items-center space-x-3 p-2.5 rounded-xl transition-all no-underline ${
                      pathname === item.href ? 'bg-navy-900 text-white font-semibold border border-gold-500/30' : 'text-gray-300 hover:text-white hover:bg-navy-900/80'
                    }`}>
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${item.color}`}><Icon size={18} /></div>
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <Link href="/contact" className={navLink(pathname === '/contact')}>Contact</Link>
          </nav>

          {/* Actions desktop */}
          <div className="hidden lg:flex items-center space-x-2">
            <LanguageSwitcher />
            <Link href="/login" className="no-underline">
              <Button variant="ghost" size="sm" className="flex items-center space-x-1.5 font-semibold border border-gray-700 hover:border-gray-500">
                <UserIcon size={16} /><span>Se connecter</span>
              </Button>
            </Link>
            <Link href="/register" className="no-underline">
              <Button variant="outline" size="sm" className="flex items-center space-x-1.5 font-bold">
                <UserIcon size={16} /><span>{"S'inscrire"}</span>
              </Button>
            </Link>
          </div>

          {/* Burger mobile */}
          <div className="flex lg:hidden items-center space-x-3">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2.5 rounded-xl bg-navy-900/90 border border-gray-700/80 focus:outline-none active:scale-95 transition-transform"
              aria-label="Ouvrir le menu" aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} className="text-brand-400" /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Drawer mobile */}
      <div className={`fixed inset-x-0 top-20 bg-navy-950/98 backdrop-blur-2xl border-b border-gray-800/90 shadow-2xl transition-all duration-300 z-40 lg:hidden max-h-[calc(100vh-5rem)] overflow-y-auto ${
        mobileMenuOpen ? 'opacity-100 visible translate-y-0 pointer-events-auto' : 'opacity-0 invisible -translate-y-4 pointer-events-none'
      }`}>
        <div className="px-6 pt-4 pb-8 space-y-2">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-3 rounded-xl text-base font-semibold no-underline ${pathname === '/' ? 'bg-brand-500/10 text-brand-400' : 'text-gray-200 hover:bg-navy-900'}`}>
            Accueil
          </Link>
          <Link href="/a-propos" onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-3 rounded-xl text-base font-semibold no-underline ${pathname === '/a-propos' ? 'bg-brand-500/10 text-brand-400' : 'text-gray-200 hover:bg-navy-900'}`}>
            À Propos
          </Link>

          {/* Accordion Activités */}
          <div className="rounded-xl border border-gray-800/80 overflow-hidden bg-navy-900/40">
            <button onClick={() => setMobileActivitiesOpen(!mobileActivitiesOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-base font-semibold text-brand-400 focus:outline-none">
              <span>Activités</span>
              <ChevronDown size={18} className={`text-gray-400 transition-transform duration-200 ${mobileActivitiesOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileActivitiesOpen && (
              <div className="px-3 pb-3 pt-2 space-y-1 bg-navy-950/60 border-t border-gray-800/60">
                {activities.map((act) => {
                  const Icon = act.icon;
                  return (
                    <Link key={act.href} href={act.href} onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm no-underline ${pathname === act.href ? 'text-brand-400 font-bold bg-brand-500/10' : 'text-gray-300 hover:text-white hover:bg-navy-900'}`}>
                      <Icon size={16} className="text-brand-400" /><span>{act.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link href="/infos-pratiques" onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-3 rounded-xl text-base font-semibold no-underline ${pathname === '/infos-pratiques' ? 'bg-brand-500/10 text-brand-400' : 'text-gray-200 hover:bg-navy-900'}`}>
            Infos Pratiques
          </Link>

          {/* Accordion Médias */}
          <div className="rounded-xl border border-gray-800/80 overflow-hidden bg-navy-900/40">
            <button onClick={() => setMobileMediaOpen(!mobileMediaOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-base font-semibold text-gold-400 focus:outline-none">
              <span>Médias & Actualités</span>
              <ChevronDown size={18} className={`text-gray-400 transition-transform duration-200 ${mobileMediaOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileMediaOpen && (
              <div className="px-3 pb-3 pt-2 space-y-1 bg-navy-950/60 border-t border-gray-800/60">
                {mediaLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm no-underline ${pathname === item.href ? 'text-gold-400 font-bold bg-gold-500/10' : 'text-gray-300 hover:text-white hover:bg-navy-900'}`}>
                      <Icon size={16} className="text-gold-400" /><span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link href="/contact" onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-3 rounded-xl text-base font-semibold no-underline ${pathname === '/contact' ? 'bg-brand-500/10 text-brand-400' : 'text-gray-200 hover:bg-navy-900'}`}>
            Contact
          </Link>

          <div className="pt-4 border-t border-gray-800/80 flex flex-col gap-3">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="no-underline">
              <Button variant="ghost" className="w-full justify-center py-3 border border-gray-700">
                <UserIcon size={18} /><span className="ml-2">Se connecter</span>
              </Button>
            </Link>
            <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="no-underline">
              <Button variant="outline" className="w-full justify-center py-3">
                <UserIcon size={18} /><span className="ml-2">{"S'inscrire"}</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
