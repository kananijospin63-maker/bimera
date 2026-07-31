import './globals.css';
import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';

// Polices chargées localement au build — pas de requête externe au runtime
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  preload: true,
  weight: ['600', '700', '800'],
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: {
    default: 'SOCIETE BIMERA — AGRO DIGITAL au Cœur du Développement',
    template: '%s | SOCIETE BIMERA',
  },
  description:
    "Site officiel de SOCIETE BIMERA (BIMERA BUSINESS AGRO DIGITAL SARLU). Acteur majeur dans l'agriculture intelligente, l'élevage, les technologies numériques et les services techniques en RDC.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bimera-businessagrodigital.com'),
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`dark ${inter.variable} ${plusJakarta.variable}`} suppressHydrationWarning>
      <body className="bg-navy-950 text-gray-200 antialiased font-body" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
