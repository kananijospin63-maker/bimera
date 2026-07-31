import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: 'Blog', href: '/medias-actualites/blog' },
          { label: 'Article' },
        ]}
      />

      <div className="my-8 space-y-4">
        <Badge variant="green">AGRICULTURE</Badge>
        <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
          Modernisation des infrastructures d’irrigation dans nos fermes agricoles
        </h1>

        <div className="flex items-center space-x-6 text-xs text-gray-400 border-y border-gray-800 py-3">
          <span className="flex items-center">
            <User size={14} className="mr-1 text-brand-400" />
            Rédigé par le Pôle Agro Bimera
          </span>
          <span className="flex items-center">
            <Calendar size={14} className="mr-1 text-gold-400" />
            15 Juin 2026
          </span>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-2xl border border-gray-800 space-y-6 text-gray-300 leading-relaxed text-base">
        <p className="font-semibold text-lg text-white">
          Dans le cadre de son programme quinquennal de transition écologique, Bimera Group a finalisé le déploiement d’un système d’irrigation automatisé alimenté par énergie solaire.
        </p>

        <h2 className="text-2xl font-bold text-white pt-4">Technologie IoT et Économie d’Eau</h2>
        <p>
          En intégrant des capteurs de tension hydrique directement implantés dans le sol, le système ajuste automatiquement les volumes d’eau distribués selon l’humidité réelle des parcelles et les prévisions météorologiques locales.
        </p>

        <blockquote className="border-l-4 border-brand-500 pl-4 italic text-brand-300 bg-brand-950/40 p-4 rounded-r-lg">
          « Notre objectif est de prouver qu’une agriculture intensive et productive peut consommer 40% d’eau en moins grâce aux technologies durables. »
        </blockquote>

        <h2 className="text-2xl font-bold text-white pt-4">Impacts sur les Récoltes</h2>
        <p>
          Les premiers tests menés sur les parcelles pilotes de maïs montrent une régularité accrue de la croissance des plantes et une réduction drastique du stress hydrique pendant les saisons sèches.
        </p>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Link href="/medias-actualites/blog">
          <Button variant="outline" size="sm">
            <ArrowLeft size={16} className="mr-1.5" />
            Retour aux articles
          </Button>
        </Link>

        <Button variant="ghost" size="sm">
          <Share2 size={16} className="mr-1.5" />
          Partager
        </Button>
      </div>
    </article>
  );
}
