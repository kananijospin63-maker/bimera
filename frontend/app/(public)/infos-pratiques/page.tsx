import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Clock, MapPin, Phone, HelpCircle, FileText, Download } from 'lucide-react';

export default function InfosPratiquesPage() {
  const faqs = [
    { q: 'Comment passer commande de produits agricoles ou d’élevage ?', a: 'Vous pouvez contacter directement notre service commercial via le formulaire de contact ou par téléphone. Pour les commandes récurrentes, un espace client dédié est disponible sur le Portail Membre.' },
    { q: 'Quels sont les délais d’intervention pour les services informatiques ?', a: 'Nos équipes d’assistance et de développement répondent sous 24h pour les demandes de conseil et garantissent un support 24/7 pour les clients sous contrat de maintenance Cloud.' },
    { q: 'Bimera Group propose-t-il des visites guidées de ses fermes agricoles ?', a: 'Oui, nous organisons régulièrement des journées portes ouvertes et des visites d’études pour les écoles, coopératives et partenaires institutionnels sur réservation.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Infos Pratiques' }]} />

      <div className="text-center max-w-3xl mx-auto my-10 space-y-3">
        <Badge variant="green">Informations & FAQ</Badge>
        <h1 className="text-4xl font-black text-white">Guide & Informations Pratiques</h1>
        <p className="text-gray-300 text-base">
          Tout ce qu’il faut savoir pour interagir avec Bimera Group : nos bureaux, nos horaires, notre Foire Aux Questions et nos documents téléchargeables.
        </p>
      </div>

      {/* Horaires et Bureaux */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
        <Card className="space-y-3">
          <div className="w-10 h-10 rounded-lg bg-brand-900/60 text-brand-400 flex items-center justify-center">
            <Clock size={20} />
          </div>
          <h3 className="text-lg font-bold text-white">Horaires d’Ouverture</h3>
          <ul className="text-xs text-gray-300 space-y-1.5">
            <li><strong className="text-white">Lundi - Vendredi :</strong> 08h00 - 17h00</li>
            <li><strong className="text-white">Samedi :</strong> 08h30 - 13h00</li>
            <li><strong className="text-white">Dimanche :</strong> Fermé</li>
          </ul>
        </Card>

        <Card className="space-y-3">
          <div className="w-10 h-10 rounded-lg bg-gold-900/60 text-gold-400 flex items-center justify-center">
            <MapPin size={20} />
          </div>
          <h3 className="text-lg font-bold text-white">Notre Adresse Officielle</h3>
          <ul className="text-xs text-gray-300 space-y-1.5">
            <li><strong className="text-white">Siège Social :</strong> Kavumu, Sud-Kivu — République Démocratique du Congo</li>
          </ul>
        </Card>

        <Card className="space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-900/60 text-blue-400 flex items-center justify-center">
            <Download size={20} />
          </div>
          <h3 className="text-lg font-bold text-white">Documents à Télécharger</h3>
          <ul className="text-xs text-gray-300 space-y-2">
            <li className="flex items-center justify-between p-2 bg-navy-900 rounded border border-gray-800">
              <span className="truncate">Plaquette institutionnelle 2026.pdf</span>
              <FileText size={14} className="text-brand-400 shrink-0 ml-1" />
            </li>
            <li className="flex items-center justify-between p-2 bg-navy-900 rounded border border-gray-800">
              <span className="truncate">Catalogue Produits & Services.pdf</span>
              <FileText size={14} className="text-gold-400 shrink-0 ml-1" />
            </li>
          </ul>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="my-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-white">Foire Aux Questions (FAQ)</h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <Card key={i} className="space-y-2">
              <h4 className="text-base font-bold text-brand-300 flex items-start">
                <HelpCircle size={18} className="mr-2 text-brand-400 shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed pl-6">
                {faq.a}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
