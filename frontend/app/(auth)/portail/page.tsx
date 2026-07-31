'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getStoredUser } from '@/lib/auth';
import { ShieldCheck, FileText, Download, UserCheck, Bell, Lock } from 'lucide-react';

export default function PortailPage() {
  const user = getStoredUser() || { fullName: 'Membre bimera', role: 'MEMBER' };

  return (
    <div className="min-h-screen bg-navy-950 text-gray-100 p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-800 pb-6 gap-4">
        <div>
          <Badge variant="green" className="mb-1">Espace Réservé</Badge>
          <h1 className="text-3xl font-black text-white">Portail Membres bimera</h1>
          <p className="text-xs text-gray-400">Bienvenue, {user.fullName}</p>
        </div>

        <Link href="/admin/dashboard">
          <Button variant="secondary" size="sm">
            <ShieldCheck size={16} className="mr-1.5" />
            Accéder au Back-Office Admin
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="space-y-3">
          <div className="p-3 rounded-lg bg-brand-900/60 text-brand-400 w-fit">
            <FileText size={24} />
          </div>
          <h3 className="font-bold text-white text-lg">Rapports Financiers & Activités</h3>
          <p className="text-xs text-gray-300">Accès aux bilans semestriels et audits de nos exploitations.</p>
          <Button variant="outline" size="sm" className="w-full justify-between">
            <span>Télécharger (PDF)</span>
            <Download size={14} />
          </Button>
        </Card>

        <Card className="space-y-3">
          <div className="p-3 rounded-lg bg-gold-900/60 text-gold-400 w-fit">
            <Bell size={24} />
          </div>
          <h3 className="font-bold text-white text-lg">Communications Internes</h3>
          <p className="text-xs text-gray-300">Notes d’orientation et convocations aux assemblées d’actionnaires.</p>
          <Button variant="outline" size="sm" className="w-full justify-between">
            <span>Consulter les notes</span>
            <FileText size={14} />
          </Button>
        </Card>

        <Card className="space-y-3">
          <div className="p-3 rounded-lg bg-blue-900/60 text-blue-400 w-fit">
            <UserCheck size={24} />
          </div>
          <h3 className="font-bold text-white text-lg">Profil & Sécurité 2FA</h3>
          <p className="text-xs text-gray-300">Authentification à double facteur configurée et active.</p>
          <Button variant="outline" size="sm" className="w-full justify-between">
            <span>Paramètres de sécurité</span>
            <Lock size={14} />
          </Button>
        </Card>
      </div>
    </div>
  );
}
