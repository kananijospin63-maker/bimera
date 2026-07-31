'use client';

import React, { useState, useEffect } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Newspaper, Plus, Trash2, Edit, Check, RefreshCw } from 'lucide-react';
import { getStoredToken } from '@/lib/auth';

type Article = {
  id: string; title: string; category: string;
  published: boolean; date?: string; createdAt?: string;
};

const DEMO: Article[] = [
  { id: '1', title: "Modernisation des infrastructures d'irrigation", category: 'AGRICULTURE', published: true, date: '2026-06-15' },
  { id: '2', title: 'Création de site web professionnel & Bureautique', category: 'INFORMATIQUE', published: true, date: '2026-05-28' },
  { id: '3', title: 'Extension du complexe avicole', category: 'ELEVAGE', published: true, date: '2026-04-10' },
];

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>(DEMO);
  const [loading, setLoading] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editArticle, setEditArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState({ title: '', summary: '', category: 'AGRICULTURE', published: true });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const token = () => getStoredToken();

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/articles?published=false`, { headers: { Authorization: `Bearer ${token()}` } });
      if (res.ok) setArticles(await res.json());
    } catch { /* garde les données démo */ }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchArticles(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;
    setSaving(true);
    try {
      const res = await fetch(`${api}/articles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
        body: JSON.stringify({ ...formData, content: formData.summary || formData.title }),
      });
      if (res.ok) {
        const created = await res.json();
        setArticles([created, ...articles]);
        showToast('Article créé avec succès.');
      } else {
        // Démo
        setArticles([{ id: Date.now().toString(), ...formData, date: new Date().toISOString().split('T')[0] }, ...articles]);
        showToast('Article créé (démo).');
      }
    } catch {
      setArticles([{ id: Date.now().toString(), ...formData, date: new Date().toISOString().split('T')[0] }, ...articles]);
      showToast('Article créé (démo).');
    }
    setSaving(false);
    setIsAddOpen(false);
    setFormData({ title: '', summary: '', category: 'AGRICULTURE', published: true });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editArticle) return;
    setSaving(true);
    try {
      const res = await fetch(`${api}/articles/${editArticle.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
        body: JSON.stringify(formData),
      });
      const updated = res.ok ? await res.json() : { ...editArticle, ...formData };
      setArticles(articles.map(a => a.id === editArticle.id ? updated : a));
      showToast('Article mis à jour.');
    } catch {
      setArticles(articles.map(a => a.id === editArticle.id ? { ...a, ...formData } : a));
      showToast('Article mis à jour (démo).');
    }
    setSaving(false);
    setEditArticle(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet article ?')) return;
    try {
      await fetch(`${api}/articles/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token()}` } });
    } catch { /* silencieux */ }
    setArticles(articles.filter(a => a.id !== id));
    showToast('Article supprimé.');
  };

  const openEdit = (art: Article) => {
    setEditArticle(art);
    setFormData({ title: art.title, summary: '', category: art.category, published: art.published });
  };

  const catBadge: Record<string, 'green' | 'gold' | 'blue' | 'gray'> = {
    AGRICULTURE: 'green', ELEVAGE: 'gold', INFORMATIQUE: 'blue', TECHNIQUE: 'gray', GENERAL: 'gray',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Articles &amp; Blog</h1>
          <p className="text-xs text-gray-400">Gérez les articles publiés sur le site.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={fetchArticles} className="flex items-center gap-1.5">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Actualiser
          </Button>
          <Button size="sm" onClick={() => setIsAddOpen(true)} className="flex items-center gap-1.5">
            <Plus size={16} /> Rédiger un Article
          </Button>
        </div>
      </div>

      {toast && <div className="p-3 rounded-xl bg-brand-950/60 border border-brand-700/50 text-brand-300 text-sm">{toast}</div>}

      <DataTable
        columns={[
          { header: 'Titre', cell: (a: Article) => <span className="font-semibold text-white">{a.title}</span> },
          { header: 'Catégorie', cell: (a: Article) => <Badge variant={catBadge[a.category] ?? 'gray'}>{a.category}</Badge> },
          { header: 'Statut', cell: (a: Article) => (
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${a.published ? 'bg-brand-500/20 text-brand-400 border-brand-500/30' : 'bg-gray-700/50 text-gray-400 border-gray-600/30'}`}>
              {a.published ? 'Publié' : 'Brouillon'}
            </span>
          )},
          { header: 'Date', cell: (a: Article) => <span className="text-gray-400 text-xs">{a.date || (a.createdAt ? a.createdAt.slice(0, 10) : '—')}</span> },
          { header: 'Actions', cell: (a: Article) => (
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => openEdit(a)} className="flex items-center gap-1">
                <Edit size={13} /> Éditer
              </Button>
              <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300" onClick={() => handleDelete(a.id)}>
                <Trash2 size={14} />
              </Button>
            </div>
          )},
        ]}
        data={articles}
        keyExtractor={(a: Article) => a.id}
      />

      {/* Modal création */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Rédiger un Article">
        <form onSubmit={handleCreate} className="space-y-4">
          <Input label="Titre *" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
          <Input label="Résumé" value={formData.summary} onChange={e => setFormData({ ...formData, summary: e.target.value })} />
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Catégorie</label>
            <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-gray-700 text-gray-200 text-sm focus:outline-none focus:border-brand-500">
              {['AGRICULTURE', 'ELEVAGE', 'INFORMATIQUE', 'TECHNIQUE', 'GENERAL'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={formData.published} onChange={e => setFormData({ ...formData, published: e.target.checked })} className="w-4 h-4 rounded" />
            <span className="text-sm text-gray-300">Publier immédiatement</span>
          </label>
          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={saving} className="flex-1 justify-center">
              {saving ? 'Enregistrement...' : <><Check size={15} className="mr-1" /> Créer l&apos;article</>}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setIsAddOpen(false)}>Annuler</Button>
          </div>
        </form>
      </Modal>

      {/* Modal édition */}
      <Modal isOpen={!!editArticle} onClose={() => setEditArticle(null)} title="Modifier l'Article">
        <form onSubmit={handleUpdate} className="space-y-4">
          <Input label="Titre *" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Catégorie</label>
            <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-gray-700 text-gray-200 text-sm focus:outline-none focus:border-brand-500">
              {['AGRICULTURE', 'ELEVAGE', 'INFORMATIQUE', 'TECHNIQUE', 'GENERAL'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={formData.published} onChange={e => setFormData({ ...formData, published: e.target.checked })} className="w-4 h-4 rounded" />
            <span className="text-sm text-gray-300">Publié</span>
          </label>
          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={saving} className="flex-1 justify-center">
              {saving ? 'Enregistrement...' : <><Check size={15} className="mr-1" /> Sauvegarder</>}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setEditArticle(null)}>Annuler</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
