import Image from 'next/image';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Maximize2 } from 'lucide-react';
import { galleryImages } from '@/lib/images';

export default function GaleriePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Médias', href: '#' }, { label: 'Galerie Photos' }]} />

      <div className="my-8 space-y-3 text-center max-w-2xl mx-auto">
        <Badge variant="gold">Médiathèque Groupe</Badge>
        <h1 className="text-4xl font-black text-white">Galerie Photos & Projets</h1>
        <p className="text-gray-300 text-sm">
          Immergez-vous au cœur des exploitations, des chantiers et des infrastructures de Bimera Group.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
        {galleryImages.map((img, i) => (
          <Card
            key={i}
            className={`group relative overflow-hidden p-0 rounded-2xl h-64 border border-gray-800 ${
              img.size === 'large' ? 'sm:col-span-2 lg:col-span-1' : ''
            }`}
          >
            <Image
              src={img.src}
              alt={img.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2">
              <Badge variant="green">{img.category}</Badge>
              <h3 className="font-bold text-white text-base">{img.title}</h3>
            </div>

            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                className="p-3 rounded-full bg-brand-600 text-white shadow-xl hover:scale-110 transition-transform"
                aria-label={`Agrandir : ${img.title}`}
              >
                <Maximize2 size={20} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
