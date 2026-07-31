'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { KeyRound, FileText, Check, Upload, Trash2, ShieldCheck, Lock } from 'lucide-react';

type SecureFile = {
  id: string;
  name: string;
  category: string;
  uploadedAt: string;
  restricted: boolean;
};

export default function AdminPortailAccesPage() {
  const [twoFAEnabled, setTwoFAEnabled] = useState(true);
  const [twoFASaved, setTwoFASaved] = useState(false);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFileCategory, setNewFileCategory] = useState('MEMBER');

  const [secureFiles, setSecureFiles] = useState<SecureFile[]>([
    { id: '1', name: 'rapport_financier_Q1_2026.pdf', category: 'ADMIN', uploadedAt: '2026-07-10', restricted: true },
    { id: '2', name: 'contrat_partenariat_agri.pdf', category: 'MEMBER', uploadedAt: '2026-06-22', restricted: true },
    { id: '3', name: 'guide_formation_bureautique.pdf', category: 'MEMBER', uploadedAt: '2026-05-15', restricted: false },
  ]);

  const handle2FASave = () => {
    setTwoFASaved(true);
    setTimeout(() => setTwoFASaved(false), 2000);
  };

  const handleAddFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName) return;
    const f: SecureFile = {
      id: Date.now().toString(),
      name: newFileName,
      category: newFileCategory,
      uploadedAt: new Date().toISOString().slice(0, 10),
      restricted: true,
    };
    setSecureFiles([f, ...secureFiles]);
    setIsFileModalOpen(false);
    setNewFileName('');
    setNewFileCategory('MEMBER');
  };

  const handleDeleteFile = (id: string) => {
    if (confirm('Supprimer ce fichier confidentiel ?')) {
      setSecureFiles(secureFiles.filter(f => f.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">Gestion des Accès au Portail Membre</h1>
        <p className="text-xs text-gray-400">Règles de confidentialité et autorisations des documents réservés.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="space-y-4">
          <div className="flex items-center space-x-3">
            <KeyRound size={24} className="text-gold-400" />
            <h3 className="text-lg font-bold text-white">Authentification Obligatoire 2FA</h3>
          </div>
          <p className="text-xs text-gray-300">
            Exiger la validation 2FA pour tous les comptes ayant accès aux rapports financiers du portail.
          </p>
          <div className="flex items-center justify-between p-3 bg-navy-900 rounded-xl border border-gray-800">
            <span className="text-sm text-gray-300">2FA obligatoire pour ADMIN et MEMBER</span>
            <button
              onClick={() => setTwoFAEnabled(!twoFAEnabled)}
              className={"relative inline-flex h-6 w-11 items-center rounded-full transition-colors " + (twoFAEnabled ? 'bg-brand-500' : 'bg-gray-700')}
            >
              <span className={"inline-block h-4 w-4 transform rounded-full bg-white transition-transform " + (twoFAEnabled ? 'translate-x-6' : 'translate-x-1')} />
            </button>
          </div>
          <Badge variant={twoFAEnabled ? 'green' : 'gray'}>
            {twoFAEnabled ? 'Activé — 2FA obligatoire' : 'Désactivé — accès simplifié'}
          </Badge>
          <Button variant="primary" size="sm" onClick={handle2FASave}>
            {twoFASaved ? (<><Check size={14} className="mr-1" /> Règle sauvegardée !</>) : (<><ShieldCheck size={14} className="mr-1" /> Configurer les règles 2FA</>)}
          </Button>
        </Card>

        <Card className="space-y-4">
          <div className="flex items-center space-x-3">
            <FileText size={24} className="text-brand-400" />
            <h3 className="text-lg font-bold text-white">Gestion des Fichiers Confidentiels</h3>
          </div>
          <p className="text-xs text-gray-300">
            Téléverser et attribuer des documents spécifiques aux catégories de membres.
          </p>
          <div className="flex items-center justify-between p-3 bg-navy-900 rounded-xl border border-gray-800">
            <span className="text-sm text-gray-300">Fichiers sécurisés dans la bibliothèque</span>
            <span className="text-xl font-black text-white">{secureFiles.length}</span>
          </div>
          <Button variant="primary" size="sm" onClick={() => setIsFileModalOpen(true)}>
            <Upload size={14} className="mr-1" /> Gérer la bibliothèque sécurisée
          </Button>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Lock size={18} className="mr-2 text-brand-400" />
          Bibliothèque de Documents Confidentiels
        </h2>
        <div className="space-y-3">
          {secureFiles.map((f) => (
            <Card key={f.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <FileText size={20} className="text-brand-400 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-white">{f.name}</p>
                  <p className="text-xs text-gray-400">Ajouté le {f.uploadedAt}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant={f.category === 'ADMIN' ? 'gold' : 'blue'}>{f.category}</Badge>
                <Badge variant={f.restricted ? 'green' : 'gray'}>{f.restricted ? 'Restreint' : 'Public'}</Badge>
                <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300" onClick={() => handleDeleteFile(f.id)}>
                  <Trash2 size={14} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Modal isOpen={isFileModalOpen} onClose={() => setIsFileModalOpen(false)} title="Ajouter un Fichier Confidentiel">
        <form onSubmit={handleAddFile} className="space-y-4">
          <Input
            label="Nom du fichier *"
            required
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            placeholder="Ex: rapport_bimera_2026.pdf"
          />
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-300">Catégorie d'accès</label>
            <select
              value={newFileCategory}
              onChange={(e) => setNewFileCategory(e.target.value)}
              className="w-full px-4 py-2.5 bg-navy-900 border border-gray-700 rounded-lg text-white text-sm"
            >
              <option value="MEMBER">MEMBER — Membres uniquement</option>
              <option value="ADMIN">ADMIN — Administrateurs uniquement</option>
            </select>
          </div>
          <Button type="submit" variant="primary" className="w-full justify-center">
            <Upload size={14} className="mr-1" /> Ajouter à la bibliothèque
          </Button>
        </form>
      </Modal>
    </div>
  );
}