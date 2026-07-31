import React from 'react';

export const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-brand-600 text-white font-bold px-4 py-2 rounded-lg shadow-xl outline-none ring-2 ring-gold-400"
    >
      Aller au contenu principal
    </a>
  );
};
