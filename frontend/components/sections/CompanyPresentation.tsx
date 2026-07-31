'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Building2, Cpu, Sprout, Wrench } from 'lucide-react';

export const CompanyPresentation: React.FC = () => {
  const pillars = [
    {
      img: '/images/acceuil/Présence Numérique.jpg',
      borderColor: 'border-t-brand-500',
      title: 'Présence Numérique',
      desc: "Une vitrine officielle moderne offrant une visibilité internationale et un accès direct aux services et projets de la société SARLU.",
    },
    {
      img: '/images/acceuil/Communication & Partenaires(5).png',
      borderColor: 'border-t-gold-500',
      title: 'Communication & Partenaires',
      desc: "Canaux d'information fluides et transparents conçus pour nos clients, membres et partenaires stratégiques régionaux.",
    },
    {
      img: '/images/acceuil/Outil de Gestion.png',
      borderColor: 'border-t-blue-500',
      title: 'Outil de Gestion',
      desc: "Une plateforme applicative intégrée pour le suivi des activités, la gestion du portail membre et la prise de décision.",
    },
    {
      img: '/images/acceuil/Digitalisation Stratégique.png',
      borderColor: 'border-t-purple-500',
      title: 'Digitalisation Stratégique',
      desc: "Alignement avec les normes de gouvernance digitale modernes, garantissant sécurité, évolutivité et réactivité.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-navy-900/60 border-y border-gray-800/80 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-14">
          <Badge variant="gold" className="px-4 py-1 text-xs uppercase font-extrabold tracking-widest">
            Présentation Officielle
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            BIMERA BUSINESS AGRO DIGITAL <span className="gradient-text">SARLU</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal pt-2">
            La société <strong className="text-white font-bold">BIMERA BUSINESS AGRO DIGITAL SARLU</strong>, acteur majeur dans les secteurs de l&apos;agriculture, de l&apos;élevage, de l&apos;informatique et des services techniques, s&apos;engage dans la création d&apos;un site web professionnel visant à renforcer sa présence numérique et faciliter l&apos;accès à l&apos;information pour ses partenaires, clients et membres.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => (
            <Card key={idx} className={`border-t-4 ${p.borderColor} bg-navy-950/80 p-0 overflow-hidden space-y-0`}>
              {/* Image en haut, pleine largeur */}
              <div className="relative w-full h-44 bg-navy-900">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              {/* Texte en dessous */}
              <div className="p-5 space-y-2">
                <h3 className="text-base font-bold text-white">{p.title}</h3>
                <p className="text-xs text-gray-300 leading-relaxed">{p.desc}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Sectors Quick Overview Banner */}
        <div className="mt-12 glass-panel p-6 sm:p-8 rounded-3xl border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-gold-500 flex items-center justify-center text-navy-950 font-black text-2xl shadow-lg shrink-0">
              B
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Synergie de 4 Pôles Majeurs</h4>
              <p className="text-xs text-gray-400">Agriculture • Élevage • Informatique & Tech • Services Techniques</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/30 flex items-center gap-1.5">
              <Sprout size={14} /> Agriculture
            </span>
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gold-500/10 text-gold-400 border border-gold-500/30 flex items-center gap-1.5">
              <Building2 size={14} /> Élevage
            </span>
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center gap-1.5">
              <Cpu size={14} /> Informatique
            </span>
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center gap-1.5">
              <Wrench size={14} /> Services Tech
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
