'use client';

import React, { useState } from 'react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Calendar, Search, ArrowRight, Share2, Copy, Check, X } from 'lucide-react';
import Link from 'next/link';

const articles = [
  {
    id: '1',
    title: 'Modernisation des infrastructures d’irrigation dans nos fermes agricoles',
    summary: 'Bimera Group déploie un système d’irrigation solaire intelligent permettant d’économiser 40% d’eau tout en augmentant le rendement.',
    category: 'AGRICULTURE',
    date: '2026-06-15',
    slug: 'modernisation-irrigation-solaire',
  },
  {
    id: '2',
    title: 'Lancement du nouveau portail ERP pour la gestion de la chaîne d’approvisionnement',
    summary: 'Notre équipe IT a développé une suite logicielle sur-mesure facilitant le suivi en temps réel des stocks et de la traçabilité.',
    category: 'INFORMATIQUE',
    date: '2026-05-28',
    slug: 'lancement-portail-erp-bimera',
  },
  {
    id: '3',
    title: 'Extension du complexe avicole et nouvelles certifications sanitaires',
    summary: 'Obtention des accréditations de normes internationales pour l’unité d’élevage avicole de Bukavu.',
    category: 'ELEVAGE',
    date: '2026-04-10',
    slug: 'extension-complexe-avicole',
  },
  {
    id: '4',
    title: 'Installation d’un micro-réseau solaire hybride de 150 kW en zone rurale',
    summary: 'Le pôle technique a finalisé l’électrification solaire du site de transformation de céréales.',
    category: 'TECHNIQUE',
    date: '2026-03-22',
    slug: 'micro-reseau-solaire-hybride',
  },
];

function ShareMenu({ slug, title }: { slug: string; title: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const url = `${typeof window !== 'undefined' ? window.location.origin : 'https://www.bimera-group.com'}/medias-actualites/blog/${slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => { setCopied(false); setOpen(false); }, 1800);
  };

  const shareOptions = [
    {
      label: copied ? 'Lien copié !' : 'Copier le lien',
      icon: copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />,
      action: handleCopy,
      className: copied ? 'text-green-400' : 'text-gray-300 hover:text-white',
    },
    {
      label: 'WhatsApp',
      icon: <span className="text-sm">💬</span>,
      action: () => { window.open(`https://wa.me/?text=${encodeURIComponent(title + ' — ' + url)}`, '_blank'); setOpen(false); },
      className: 'text-gray-300 hover:text-green-400',
    },
    {
      label: 'Facebook',
      icon: <span className="text-sm">📘</span>,
      action: () => { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank'); setOpen(false); },
      className: 'text-gray-300 hover:text-blue-400',
    },
    {
      label: 'Twitter / X',
      icon: <span className="text-sm">🐦</span>,
      action: () => { window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank'); setOpen(false); },
      className: 'text-gray-300 hover:text-sky-400',
    },
    {
      label: 'LinkedIn',
      icon: <span className="text-sm">💼</span>,
      action: () => { window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank'); setOpen(false); },
      className: 'text-gray-300 hover:text-blue-300',
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-1.5 text-xs font-semibold text-gray-400 hover:text-brand-400 transition-colors p-1.5 rounded-lg hover:bg-brand-900/30"
        title="Partager cet article"
      >
        <Share2 size={14} />
        <span>Partager</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 bottom-full mb-2 w-48 bg-navy-900 border border-gray-700 rounded-xl shadow-2xl z-40 overflow-hidden py-1">
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-800">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Partager via</span>
              <button onClick={() => setOpen(false)} className="text-gray-600 hover:text-gray-400">
                <X size={12} />
              </button>
            </div>
            {shareOptions.map((opt) => (
              <button
                key={opt.label}
                onClick={opt.action}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 text-xs font-medium transition-colors hover:bg-navy-800 ${opt.className}`}
              >
                <span className="w-4 flex items-center justify-center">{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function BlogIndexPage() {
  const [search, setSearch] = useState('');

  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Médias & Actualités', href: '#' }, { label: 'Blog' }]} />

      <div className="flex flex-col md:flex-row md:items-end justify-between my-8 gap-4">
        <div>
          <Badge variant="gold">Blog & Actualités</Badge>
          <h1 className="text-4xl font-black text-white mt-1">Dernières Publications</h1>
        </div>

        <div className="relative w-full md:w-72">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-navy-900 border border-gray-700 rounded-lg text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
        {filtered.map((art) => (
          <Card key={art.id} className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <Badge variant="green">{art.category}</Badge>
                <span className="flex items-center">
                  <Calendar size={12} className="mr-1" />
                  {art.date}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white hover:text-brand-400 transition-colors">
                <Link href={`/medias-actualites/blog/${art.slug}`}>{art.title}</Link>
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{art.summary}</p>
            </div>

            <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
              <Link
                href={`/medias-actualites/blog/${art.slug}`}
                className="text-sm font-bold text-brand-400 hover:underline inline-flex items-center"
              >
                <span>Lire l’article complet</span>
                <ArrowRight size={14} className="ml-1.5" />
              </Link>
              <ShareMenu slug={art.slug} title={art.title} />
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <Search size={32} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm">Aucun article trouvé pour &quot;{search}&quot;</p>
        </div>
      )}
    </div>
  );
}
