import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ContactForm } from '@/components/forms/ContactForm';
import { Card } from '@/components/ui/Card';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Contact' }]} />

      <div className="text-center max-w-3xl mx-auto my-8 space-y-3">
        <h1 className="text-4xl sm:text-5xl font-black text-white">Contactez Bimera Group</h1>
        <p className="text-gray-300 text-base">
          Nos équipes commerciales et techniques sont à votre disposition pour répondre à toutes vos questions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-12">
        {/* Left Info Column */}
        <div className="space-y-6">
          <Card className="space-y-4 border-l-4 border-l-brand-500">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-lg bg-brand-900/60 text-brand-400">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Siège Principal</h3>
                <p className="text-xs text-gray-300">Kavumu, Sud-Kivu — République Démocratique du Congo</p>
              </div>
            </div>
          </Card>

          <Card className="space-y-4 border-l-4 border-l-gold-500">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-lg bg-gold-900/60 text-gold-400">
                <Phone size={22} />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Téléphone & WhatsApp</h3>
                <p className="text-xs text-gray-300">+257 79490806</p>
              </div>
            </div>
          </Card>

          <Card className="space-y-4 border-l-4 border-l-blue-500">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-lg bg-blue-900/60 text-blue-400">
                <Mail size={22} />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Courriel Officiel</h3>
                <p className="text-xs text-gray-300">kananijospin63@gmail.com</p>
              </div>
            </div>
          </Card>

          {/* Map Placeholder */}
          <div className="glass-panel p-6 rounded-xl border border-gray-800 text-center space-y-3">
            <MapPin size={32} className="text-brand-500 mx-auto" />
            <h4 className="font-bold text-white text-sm">Carte Interactive (OpenStreetMap)</h4>
            <p className="text-xs text-gray-400">Kavumu, Sud-Kivu (RDC)</p>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
