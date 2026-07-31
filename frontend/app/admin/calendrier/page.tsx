'use client';

import React, { useState, useEffect } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Plus, Edit, Trash2, RefreshCw, Check } from 'lucide-react';
import { getStoredToken } from '@/lib/auth';

type CalEvent = {
  id: string; title: string; date?: string; eventDate?: string;
  location: string; category: string; published?: boolean;
};

const DEMO: CalEvent[] = [
  { id: '1', title: 'Forum Agrobusiness & Innovation Verde', date: '2027-05-20', location: 'Sud-Kivu/Kavumu', category: 'AGRICULTURE' },
  { id: '2', title: 'Création de site web professionnel', date: '2027-05-20', location: 'Sud-Kivu/Kavumu', category: 'INFORMATIQUE' },
  { id: '3', title: 'Atelier Technique : Équipements & Maintenance', date: '2027-05-20', location: 'Sud-Kivu/Kavumu', category: 'TECHNIQUE' },
];

export default function AdminCalendrierPage() {
  const [events, setEvents] = useState<CalEvent[]>(DEMO);
  const [loading, setLoading] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editEvent, setEditEvent] = useState<CalEvent | null>(null);
  const [formData, setFormData] = useState({ title: '', date: '', location: 'Sud-Kivu/Kavumu', category: 'AGRICULTURE', description: '' });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const token = () => getStoredToken();
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/evenements`);
      if (res.ok) setEvents(await res.json());
    } catch { /* garde démo */ }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchEvents(); }, []);

  const getDate = (ev: CalEvent) => ev.date || (ev.eventDate ? ev.eventDate.slice(0, 10) : '—');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;
    setSaving(true);
    try {
      const res = await fetch(`${api}/evenements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
        body: JSON.stringify({ ...formData, eventDate: formData.date, description: formData.description || formData.title }),
      });
      if (res.ok) {
        const created = await res.json();
        setEvents(prev => [created, ...prev]);
      } else {
        setEvents(prev => [{ id: Date.now().toString(), ...formData }, ...prev]);
      }
      showToast('Événement créé.');
    } catch {
      setEvents(prev => [{ id: Date.now().toString(), ...formData }, ...prev]);
      showToast('Événement créé (démo).');
    }
    setSaving(false);
    setIsAddOpen(false);
    setFormData({ title: '', date: '', location: 'Sud-Kivu/Kavumu', category: 'AGRICULTURE', description: '' });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editEvent) return;
    setSaving(true);
    try {
      const res = await fetch(`${api}/evenements/${editEvent.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
        body: JSON.stringify({ ...formData, eventDate: formData.date }),
      });
      const updated = res.ok ? await res.json() : { ...editEvent, ...formData };
      setEvents(prev => prev.map(ev => ev.id === editEvent.id ? updated : ev));
      showToast('Événement mis à jour.');
    } catch {
      setEvents(prev => prev.map(ev => ev.id === editEvent.id ? { ...ev, ...formData } : ev));
      showToast('Événement mis à jour (démo).');
    }
    setSaving(false);
    setEditEvent(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet événement ?')) return;
    try {
      await fetch(`${api}/evenements/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token()}` } });
    } catch { /* silencieux */ }
    setEvents(prev => prev.filter(ev => ev.id !== id));
    showToast('Événement supprimé.');
  };

  const openEdit = (ev: CalEvent) => {
    setEditEvent(ev);
    setFormData({ title: ev.title, date: getDate(ev), location: ev.location, category: ev.category, description: '' });
  };

  const catBadge: Record<string, 'green' | 'gold' | 'blue' | 'gray'> = {
    AGRICULTURE: 'green', ELEVAGE: 'gold', INFORMATIQUE: 'blue', TECHNIQUE: 'gray',
  };

  const fields = (
    <>
      <Input label="Titre *" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Ex: Forum Agrobusiness..." />
      <Input label="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
      <Input label="Date *" type="date" required value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
      <Input label="Lieu *" required value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-300">Catégorie</label>
        <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-4 py-2.5 bg-navy-900 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-brand-500">
          {['AGRICULTURE', 'INFORMATIQUE', 'ELEVAGE', 'TECHNIQUE', 'GENERAL'].map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
    </>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Agenda &amp; Événements</h1>
          <p className="text-xs text-gray-400">Planification des salons, ateliers et conférences.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={fetchEvents} className="flex items-center gap-1.5">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Actualiser
          </Button>
          <Button size="sm" onClick={() => { setFormData({ title: '', date: '', location: 'Sud-Kivu/Kavumu', category: 'AGRICULTURE', description: '' }); setIsAddOpen(true); }}>
            <Plus size={16} className="mr-1" /> Ajouter un Événement
          </Button>
        </div>
      </div>

      {toast && <div className="p-3 rounded-xl bg-brand-950/60 border border-brand-700/50 text-brand-300 text-sm">{toast}</div>}

      <DataTable
        columns={[
          { header: "Titre", cell: (item: CalEvent) => <span className="font-semibold text-white">{item.title}</span> },
          { header: 'Date', cell: (item: CalEvent) => <span className="text-gray-300 text-xs">{getDate(item)}</span> },
          { header: 'Lieu', accessorKey: 'location' },
          { header: 'Catégorie', cell: (item: CalEvent) => <Badge variant={catBadge[item.category] ?? 'gray'}>{item.category}</Badge> },
          { header: 'Actions', cell: (item: CalEvent) => (
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={() => openEdit(item)} className="flex items-center gap-1">
                <Edit size={13} /> Éditer
              </Button>
              <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300" onClick={() => handleDelete(item.id)}>
                <Trash2 size={14} />
              </Button>
            </div>
          )},
        ]}
        data={events}
        keyExtractor={(item: CalEvent) => item.id}
      />

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Ajouter un Événement">
        <form onSubmit={handleCreate} className="space-y-4">
          {fields}
          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={saving} className="flex-1 justify-center">
              {saving ? 'Enregistrement...' : <><Check size={15} className="mr-1" /> Créer</>}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setIsAddOpen(false)}>Annuler</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!editEvent} onClose={() => setEditEvent(null)} title="Modifier l'Événement">
        <form onSubmit={handleUpdate} className="space-y-4">
          {fields}
          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={saving} className="flex-1 justify-center">
              {saving ? 'Enregistrement...' : <><Check size={15} className="mr-1" /> Sauvegarder</>}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setEditEvent(null)}>Annuler</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
