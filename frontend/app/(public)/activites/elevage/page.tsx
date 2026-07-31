import Image from 'next/image';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Building2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { siteImages } from '@/lib/images';

export default function ElevagePage() {
  const highlights = [
    { title: 'Élevage Bovin & Production Laitière', detail: 'Troupeaux sélectionnés pour la production laitière fraîche distribuée localement.' },
    { title: 'Unité Avicole Moderne', detail: 'Production automatisée d’œufs de table et de poulets de chair sous contrôles sanitaires stricts.' },
    { title: 'Suivi Vétérinaire & Hygiène', detail: 'Couverture vétérinaire permanente garantissant zéro antibiotique de synthèse préventif.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Activités', href: '/' }, { label: 'Pôle Élevage' }]} />

      <div className="relative my-8 h-64 sm:h-80 rounded-3xl overflow-hidden border border-gold-500/30">
        <Image
          src={siteImages.poles.elevage}
          alt="Pôle Élevage — Production animale"
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 sm:p-8 space-y-3">
          <Badge variant="gold">Pôle Animal & Aviculture</Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-white">Élevage Responsable</h1>
        </div>
      </div>

      <div className="my-8 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-gold-900/60 text-gold-400 border border-gold-500/30">
            <Building2 size={36} />
          </div>
        </div>

        <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
          Bimera Group gère des complexes d’élevage modernes axés sur la bientraitance animale, l’hygiène rigoureuse et la production de produits frais (lait, viande, œufs) répondant aux besoins nutritionnels des populations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
        {highlights.map((h, i) => (
          <Card key={i} className="border-t-4 border-t-gold-500 space-y-3">
            <CheckCircle2 size={24} className="text-gold-400" />
            <h3 className="text-xl font-bold text-white">{h.title}</h3>
            <p className="text-sm text-gray-300 leading-relaxed">{h.detail}</p>
          </Card>
        ))}
      </div>

      <div className="glass-panel p-8 rounded-2xl border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6 my-16">
        <div>
          <h3 className="text-2xl font-bold text-white">Commande de produits ou partenariats d’élevage ?</h3>
          <p className="text-sm text-gray-300 mt-1">Nous approvisionnons les détaillants, hôtels et ménages.</p>
        </div>
        <Link href="/contact">
          <Button size="lg" variant="secondary">Contacter le Pôle Élevage</Button>
        </Link>
      </div>
    </div>
  );
}
