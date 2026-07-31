'use client';

import React, { useState, useEffect } from 'react';
import { StatsCard } from '@/components/admin/StatsCard';
import { DataTable } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import {
  Users, Eye, Mail, FileText, Database, CalendarCheck,
  Trash2, UserCheck, Clock, MessageSquare, Bell, RefreshCw,
} from 'lucide-react';
import { getStoredToken } from '@/lib/auth';
import Link from 'next/link';

type Registration = {
  id: string; name: string; email: string; phone: string;
  event: string; eventCategory: string; registeredAt: string;
};

type ContactMsg = {
  id: string; name: string; email: string; phone?: string;
  subject: string; message: string; status: string; createdAt: string;
};

type Subscriber = {
  id: string; email: string; createdAt: string;
};

const INITIAL_REGISTRATIONS: Registration[] = [
  { id: '1', name: 'Jean-Pierre Mukendi', email: 'jp.mukendi@gmail.com', phone: '+243 81 234 5678', event: 'Forum Agrobusiness & Innovation Verde', eventCategory: 'AGRICULTURE', registeredAt: '2026-07-20 10:14' },
  { id: '2', name: 'Amina Bisimwa', email: 'amina.bisimwa@yahoo.fr', phone: '+257 79 112 233', event: 'Création de site web professionnel', eventCategory: 'INFORMATIQUE', registeredAt: '2026-07-21 08:45' },
  { id: '3', name: 'Patrick Tshisekedi', email: 'patrick.t@outlook.com', phone: '+243 97 456 7890', event: 'Forum Agrobusiness & Innovation Verde', eventCategory: 'AGRICULTURE', registeredAt: '2026-07-21 14:30' },
  { id: '4', name: 'Grace Zawadi', email: 'grace.zawadi@bimera.com', phone: '+257 70 987 6543', event: 'Atelier Technique : Équipements & Maintenance', eventCategory: 'TECHNIQUE', registeredAt: '2026-07-22 09:00' },
  { id: '5', name: 'Samuel Kabila', email: 'samuel.k@gmail.com', phone: '+243 89 321 0987', event: 'Création de site web professionnel', eventCategory: 'INFORMATIQUE', registeredAt: '2026-07-22 11:22' },
];

export default function AdminDashboardPage() {
  const [registrations, setRegistrations] = useState<Registration[]>(INITIAL_REGISTRATIONS);
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
  const [regFilter, setRegFilter] = useState('TOUS');
  const [contacts, setContacts] = useState<ContactMsg[]>([]);
  const [selectedContact, setSelectedContact] = useState<ContactMsg | null>(null);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [stats, setStats] = useState({ messages: 0, articles: 0, users: 0, pending: 0, subscribers: 0 });
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [loadingSubs, setLoadingSubs] = useState(false);

  const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const token = () => getStoredToken();
  const headers = () => ({ Authorization: `Bearer ${token()}` });

  const fetchAll = async () => {
    setLoadingContacts(true);
    setLoadingSubs(true);

    // Messages de contact
    try {
      const res = await fetch(`${api}/contact`, { headers: headers() });
      if (res.ok) {
        const data: ContactMsg[] = await res.json();
        setContacts(data);
        setStats(s => ({ ...s, messages: data.length }));
      }
    } catch { /* silencieux */ }
    finally { setLoadingContacts(false); }

    // Abonnés newsletter
    try {
      const res = await fetch(`${api}/newsletter`, { headers: headers() });
      if (res.ok) {
        const data: Subscriber[] = await res.json();
        setSubscribers(data);
        setStats(s => ({ ...s, subscribers: data.length }));
      }
    } catch { /* silencieux */ }
    finally { setLoadingSubs(false); }

    // Autres stats
    try {
      const [arts, usrs] = await Promise.allSettled([
        fetch(`${api}/articles`, { headers: headers() }).then(r => r.json()),
        fetch(`${api}/utilisateurs`, { headers: headers() }).then(r => r.json()),
      ]);
      const articles = arts.status === 'fulfilled' && Array.isArray(arts.value) ? arts.value.length : 0;
      const users = usrs.status === 'fulfilled' && Array.isArray(usrs.value) ? usrs.value.length : 0;
      const pending = usrs.status === 'fulfilled' && Array.isArray(usrs.value)
        ? usrs.value.filter((u: any) => u.status === 'PENDING').length : 0;
      setStats(s => ({ ...s, articles, users, pending }));
    } catch { /* silencieux */ }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleDeleteContact = async (id: string) => {
    if (!confirm('Supprimer ce message ?')) return;
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const handleMarkRead = async (id: string) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, status: 'READ' } : c));
    try {
      await fetch(`${api}/contact/${id}/read`, { method: 'PATCH', headers: headers() });
    } catch { /* silencieux */ }
  };

  const handleDeleteSub = async (id: string) => {
    if (!confirm('Supprimer cet abonné ?')) return;
    try {
      await fetch(`${api}/newsletter/${id}`, { method: 'DELETE', headers: headers() });
    } catch { /* silencieux */ }
    setSubscribers(prev => prev.filter(s => s.id !== id));
  };

  const handleDeleteReg = (id: string) => {
    if (confirm('Retirer cette inscription ?')) {
      setRegistrations(prev => prev.filter(r => r.id !== id));
    }
  };

  const CATEGORIES = ['TOUS', 'AGRICULTURE', 'INFORMATIQUE', 'TECHNIQUE', 'ELEVAGE'];
  const filteredRegs = regFilter === 'TOUS' ? registrations : registrations.filter(r => r.eventCategory === regFilter);
  const categoryBadge: Record<string, 'green' | 'gold' | 'blue' | 'gray'> = {
    AGRICULTURE: 'green', INFORMATIQUE: 'blue', TECHNIQUE: 'gold', ELEVAGE: 'gray',
  };
  const unreadCount = contacts.filter(c => c.status === 'PENDING').length;

  const auditLogs = [
    { id: '1', action: 'Mise à jour page Accueil', user: 'Marc Bimera', date: '2026-07-22 18:45', status: 'SUCCESS' },
    { id: '2', action: 'Publication article Irrigation', user: 'Sarah Kabila', date: '2026-07-21 14:10', status: 'SUCCESS' },
    { id: '3', action: 'Téléversement brochure_2026.pdf', user: 'Patrick Tshisekedi', date: '2026-07-20 09:30', status: 'SUCCESS' },
    { id: '4', action: 'Modification rôle utilisateur #42', user: 'Marc Bimera', date: '2026-07-19 16:22', status: 'SUCCESS' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Tableau de Bord</h1>
          <p className="text-xs text-gray-400">Aperçu général de la plateforme.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={fetchAll} className="flex items-center gap-1.5">
          <RefreshCw size={14} /> Actualiser
        </Button>
      </div>

      {/* Alerte comptes en attente */}
      {stats.pending > 0 && (
        <Link href="/admin/utilisateurs" className="no-underline">
          <div className="flex items-center justify-between p-4 rounded-xl bg-gold-500/10 border border-gold-500/30 hover:bg-gold-500/20 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-gold-400" />
              <div>
                <p className="text-sm font-bold text-gold-400">{stats.pending} compte{stats.pending > 1 ? 's' : ''} en attente d&apos;approbation</p>
                <p className="text-xs text-gray-400">Cliquez pour gérer les inscriptions</p>
              </div>
            </div>
            <span className="text-xs text-gold-400 font-bold">Voir →</span>
          </div>
        </Link>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Visites ce mois" value="24,500" change="+14.2% vs mois dernier" icon={Eye} color="text-brand-400" />
        <StatsCard title="Messages Contact" value={String(contacts.length || stats.messages || 0)} change={unreadCount > 0 ? `${unreadCount} non lus` : 'Tous lus'} icon={Mail} color="text-gold-400" />
        <StatsCard title="Abonnés Newsletter" value={String(subscribers.length || stats.subscribers || 0)} change="Abonnements actifs" icon={Bell} color="text-blue-400" />
        <StatsCard title="Utilisateurs" value={String(stats.users || 0)} change={stats.pending > 0 ? `${stats.pending} en attente` : 'Tous approuvés'} icon={Users} color="text-emerald-400" />
      </div>

      {/* ── Messages de Contact ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <MessageSquare size={20} className="text-gold-400" />
            Messages de Contact
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-400 text-xs font-bold border border-gold-500/30">
                {unreadCount} non lus
              </span>
            )}
          </h3>
          <Button variant="ghost" size="sm" onClick={fetchAll}>
            <RefreshCw size={13} className={loadingContacts ? 'animate-spin' : ''} />
          </Button>
        </div>

        {contacts.length === 0 && !loadingContacts ? (
          <div className="glass-panel rounded-xl border border-gray-800 p-8 text-center text-gray-400 text-sm">
            Aucun message de contact reçu.
          </div>
        ) : (
          <DataTable
            columns={[
              { header: 'Expéditeur', cell: (item: ContactMsg) => (
                <div>
                  <p className="text-sm font-bold text-white">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.email}</p>
                </div>
              )},
              { header: 'Sujet', cell: (item: ContactMsg) => (
                <span className={`text-sm ${item.status === 'PENDING' ? 'font-bold text-white' : 'text-gray-300'}`}>{item.subject}</span>
              )},
              { header: 'Statut', cell: (item: ContactMsg) => (
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${
                  item.status === 'PENDING' ? 'bg-gold-500/20 text-gold-400 border-gold-500/30' :
                  item.status === 'READ' ? 'bg-brand-500/20 text-brand-400 border-brand-500/30' :
                  'bg-gray-700/50 text-gray-400 border-gray-600/30'
                }`}>
                  {item.status === 'PENDING' ? 'Non lu' : item.status === 'READ' ? 'Lu' : 'Répondu'}
                </span>
              )},
              { header: 'Date', cell: (item: ContactMsg) => (
                <span className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleDateString('fr-FR')}</span>
              )},
              { header: 'Actions', cell: (item: ContactMsg) => (
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => { setSelectedContact(item); handleMarkRead(item.id); }}>
                    Voir
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300" onClick={() => handleDeleteContact(item.id)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              )},
            ]}
            data={contacts}
            keyExtractor={(item: ContactMsg) => item.id}
          />
        )}
      </div>

      {/* ── Abonnés Newsletter ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Bell size={20} className="text-blue-400" />
            Abonnés Newsletter
            <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30">
              {subscribers.length}
            </span>
          </h3>
          <Button variant="ghost" size="sm" onClick={fetchAll}>
            <RefreshCw size={13} className={loadingSubs ? 'animate-spin' : ''} />
          </Button>
        </div>

        {subscribers.length === 0 && !loadingSubs ? (
          <div className="glass-panel rounded-xl border border-gray-800 p-8 text-center text-gray-400 text-sm">
            Aucun abonné pour l&apos;instant.
          </div>
        ) : (
          <DataTable
            columns={[
              { header: 'Email', cell: (item: Subscriber) => (
                <span className="text-sm font-medium text-white">{item.email}</span>
              )},
              { header: "Date d'abonnement", cell: (item: Subscriber) => (
                <span className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleDateString('fr-FR')}</span>
              )},
              { header: 'Actions', cell: (item: Subscriber) => (
                <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300" onClick={() => handleDeleteSub(item.id)}>
                  <Trash2 size={14} />
                </Button>
              )},
            ]}
            data={subscribers}
            keyExtractor={(item: Subscriber) => item.id}
          />
        )}
      </div>

      {/* ── Inscriptions Événements ── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-xl font-bold text-white flex items-center">
            <UserCheck size={20} className="mr-2 text-emerald-400" />
            Inscriptions aux Événements
            <span className="ml-3 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              {registrations.length}
            </span>
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setRegFilter(cat)}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                  regFilter === cat ? 'bg-brand-600 border-brand-500 text-white' : 'bg-navy-900 border-gray-700 text-gray-400 hover:border-gray-500'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <DataTable
          columns={[
            { header: 'Participant', cell: (item: Registration) => (
              <div><p className="text-sm font-bold text-white">{item.name}</p><p className="text-xs text-gray-400">{item.email}</p></div>
            )},
            { header: 'Téléphone', accessorKey: 'phone' },
            { header: 'Événement', cell: (item: Registration) => (
              <div className="space-y-1">
                <p className="text-xs font-semibold text-white truncate max-w-xs">{item.event}</p>
                <Badge variant={categoryBadge[item.eventCategory] ?? 'gray'}>{item.eventCategory}</Badge>
              </div>
            )},
            { header: "Date d'inscription", accessorKey: 'registeredAt' },
            { header: 'Actions', cell: (item: Registration) => (
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" onClick={() => setSelectedReg(item)}>Détails</Button>
                <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300" onClick={() => handleDeleteReg(item.id)}>
                  <Trash2 size={14} />
                </Button>
              </div>
            )},
          ]}
          data={filteredRegs}
          keyExtractor={(item: Registration) => item.id}
        />
      </div>

      {/* ── Audit Log ── */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center">
          <Database size={20} className="mr-2 text-brand-400" />
          Journal des Dernières Actions
        </h3>
        <DataTable
          columns={[
            { header: 'Action', accessorKey: 'action' },
            { header: 'Utilisateur', accessorKey: 'user' },
            { header: 'Date & Heure', accessorKey: 'date' },
            { header: 'Statut', cell: (item) => <Badge variant={item.status === 'SUCCESS' ? 'green' : 'gray'}>{item.status}</Badge> },
          ]}
          data={auditLogs}
          keyExtractor={(item) => item.id}
        />
      </div>

      {/* Modal détail inscription */}
      <Modal isOpen={!!selectedReg} onClose={() => setSelectedReg(null)} title="Détails de l'Inscription">
        {selectedReg && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-navy-900 rounded-xl border border-gray-800">
              <div className="w-12 h-12 rounded-full bg-brand-700 flex items-center justify-center text-white font-black text-lg">
                {selectedReg.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-white">{selectedReg.name}</p>
                <p className="text-xs text-gray-400">{selectedReg.email}</p>
                <p className="text-xs text-gray-400">{selectedReg.phone}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">Événement</span>
                <span className="text-white font-semibold text-right max-w-xs">{selectedReg.event}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">Catégorie</span>
                <Badge variant={categoryBadge[selectedReg.eventCategory] ?? 'gray'}>{selectedReg.eventCategory}</Badge>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-400">Inscrit le</span>
                <span className="text-white">{selectedReg.registeredAt}</span>
              </div>
            </div>
            <Button variant="ghost" className="w-full justify-center text-red-400 hover:text-red-300"
              onClick={() => { handleDeleteReg(selectedReg.id); setSelectedReg(null); }}>
              <Trash2 size={14} className="mr-1" /> Retirer cette inscription
            </Button>
          </div>
        )}
      </Modal>

      {/* Modal détail message contact */}
      <Modal isOpen={!!selectedContact} onClose={() => setSelectedContact(null)} title="Message de Contact">
        {selectedContact && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-navy-900 rounded-xl border border-gray-800">
              <div className="w-12 h-12 rounded-full bg-gold-700 flex items-center justify-center text-white font-black text-lg">
                {selectedContact.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-white">{selectedContact.name}</p>
                <p className="text-xs text-gray-400">{selectedContact.email}</p>
                {selectedContact.phone && <p className="text-xs text-gray-400">{selectedContact.phone}</p>}
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="py-2 border-b border-gray-800">
                <p className="text-gray-400 text-xs mb-1">Sujet</p>
                <p className="text-white font-semibold">{selectedContact.subject}</p>
              </div>
              <div className="py-2 border-b border-gray-800">
                <p className="text-gray-400 text-xs mb-1">Message</p>
                <p className="text-gray-200 leading-relaxed">{selectedContact.message}</p>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-400">Reçu le</span>
                <span className="text-white">{new Date(selectedContact.createdAt).toLocaleString('fr-FR')}</span>
              </div>
            </div>
            <a href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
              className="block w-full text-center px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold transition-colors">
              Répondre par email
            </a>
          </div>
        )}
      </Modal>
    </div>
  );
}
