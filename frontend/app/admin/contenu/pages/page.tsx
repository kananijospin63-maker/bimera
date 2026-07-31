'use client';

import React, { useState } from 'react';
import { BlockEditor } from '@/components/ui/BlockEditor';
import { DataTable } from '@/components/admin/DataTable';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { FileText, Edit, Plus, Check } from 'lucide-react';

export default function AdminPagesCMS() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newPageData, setNewPageData] = useState({ title: '', slug: '' });

  const [pages, setPages] = useState([
    { id: '1', slug: 'accueil', title: 'Page d’accueil', blocksCount: 6, updatedAt: '2026-07-22' },
    { id: '2', slug: 'a-propos', title: 'À propos de bimera', blocksCount: 4, updatedAt: '2026-07-20' },
    { id: '3', slug: 'activites-agriculture', title: 'Pôle Agriculture', blocksCount: 5, updatedAt: '2026-07-18' },
    { id: '4', slug: 'activites-elevage', title: 'Pôle Élevage', blocksCount: 4, updatedAt: '2026-07-15' },
    { id: '5', slug: 'activites-informatique', title: 'Pôle Informatique', blocksCount: 3, updatedAt: '2026-07-23' },
  ]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCreatePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPageData.title || !newPageData.slug) return;
    const newP = {
      id: Date.now().toString(),
      title: newPageData.title,
      slug: newPageData.slug.toLowerCase().replace(/\s+/g, '-'),
      blocksCount: 1,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setPages([...pages, newP]);
    setIsAddOpen(false);
    setNewPageData({ title: '', slug: '' });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Gestion du Contenu des Pages (CMS)</h1>
          <p className="text-xs text-gray-400">Éditeur modulaire basé sur des blocs réorganisables.</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setIsAddOpen(true)}>
          <Plus size={16} className="mr-1" /> Créer une Nouvelle Page
        </Button>
      </div>

      {!selectedSlug ? (
        <DataTable
          columns={[
            { header: 'Titre de la Page', accessorKey: 'title' },
            { header: 'Slug URL', accessorKey: 'slug' },
            { header: 'Nombre de Blocs', accessorKey: 'blocksCount' },
            { header: 'Dernière Modification', accessorKey: 'updatedAt' },
            {
              header: 'Actions',
              cell: (item) => (
                <Button size="sm" variant="outline" onClick={() => setSelectedSlug(item.slug)}>
                  <Edit size={14} className="mr-1" /> Éditer par blocs
                </Button>
              ),
            },
          ]}
          data={pages}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-navy-900 p-4 rounded-xl border border-gray-800">
            <div>
              <span className="text-xs text-brand-400 font-bold uppercase">Édition de page</span>
              <h3 className="text-xl font-bold text-white">Slug: /{selectedSlug}</h3>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={() => setSelectedSlug(null)}>
                Fermer sans sauvegarder
              </Button>
              <Button variant="primary" size="sm" onClick={handleSave}>
                {saved ? (
                  <>
                    <Check size={16} className="mr-1" /> Enregistré !
                  </>
                ) : (
                  'Enregistrer les modifications'
                )}
              </Button>
            </div>
          </div>

          <BlockEditor />
        </div>
      )}

      {/* Modal Créer une Page */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Créer une Nouvelle Page CMS">
        <form onSubmit={handleCreatePage} className="space-y-4">
          <Input
            label="Titre de la Page *"
            required
            value={newPageData.title}
            onChange={(e) => setNewPageData({ ...newPageData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
            placeholder="Ex: Mes Services..."
          />
          <Input
            label="Slug URL *"
            required
            value={newPageData.slug}
            onChange={(e) => setNewPageData({ ...newPageData, slug: e.target.value })}
            placeholder="ex: mes-services"
          />
          <Button type="submit" variant="primary" className="w-full justify-center">
            Créer et Ouvrir dans l'Éditeur
          </Button>
        </form>
      </Modal>
    </div>
  );
}
