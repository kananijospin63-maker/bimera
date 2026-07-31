import Image from 'next/image';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Sprout, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { siteImages } from '@/lib/images';

export default function AgriculturePage() {
  const projects = [
    { title: 'Culture Céréalière Intelligente', detail: 'Exploitation de 500+ hectares de maïs et soja à haut rendement.' },
    { title: 'Irrigation Solaire de Précision', detail: 'Utilisation de capteurs IoT pour économiser jusqu’à 40% des ressources hydriques.' },
    { title: 'Distribution de Semences Certifiées', detail: 'Approvisionnement des fermiers locaux en variétes résilientes au changement climatique.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Activités', href: '/' }, { label: 'Pôle Agriculture' }]} />

      <div className="relative my-8 h-64 sm:h-80 rounded-3xl overflow-hidden border border-brand-500/30">
        <Image
          src={siteImages.poles.agriculture}
          alt="Pôle Agriculture — Agro-écologie"
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 sm:p-8 space-y-3">
          <Badge variant="green">Pôle Agro-Écologique</Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-white">Agriculture Sustainable</h1>
        </div>
      </div>

      <div className="my-8 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-brand-900/60 text-brand-400 border border-brand-500/30">
            <Sprout size={36} />
          </div>
        </div>

        <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
          Notre pôle agricole combine méthodes écologiques et technologies de pointe pour maximiser les rendements tout en préservant la biodiversité des sols. Nous opérons des fermes modèles intégrées produisant céréales, légumineuses et produits maraîchers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
        {projects.map((p, i) => (
          <Card key={i} className="border-t-4 border-t-brand-500 space-y-3">
            <CheckCircle2 size={24} className="text-brand-400" />
            <h3 className="text-xl font-bold text-white">{p.title}</h3>
            <p className="text-sm text-gray-300 leading-relaxed">{p.detail}</p>
          </Card>
        ))}
      </div>

      <div className="glass-panel p-8 rounded-2xl border border-brand-500/30 flex flex-col md:flex-row items-center justify-between gap-6 my-16">
        <div>
          <h3 className="text-2xl font-bold text-white">Besoin de conseils agronomiques ou de semences ?</h3>
          <p className="text-sm text-gray-300 mt-1">Nos experts accompagnent les producteurs et investisseurs agricoles.</p>
        </div>
        <Link href="/contact">
          <Button size="lg" variant="primary">Contacter le Pôle Agriculture</Button>
        </Link>
      </div>
    </div>
  );
}
