'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Sprout, Building2, Cpu, Wrench, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { siteImages } from '@/lib/images';

export const ActivitesGrid: React.FC = () => {
  const activities = [
    {
      id: 'agriculture',
      title: 'Pôle Agriculture',
      description: 'Développement de cultures agro-écologiques modernes, gestion de semences certifiées et transformation locale durable.',
      features: ['Cultures céréalières', 'Irrigation solaire IoT', 'Semences certifiées'],
      icon: Sprout,
      color: 'from-emerald-600 to-green-800',
      badge: 'Agro-Écologie',
      href: '/activites/agriculture',
      image: siteImages.poles.agriculture,
    },
    {
      id: 'elevage',
      title: 'Pôle Élevage',
      description: 'Élevage bovin, caprin et unité avicole industrielle respectant les normes de bien-être animal et d’hygiène vétérinaire.',
      features: ['Production laitière', 'Complexe avicole', 'Suivi vétérinaire 24/7'],
      icon: Building2,
      color: 'from-amber-600 to-yellow-800',
      badge: 'Lait & Aviculture',
      href: '/activites/elevage',
      image: siteImages.poles.elevage,
    },
    {
      id: 'informatique',
      title: 'Pôle Informatique',
      description: 'Cette organisation dispose d’un secrétariat public et dispense des formations pratiques en informatique bureautique.',
      features: ['Secrétariat Public', 'Formations en Bureautique', 'Assistance Administrative'],
      icon: Cpu,
      color: 'from-blue-600 to-indigo-800',
      badge: 'Bureautique & Secrétariat',
      href: '/activites/informatique',
      image: siteImages.poles.informatique,
    },
    {
      id: 'technique',
      title: 'Pôle Services Techniques',
      description: 'Génie civil, construction d’infrastructures agricoles, maintenance industrielle et déploiement d’énergies renouvelables.',
      features: ['Bâtiments industriels', 'Centrales solaires', 'Maintenance d’engins'],
      icon: Wrench,
      color: 'from-purple-600 to-indigo-900',
      badge: 'Génie Civil & Énergie',
      href: '/activites/technique',
    },
  ];

  return (
    <section className="py-20 bg-navy-950 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-brand-400 uppercase tracking-widest px-3 py-1 bg-brand-950 border border-brand-800/60 rounded-full">
            Multisectoriel & Intégré
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Nos 4 Pôles d’Expertise
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Des pôles autonomes et complémentaires au service de l’indépendance économique et de l’innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activities.map((act) => {
            const Icon = act.icon;
            return (
              <Card
                key={act.id}
                className="glass-card-hover flex flex-col justify-between h-full relative overflow-hidden border border-gray-800 p-0 rounded-3xl group"
              >
                {act.image && (
                  <div className="relative h-72 w-full overflow-hidden bg-navy-900">
                    <Image
                      src={act.image}
                      alt={act.title}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
                  </div>
                )}

                {/* Gradient background accent */}
                <div
                  className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${act.color} opacity-10 blur-3xl group-hover:opacity-25 transition-opacity duration-500`}
                />

                <div className="space-y-6 relative z-10 p-8 flex-1 flex flex-col">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${act.color} flex items-center justify-center text-white shadow-xl shadow-black/40 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon size={32} />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-navy-900 text-gray-200 border border-gray-700">
                      {act.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-white group-hover:text-brand-400 transition-colors">
                      {act.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed mt-2">
                      {act.description}
                    </p>
                  </div>

                  {/* Key Features Pill List */}
                  <div className="space-y-2 pt-2 border-t border-gray-800/80">
                    {act.features.map((feat, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-gray-300 font-medium">
                        <CheckCircle2 size={14} className="text-brand-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-auto border-t border-gray-800/60 relative z-10 px-8 pb-8">
                  <Link href={act.href}>
                    <Button
                      variant="outline"
                      className="w-full justify-between group-hover:border-brand-500 group-hover:bg-brand-900/40 text-sm font-bold"
                    >
                      <span>Explorer le Pôle</span>
                      <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
