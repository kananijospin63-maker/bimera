import Image from 'next/image';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Cpu, Printer, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { siteImages } from '@/lib/images';

export default function InformatiquePage() {
  const services = [
    {
      title: 'Secrétariat Public',
      icon: Printer,
      detail: 'Services bureautiques complets : saisie et traitement de texte, impression, numérisation, photocopie, reliure de documents et travaux d’assistance administrative pour particuliers, étudiants et professionnels.',
    },
    {
      title: 'Formations en Informatique Bureautique',
      icon: GraduationCap,
      detail: 'Formations pratiques et accompagnement personnalisé : prise en main de l’ordinateur, maîtrise des logiciels de la suite bureautique (Word, Excel, PowerPoint), gestion de fichiers, Internet et courrier électronique.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Activités', href: '/' }, { label: 'Pôle Informatique' }]} />

      <div className="relative my-8 h-64 sm:h-80 rounded-3xl overflow-hidden border border-blue-500/30">
        <Image
          src={siteImages.poles.informatique}
          alt="Pôle Informatique — Bureautique & formations"
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 sm:p-8 space-y-3">
          <Badge variant="blue">Pôle Informatique & Bureautique</Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-white">Activités Informatiques</h1>
        </div>
      </div>

      <div className="my-8 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-blue-900/60 text-blue-400 border border-blue-500/30">
            <Cpu size={36} />
          </div>
        </div>

        <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
          Dans le cadre de ses activités informatiques, BIMERA BUSINESS AGRO DIGITAL met à disposition un secrétariat public accessible et organise des formations certifiantes en informatique bureautique pour renforcer l’autonomie numérique de la communauté.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
        {services.map((s, i) => {
          const ServiceIcon = s.icon;
          return (
            <Card key={i} className="border-t-4 border-t-blue-500 space-y-4 p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-blue-900/60 text-blue-400">
                  <ServiceIcon size={28} />
                </div>
                <h3 className="text-xl font-bold text-white">{s.title}</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{s.detail}</p>
            </Card>
          );
        })}
      </div>

      <div className="glass-panel p-8 rounded-2xl border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-6 my-16">
        <div>
          <h3 className="text-2xl font-bold text-white">Besoin de nos services ou de vous inscrire à une formation ?</h3>
          <p className="text-sm text-gray-300 mt-1">Contactez-nous pour en savoir plus sur nos offres de secrétariat public et nos sessions de formation.</p>
        </div>
        <Link href="/contact">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white">Nous Contacter</Button>
        </Link>
      </div>
    </div>
  );
}
