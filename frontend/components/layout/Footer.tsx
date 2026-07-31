'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ShieldCheck, ArrowUpRight, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.555 4.122 1.528 5.855L0 24l6.335-1.508A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 0 1-5.006-1.374l-.36-.214-3.726.977.994-3.63-.234-.373A9.818 9.818 0 1 1 12 21.818z" />
  </svg>
);

export const Footer: React.FC = () => {
  const socialLinks = [
    { label: 'Facebook', href: 'https://facebook.com/bimerabusinessagrodigital', icon: Facebook, color: 'hover:text-blue-400 hover:bg-blue-400/10 hover:border-blue-400/30' },
    { label: 'X / Twitter', href: 'https://twitter.com/bimeraagro', icon: Twitter, color: 'hover:text-sky-400 hover:bg-sky-400/10 hover:border-sky-400/30' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/bimera-business-agro-digital', icon: Linkedin, color: 'hover:text-blue-500 hover:bg-blue-500/10 hover:border-blue-500/30' },
    { label: 'YouTube', href: 'https://youtube.com/@bimeraagro', icon: Youtube, color: 'hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/30' },
    { label: 'WhatsApp', href: 'https://wa.me/25779490806', icon: WhatsAppIcon, color: 'hover:text-green-400 hover:bg-green-400/10 hover:border-green-400/30' },
  ];

  return (
    <footer className="bg-navy-950 border-t border-gray-800 text-gray-400 pt-16 pb-12 mt-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/4 w-72 h-72 bg-brand-600/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 right-1/4 w-72 h-72 bg-gold-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1: Brand */}
          <div className="space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-gold-500 flex items-center justify-center text-navy-950 font-black text-xl shadow-lg">B</div>
              <div>
                <span className="text-lg font-black text-white tracking-wider block leading-tight">SOCIETE BIMERA</span>
                <span className="text-[10px] font-semibold text-gold-400 tracking-widest uppercase">AGRO DIGITAL</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400 italic">
              &laquo; AGRO DIGITAL au Cœur du Développement &raquo;
            </p>
            <p className="text-xs leading-relaxed text-gray-500">
              Leader dans le développement multi-sectoriel durable et l&apos;innovation technologique.
            </p>
            <div className="flex items-center space-x-2 text-xs text-brand-400 bg-brand-950/80 p-3 rounded-xl border border-brand-800/40">
              <ShieldCheck size={18} className="shrink-0 text-brand-400" />
              <span>BIMERA BUSINESS AGRO DIGITAL SARLU</span>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold text-white uppercase tracking-widest">Suivez-nous</p>
              <div className="flex items-center flex-wrap gap-2">
                {socialLinks.map((social) => {
                  const SocialIcon = social.icon;
                  return (
                    <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" title={social.label}
                      className={`w-9 h-9 rounded-xl border border-gray-700 flex items-center justify-center text-gray-400 transition-all duration-200 ${social.color}`}>
                      <SocialIcon />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Col 2: Liens rapides */}
          <div>
            <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-widest border-b border-gray-800 pb-2">Liens Rapides</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><Link href="/" className="hover:text-brand-400 transition-colors">Accueil</Link></li>
              <li><Link href="/a-propos" className="hover:text-brand-400 transition-colors">À Propos</Link></li>
              <li><Link href="/infos-pratiques" className="hover:text-brand-400 transition-colors">Infos Pratiques</Link></li>
              <li><Link href="/medias-actualites/blog" className="hover:text-brand-400 transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-brand-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3: Activités */}
          <div>
            <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-widest border-b border-gray-800 pb-2">Nos Activités</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/activites/agriculture" className="hover:text-brand-400 transition-colors flex items-center justify-between">
                  <span>Agriculture Durable</span><ArrowUpRight size={14} className="opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/activites/elevage" className="hover:text-gold-400 transition-colors flex items-center justify-between">
                  <span>Élevage &amp; Aviculture</span><ArrowUpRight size={14} className="opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/activites/informatique" className="hover:text-blue-400 transition-colors flex items-center justify-between">
                  <span>Informatique &amp; Bureautique</span><ArrowUpRight size={14} className="opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/activites/technique" className="hover:text-purple-400 transition-colors flex items-center justify-between">
                  <span>Services Techniques</span><ArrowUpRight size={14} className="opacity-60" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-widest border-b border-gray-800 pb-2">Contact &amp; Siège</h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-brand-400 mt-0.5 shrink-0" />
                <span>Kavumu, Sud-Kivu — République Démocratique du Congo</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-brand-400 shrink-0" />
                <span>+257 79490806</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-brand-400 shrink-0" />
                <a href="mailto:kananijospin63@gmail.com" className="hover:text-brand-400 transition-colors break-all">
                  kananijospin63@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Barre du bas */}
        <div className="border-t border-gray-800/80 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} <strong className="text-gray-400">SOCIETE BIMERA</strong> (BIMERA BUSINESS AGRO DIGITAL SARLU). Tous droits réservés.</p>
          <div className="flex items-center space-x-6">
            <Link href="/infos-pratiques" className="hover:text-gray-400 transition">Mentions Légales</Link>
            <Link href="/infos-pratiques" className="hover:text-gray-400 transition">Politique de Confidentialité</Link>
            <Link href="/sitemap.xml" className="hover:text-gray-400 transition">Plan du Site</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
