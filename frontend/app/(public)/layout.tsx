import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MenuSticky } from '@/components/layout/MenuSticky';
import { SkipToContent } from '@/components/layout/SkipToContent';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <SkipToContent />
      <Header />
      <main id="main-content" className="flex-grow focus:outline-none">
        {children}
      </main>
      <MenuSticky />
      <Footer />
    </div>
  );
}
