'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ArrowRight, Sparkles, Sprout, Cpu, Building2, Wrench } from 'lucide-react';
import { siteImages } from '@/lib/images';

export const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'agro' | 'elevage' | 'it' | 'tech'>('agro');

  const tabDetails = {
    agro: {
      title: 'Agriculture Durable & Agro-Écologie',
      desc: "Exploitation intégrée de 1,200+ hectares avec irrigation solaire IoT et semences certifiées à haut rendement.",
      tag: '100% Organique & Résilient',
      color: 'border-brand-500/50 bg-brand-950/40 text-brand-400',
      icon: Sprout,
      image: siteImages.poles.agriculture,
    },
    elevage: {
      title: 'Élevage Bovin & Complexe Avicole',
      desc: "Production laitière informatisée et unité avicole industrielle sous suivi vétérinaire permanent.",
      tag: 'Normes Sanitaires ISO',
      color: 'border-gold-500/50 bg-gold-950/40 text-gold-400',
      icon: Building2,
      image: siteImages.poles.elevage,
    },
    it: {
      title: 'Secrétariat Public & Formations',
      desc: "Cette organisation dispose d'un secrétariat public moderne et dispense des formations certifiantes en informatique bureautique.",
      tag: 'Secrétariat & Formations',
      color: 'border-blue-500/50 bg-blue-950/40 text-blue-400',
      icon: Cpu,
      image: siteImages.poles.informatique,
    },
    tech: {
      title: 'Génie Civil & Énergies Hybrides',
      desc: "Construction d'infrastructures lourdes, maintenance industrielle et déploiement de mini-réseaux photovoltaïques.",
      tag: 'Infrastructures Industrielles',
      color: 'border-purple-500/50 bg-purple-950/40 text-purple-400',
      icon: Wrench,
      image: null,
    },
  };

  const currentTab = tabDetails[activeTab];
  const CurrentIcon = currentTab.icon;

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950">
      {/* Glows statiques — pas d'animation pour les perfs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-gold-500/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2">
            <Badge variant="green" className="py-1.5 px-4 text-xs sm:text-sm font-bold tracking-wide">
              <Sparkles size={16} className="mr-1.5 text-gold-400" />
              BIMERA BUSINESS AGRO DIGITAL SARLU — Transformation &amp; Excellence
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
            <span className="gradient-text">De la Terre au Digital</span> : Cultiver l&apos;Excellence
          </h1>

          <p className="text-base sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-normal">
            Acteur majeur dans l&apos;agriculture, l&apos;élevage, l&apos;informatique et les services techniques,
            au service de la digitalisation stratégique de nos partenaires, clients et membres.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/activites/agriculture" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-base px-8 py-4 shadow-xl shadow-brand-900/50">
                <span>Nos Pôles d&apos;Activités</span>
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 py-4">
                Contactez-nous
              </Button>
            </Link>
          </div>
        </div>

        {/* Tabs secteurs */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="flex justify-center flex-wrap gap-2 p-1.5 bg-navy-900/90 rounded-2xl border border-gray-800 backdrop-blur-md mb-8">
            {[
              { key: 'agro', label: 'Agriculture', icon: Sprout, active: 'bg-brand-600 text-white shadow-lg shadow-brand-900/50' },
              { key: 'elevage', label: 'Élevage', icon: Building2, active: 'bg-gold-500 text-navy-950 shadow-lg shadow-gold-900/50' },
              { key: 'it', label: 'Informatique & Tech', icon: Cpu, active: 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' },
              { key: 'tech', label: 'Services Techniques', icon: Wrench, active: 'bg-purple-600 text-white shadow-lg shadow-purple-900/50' },
            ].map(({ key, label, icon: Icon, active }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as typeof activeTab)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === key ? active : 'text-gray-400 hover:text-white hover:bg-navy-800'
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Carte active */}
          <div className={`glass-panel rounded-3xl border transition-all duration-500 overflow-hidden ${currentTab.color}`}>
            <div className="flex flex-col md:flex-row">
              {currentTab.image && (
                <div className="relative w-full md:w-2/5 h-48 md:h-auto min-h-[12rem] shrink-0">
                  <Image src={currentTab.image} alt={currentTab.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy-950/30 hidden md:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent md:hidden" />
                </div>
              )}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8 flex-1">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-2xl bg-white/10 text-white backdrop-blur-md">
                      <CurrentIcon size={32} />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-widest text-gold-400">{currentTab.tag}</span>
                      <h3 className="text-2xl sm:text-3xl font-black text-white">{currentTab.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-200 text-sm sm:text-base leading-relaxed">{currentTab.desc}</p>
                </div>
                <Link href={`/activites/${activeTab === 'agro' ? 'agriculture' : activeTab === 'it' ? 'informatique' : activeTab}`}>
                  <Button size="md" variant="secondary" className="whitespace-nowrap font-bold">
                    <span>Découvrir le Pôle</span>
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
