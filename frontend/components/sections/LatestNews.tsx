import React from 'react';
import Link from 'next/link';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const LatestNews: React.FC = () => {
  const articles = [
    {
      id: '1',
      title: 'Modernisation des infrastructures d’irrigation dans nos fermes agricoles',
      summary: 'Bimera Group déploie un système d’irrigation solaire intelligent permettant d’économiser 40% d’eau tout en augmentant le rendement.',
      category: 'AGRICULTURE',
      date: '2026-06-15',
      readTime: '4 min',
      slug: 'modernisation-irrigation-solaire',
    },
    {
      id: '2',
      title: 'Lancement du nouveau portail ERP pour la gestion de la chaîne d’approvisionnement',
      summary: 'Notre équipe IT a développé une suite logicielle sur-mesure facilitant le suivi en temps réel des stocks et de la traçabilité.',
      category: 'INFORMATIQUE',
      date: '2026-05-28',
      readTime: '6 min',
      slug: 'lancement-portail-erp-bimera',
    },
    {
      id: '3',
      title: 'Extension du complexe avicole et nouvelles certifications sanitaires',
      summary: 'Obtention des accréditations de normes internationales pour l’unité d’élevage avicole de Bukavu.',
      category: 'ELEVAGE',
      date: '2026-04-10',
      readTime: '3 min',
      slug: 'extension-complexe-avicole',
    },
  ];

  return (
    <section className="py-20 bg-navy-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <Badge variant="gold" className="mb-2">Actualités & Publications</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Dernières Actualités</h2>
          </div>
          <Link
            href="/medias-actualites/blog"
            className="mt-4 md:mt-0 inline-flex items-center text-sm font-bold text-brand-400 hover:text-brand-300 transition-colors"
          >
            <span>Voir tous les articles</span>
            <ArrowRight size={16} className="ml-1.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="glass-card-hover flex flex-col justify-between p-6 rounded-2xl border border-gray-800"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <Badge variant={article.category === 'AGRICULTURE' ? 'green' : article.category === 'INFORMATIQUE' ? 'blue' : 'gold'}>
                    {article.category}
                  </Badge>
                  <span className="flex items-center">
                    <Clock size={12} className="mr-1 text-gray-400" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white hover:text-brand-400 transition-colors leading-snug">
                  <Link href={`/medias-actualites/blog/${article.slug}`}>{article.title}</Link>
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-800/80 flex items-center justify-between">
                <span className="text-[11px] text-gray-400 flex items-center">
                  <Calendar size={12} className="mr-1 text-brand-400" />
                  {formatDate(article.date)}
                </span>

                <Link
                  href={`/medias-actualites/blog/${article.slug}`}
                  className="text-xs font-bold text-brand-400 hover:underline flex items-center"
                >
                  <span>Lire l’article</span>
                  <ArrowRight size={12} className="ml-1" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
