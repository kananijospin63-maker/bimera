'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { UploadCloud, Image as ImageIcon, Trash2, Copy, Check, RefreshCw } from 'lucide-react';
import { getStoredToken } from '@/lib/auth';

type Media = { id: string; filename: string; size: string | number; url: string; category: string; mimeType?: string; };

const DEMO: Media[] = [
  { id: '1', filename: 'irrigation_ferme_1.jpg', size: '2.4 MB', url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854', category: 'AGRICULTURE' },
  { id: '2', filename: 'complexe_avicole_2.jpg', size: '1.8 MB', url: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a', category: 'ELEVAGE' },
  { id: '3', filename: 'site_web_bureautique.png', size: '3.1 MB', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31', category: 'INFORMATIQUE' },
];

export default function AdminMediasPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [medias, setMedias] = useState<Media[]>(DEMO);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const token = () => getStoredToken();
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchMedias = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/medias`, { headers: { Authorization: `Bearer ${token()}` } });
      if (res.ok) setMedias(await res.json());
    } catch { /* garde démo */ }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchMedias(); }, []);

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      // En prod, utiliser Supabase Storage ou Uploadthing ici
      // Pour l'instant, on enregistre les métadonnées via l'API
      const res = await fetch(`${api}/medias`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
        body: JSON.stringify({
          filename: file.name,
          url: URL.createObjectURL(file),
          mimeType: file.type,
          size: Math.round(file.size / 1024),
          category: file.type.startsWith('image/') ? 'GENERAL' : 'DOCUMENT',
        }),
      });
      if (res.ok) {
        const created = await res.json();
        setMedias([created, ...medias]);
      } else {
        // Démo locale
        setMedias([{
          id: Date.now().toString(),
          filename: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          url: URL.createObjectURL(file),
          category: file.type.startsWith('image/') ? 'IMAGE' : 'DOCUMENT',
        }, ...medias]);
      }
      showToast(`${file.name} téléversé avec succès.`);
    } catch {
      setMedias([{
        id: Date.now().toString(),
        filename: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        url: URL.createObjectURL(file),
        category: 'GENERAL',
      }, ...medias]);
      showToast(`${file.name} ajouté (démo).`);
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce fichier ?')) return;
    try {
      await fetch(`${api}/medias/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token()}` } });
    } catch { /* silencieux */ }
    setMedias(medias.filter(m => m.id !== id));
    showToast('Fichier supprimé.');
  };

  const catBadge: Record<string, 'green' | 'gold' | 'blue' | 'gray'> = {
    AGRICULTURE: 'green', ELEVAGE: 'gold', INFORMATIQUE: 'blue',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Gestionnaire de Médias</h1>
          <p className="text-xs text-gray-400">Images, documents et fichiers de la plateforme.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={fetchMedias} className="flex items-center gap-1.5">
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Actualiser
        </Button>
      </div>

      {toast && <div className="p-3 rounded-xl bg-brand-950/60 border border-brand-700/50 text-brand-300 text-sm">{toast}</div>}

      {/* Zone upload */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="glass-panel border-2 border-dashed border-brand-500/40 rounded-2xl p-8 text-center space-y-3 cursor-pointer hover:border-brand-500 transition-colors"
      >
        <input ref={fileInputRef} type="file" className="hidden" accept="image/*,.pdf,.doc,.docx"
          onChange={handleFileChange} />
        <UploadCloud size={40} className={`text-brand-400 mx-auto ${uploading ? 'animate-bounce' : ''}`} />
        <h3 className="text-lg font-bold text-white">Glissez-déposez vos fichiers ici</h3>
        <p className="text-xs text-gray-400">Formats acceptés : JPG, PNG, WEBP, PDF, DOC (max 16MB)</p>
        <Button size="sm" disabled={uploading} onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}>
          {uploading ? 'Téléversement...' : 'Parcourir les fichiers'}
        </Button>
      </div>

      {/* Grille médias */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {medias.map((med) => (
          <Card key={med.id} className="space-y-3">
            <div className="h-40 rounded-lg bg-navy-900 border border-gray-800 flex items-center justify-center relative overflow-hidden">
              {med.url && (med.url.startsWith('blob:') || med.url.includes('unsplash') || med.url.match(/\.(jpg|jpeg|png|webp|gif)(\?|$)/i)) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={med.url} alt={med.filename} className="w-full h-full object-cover" />
              ) : (
                <ImageIcon size={32} className="text-brand-400" />
              )}
              <Badge variant={catBadge[med.category] ?? 'gray'} className="absolute top-2 left-2">{med.category}</Badge>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm truncate">{med.filename}</h4>
              <p className="text-xs text-gray-400">{typeof med.size === 'number' ? `${med.size} KB` : med.size}</p>
            </div>
            <div className="flex items-center space-x-2 pt-2 border-t border-gray-800">
              <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={() => handleCopy(med.id, med.url)}>
                {copiedId === med.id ? <Check size={14} className="mr-1" /> : <Copy size={14} className="mr-1" />}
                {copiedId === med.id ? 'Copié !' : "Copier l'URL"}
              </Button>
              <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300" onClick={() => handleDelete(med.id)}>
                <Trash2 size={14} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
