'use client';

import React, { useState } from 'react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Calendar, MapPin, Clock, ArrowRight, X, CheckCircle2 } from 'lucide-react';

export default function EvenementsPage() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '+257 79490806' });
  const [submitted, setSubmitted] = useState(false);

  const events = [
    {
      id: '1',
      title: 'Forum Agrobusiness & Innovation Verde',
      date: '20 Mai 2027',
      time: '10:00 - 16:30',
      location: 'Sud-Kivu/Kavumu',
      category: 'AGRICULTURE',
      desc: 'Grand rassemblement des acteurs agricoles et partenaires du secteur agro-alimentaire.',
    },
    {
      id: '2',
      title: 'Création de site web professionnel',
      date: '20 Mai 2027',
      time: '10:00 - 16:30',
      location: 'Sud-Kivu/Kavumu',
      category: 'INFORMATIQUE',
      desc: 'Session pratique et présentation sur la création de sites web professionnels et la présence en ligne.',
    },
    {
      id: '3',
      title: 'Atelier Technique : Équipements & Maintenance',
      date: '20 Mai 2027',
      time: '10:00 - 16:30',
      location: 'Sud-Kivu/Kavumu',
      category: 'TECHNIQUE',
      desc: 'Démonstrations de maintenance et présentation des équipements informatiques et agricoles.',
    },
  ];

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setSubmitted(false);
    setFormData({ name: '', email: '', phone: '+257 79490806' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Médias', href: '#' }, { label: 'Événements' }]} />

      <div className="my-8 space-y-3 text-center max-w-2xl mx-auto">
        <Badge variant="blue">Agenda Officiel</Badge>
        <h1 className="text-4xl font-black text-white">Calendrier des Événements</h1>
        <p className="text-gray-300 text-sm">
          Retrouvez les salons, ateliers, conférences et journées portes ouvertes organisés par Bimera Group.
        </p>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto my-12">
        {events.map((evt) => (
          <Card key={evt.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-l-4 border-l-gold-500">
            <div className="space-y-2">
              <Badge variant="gold">{evt.category}</Badge>
              <h3 className="text-xl font-bold text-white">{evt.title}</h3>
              <p className="text-xs text-gray-300">{evt.desc}</p>
              <div className="flex flex-wrap gap-4 text-xs text-gray-400 pt-2">
                <span className="flex items-center">
                  <Calendar size={14} className="mr-1 text-gold-400" />
                  {evt.date}
                </span>
                <span className="flex items-center">
                  <Clock size={14} className="mr-1 text-gold-400" />
                  {evt.time}
                </span>
                <span className="flex items-center">
                  <MapPin size={14} className="mr-1 text-gold-400" />
                  {evt.location}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedEvent(evt)}
              className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl shrink-0 transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              S’inscrire à l’événement
            </button>
          </Card>
        ))}
      </div>

      {/* Registration Interactive Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel max-w-md w-full p-6 sm:p-8 rounded-3xl border border-gray-800 relative space-y-5 animate-scale-in">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-navy-900 border border-gray-700"
            >
              <X size={18} />
            </button>

            {!submitted ? (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <Badge variant="gold">{selectedEvent.category}</Badge>
                <h3 className="text-2xl font-black text-white">Inscription à l'événement</h3>
                <p className="text-xs text-gold-400 font-bold">{selectedEvent.title}</p>
                <p className="text-xs text-gray-300">📅 {selectedEvent.date} ({selectedEvent.time}) — 📍 {selectedEvent.location}</p>

                <div className="space-y-3 pt-2">
                  <Input
                    label="Nom complet *"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Jean Mukendi"
                  />
                  <Input
                    label="Adresse Email *"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="kananijospin63@gmail.com"
                  />
                  <Input
                    label="Téléphone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full justify-center mt-2 font-bold">
                  Valider mon Inscription
                </Button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-black text-white">Inscription Confirmée !</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Merci <strong className="text-white">{formData.name}</strong>. Votre inscription pour <strong className="text-gold-400">{selectedEvent.title}</strong> a été enregistrée avec succès. Un e-mail de confirmation sera envoyé à {formData.email}.
                </p>
                <Button onClick={closeModal} variant="outline" className="w-full justify-center">
                  Fermer
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
