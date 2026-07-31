'use client';

import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const EventsCarousel: React.FC = () => {
  const [filter, setFilter] = useState<string>('ALL');

  const events = [
    {
      id: '1',
      title: 'Forum Agrobusiness & Innovation Verde',
      date: '20 Mai 2027',
      time: '10:00 - 16:30',
      location: 'Sud-Kivu/Kavumu',
      category: 'AGRICULTURE',
      badgeColor: 'green' as const,
    },
    {
      id: '2',
      title: 'Création de site web professionnel',
      date: '20 Mai 2027',
      time: '10:00 - 16:30',
      location: 'Sud-Kivu/Kavumu',
      category: 'INFORMATIQUE',
      badgeColor: 'blue' as const,
    },
    {
      id: '3',
      title: 'Atelier Technique : Équipements & Maintenance',
      date: '20 Mai 2027',
      time: '10:00 - 16:30',
      location: 'Sud-Kivu/Kavumu',
      category: 'TECHNIQUE',
      badgeColor: 'gold' as const,
    },
  ];

  const filteredEvents = filter === 'ALL' ? events : events.filter((e) => e.category === filter);

  return (
    <section className="py-16 bg-navy-900/60 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <Badge variant="blue" className="mb-2">Agenda Officiel</Badge>
            <h2 className="text-3xl font-black text-white">Événements à Venir</h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            {['ALL', 'AGRICULTURE', 'INFORMATIQUE', 'TECHNIQUE'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  filter === cat
                    ? 'bg-brand-600 text-white'
                    : 'bg-navy-900 text-gray-400 hover:text-white border border-gray-800'
                }`}
              >
                {cat === 'ALL' ? 'Tous' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <Card key={evt.id} className="glass-card-hover border-l-4 border-l-gold-500 p-6 rounded-2xl flex flex-col justify-between">
              <div className="space-y-3">
                <Badge variant={evt.badgeColor}>{evt.category}</Badge>
                <h3 className="text-lg font-bold text-white leading-snug">{evt.title}</h3>

                <div className="space-y-2 text-xs text-gray-300 pt-2 border-t border-gray-800/80">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-2 text-gold-400 shrink-0" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-2 text-gold-400 shrink-0" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-2 text-gold-400 shrink-0" />
                    <span>{evt.location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-800/60">
                <Link
                  href="/medias-actualites/evenements"
                  className="text-xs font-bold text-brand-400 hover:underline flex items-center justify-between"
                >
                  <span>S’inscrire</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
