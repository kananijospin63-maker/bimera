'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, Check, Globe, Tag } from 'lucide-react';

const defaultSEO = {
  siteName: 'BIMERA Bureau International pour la Meilleure Realisation en Afrique',
  siteDescription: 'Organisation multisectorielle basee a Kavumu, Sud-Kivu RDC. Specialisee en agriculture, elevage, informatique et activites techniques.',
  siteUrl: 'https://www.bimera-group.com',
  twitterHandle: '@BBAD_RDC',
  googleAnalyticsId: 'G-XXXXXXXXXX',
  metaKeywords: 'BIMERA, BBAD-RDC, agriculture, elevage, informatique, Sud-Kivu, Kavumu, RDC',
};

export default function AdminSEOPage() {
  const [form, setForm] = useState(defaultSEO);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">Parametres SEO et Referencement</h1>
        <p className="text-xs text-gray-400">Metadonnees globales, Open Graph et Google Analytics.</p>
      </div>
      <form onSubmit={handleSave} className="space-y-6">
        <Card className="space-y-5">
          <div className="flex items-center space-x-3 pb-3 border-b border-gray-800">
            <Globe size={20} className="text-brand-400" />
            <h2 className="text-lg font-bold text-white">Identite du Site</h2>
          </div>
          <Input label="Nom du site" value={form.siteName} onChange={(e) => setForm({ ...form, siteName: e.target.value })} />
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-300">Description meta</label>
            <textarea
              rows={3}
              value={form.siteDescription}
              onChange={(e) => setForm({ ...form, siteDescription: e.target.value })}
              className="w-full px-4 py-2.5 bg-navy-900 border border-gray-700 rounded-lg text-white text-sm resize-none focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <Input label="URL canonique du site" value={form.siteUrl} onChange={(e) => setForm({ ...form, siteUrl: e.target.value })} />
        </Card>
        <Card className="space-y-5">
          <div className="flex items-center space-x-3 pb-3 border-b border-gray-800">
            <Tag size={20} className="text-gold-400" />
            <h2 className="text-lg font-bold text-white">Mots-cles et Analytics</h2>
          </div>
          <Input label="Mots-cles principaux" value={form.metaKeywords} onChange={(e) => setForm({ ...form, metaKeywords: e.target.value })} />
          <Input label="ID Google Analytics GA4" value={form.googleAnalyticsId} onChange={(e) => setForm({ ...form, googleAnalyticsId: e.target.value })} placeholder="G-XXXXXXXXXX" />
          <Input label="Compte Twitter / X" value={form.twitterHandle} onChange={(e) => setForm({ ...form, twitterHandle: e.target.value })} placeholder="@VotreCompte" />
        </Card>
        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="lg">
            {saved ? 'Parametres SEO Sauvegardes!' : 'Enregistrer les Parametres SEO'}
          </Button>
        </div>
      </form>
    </div>
  );
}