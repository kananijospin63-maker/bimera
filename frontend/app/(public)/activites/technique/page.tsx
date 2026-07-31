import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Wrench, CheckCircle2, ShoppingBag, Users, ShieldCheck, Settings } from 'lucide-react';
import Link from 'next/link';

export default function TechniquePage() {
  const pillars = [
    {
      title: 'Production & Équipements',
      icon: ShoppingBag,
      detail: 'Approche globale couvrant la production, l’achat, la vente, l’importation et l’exportation de matériels informatiques, agricoles et techniques.',
    },
    {
      title: 'Assemblage & Maintenance',
      icon: Settings,
      detail: 'Représentation commerciale, assemblage sur-mesure, placement sur site, entretien préventif et réparation pour garantir performance et durabilité.',
    },
    {
      title: 'Investissements & Courtage',
      icon: Users,
      detail: 'Intermédiation d’investissement, contrats d’achat/vente en commun et opérations de courtage favorisant l’expansion des marchés et les synergies.',
    },
    {
      title: 'Partenaire Fiable & Durable',
      icon: ShieldCheck,
      detail: 'Gestion rigoureuse et commercialisation de matériels techniques pour soutenir la modernisation des secteurs desservis.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Activités', href: '/' }, { label: 'Activités Techniques' }]} />

      <div className="my-8 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-purple-900/60 text-purple-400 border border-purple-500/30">
            <Wrench size={36} />
          </div>
          <div>
            <Badge variant="purple">BBAD-RDC</Badge>
            <h1 className="text-3xl sm:text-5xl font-black text-white mt-1">Activités Techniques de BBAD-RDC</h1>
          </div>
        </div>

        <p className="text-gray-300 text-lg leading-relaxed max-w-4xl font-medium">
          BBAD-RDC étend son expertise au domaine des activités techniques, en mettant en œuvre une approche globale qui couvre la production, l’achat, la vente, l’importation et l’exportation de matériels et équipements, qu’ils soient informatiques, agricoles ou issus d’autres secteurs.
        </p>
      </div>

      {/* Grid of Key Technical Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
        {pillars.map((item, i) => {
          const Icon = item.icon;
          return (
            <Card key={i} className="border-t-4 border-t-purple-500 space-y-3 p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-purple-900/60 text-purple-400">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{item.detail}</p>
            </Card>
          );
        })}
      </div>

      {/* Complete Article Content */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-purple-500/30 space-y-6 my-12">
        <div className="border-b border-gray-800 pb-4">
          <Badge variant="purple" className="mb-2">Article Officiel</Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Présentation Détaillée des Activités Techniques</h2>
          <p className="text-xs text-gray-400 mt-1">3 avril 2026 — par Bimera</p>
        </div>

        <div className="space-y-4 text-gray-200 text-sm sm:text-base leading-relaxed">
          <p>
            BBAD-RDC étend son expertise au domaine des activités techniques, en mettant en œuvre une approche globale qui couvre la production, l’achat, la vente, l’importation et l’exportation de matériels et équipements, qu’ils soient informatiques, agricoles ou issus d’autres secteurs.
          </p>
          <p>
            L’entreprise assure également la représentation, le commerce, l’assemblage, le placement, l’entretien et la réparation de ces matériels, garantissant ainsi leur performance et leur durabilité pour ses clients.
          </p>
          <p>
            Pour renforcer son efficacité et son impact, BBAD-RDC peut faire exploiter certaines de ses activités par des intermédiaires d’investissement, optimisant ainsi les ressources et les opportunités de développement.
          </p>
          <p>
            Par ailleurs, l’entreprise s’engage dans des partenariats et contrats d’achat ou de vente en commun, en intervenant comme intermédiaire grâce à des opérations de courtage, favorisant la synergie avec d’autres acteurs économiques et l’expansion des marchés.
          </p>
          <p>
            À travers ces initiatives, BBAD-RDC se positionne comme un partenaire fiable pour la gestion, la maintenance et la commercialisation de matériels techniques, tout en soutenant le développement économique et la modernisation des secteurs qu’elle dessert.
          </p>
        </div>
      </div>

      {/* Call to action */}
      <div className="glass-panel p-8 rounded-2xl border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-6 my-16">
        <div>
          <h3 className="text-2xl font-bold text-white">Un besoin en matériels, maintenance ou intermédiation technique ?</h3>
          <p className="text-sm text-gray-300 mt-1">Contactez nos équipes commerciales et techniques pour étudier vos besoins.</p>
        </div>
        <Link href="/contact">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-500 text-white">Contacter le Pôle Technique</Button>
        </Link>
      </div>
    </div>
  );
}
