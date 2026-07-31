'use client';

import React, { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';

type Language = 'fr' | 'en';

export const LanguageSwitcher: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<Language>('fr');

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('bimera_lang') as Language;
    if (saved === 'fr' || saved === 'en') setLang(saved);
  }, []);

  const toggle = (l: Language) => {
    setLang(l);
    localStorage.setItem('bimera_lang', l);
  };

  if (!mounted) {
    return (
      <div className="flex items-center space-x-1 bg-navy-900/80 border border-gray-700/60 rounded-lg p-1 opacity-0 pointer-events-none" aria-hidden>
        <Globe size={14} className="ml-1 mr-0.5" />
        <span className="px-2 py-0.5 text-xs font-bold rounded">FR</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-1 bg-navy-900/80 border border-gray-700/60 rounded-lg p-1">
      <Globe size={14} className="text-gray-400 ml-1 mr-0.5" aria-hidden="true" />
      {(['fr', 'en'] as Language[]).map((l) => (
        <button
          key={l}
          onClick={() => toggle(l)}
          className={`px-2 py-0.5 text-xs font-bold rounded transition-colors ${
            lang === l ? 'bg-brand-600 text-white' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
          }`}
          aria-label={`Langue ${l.toUpperCase()}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
