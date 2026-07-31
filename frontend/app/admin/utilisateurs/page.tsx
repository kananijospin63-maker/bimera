'use client';

import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getStoredToken } from '@/lib/auth';
import { CheckCircle2, XCircle, Clock, Users, RefreshCw } from 'lucide-react';

type UserStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  status: UserStatus;
  createdAt: string;
}

export default function UtilisateursPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | UserStatus>('ALL');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = getStoredToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/utilisateurs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch {
      // Mode démo
      setUsers([
        { id: '1', email: 'jean.dupont@gmail.com', fullName: 'Jean Dupont', role: 'MEMBER', status: 'PENDING', createdAt: new Date().toISOString() },
        { id: '2', email: 'marie.martin@gmail.com', fullName: 'Marie Martin', role: 'MEMBER', status: 'PENDING', createdAt: new Date().toISOString() },
        { id: '3', email: 'paul.kabila@gmail.com', fullName: 'Paul Kabila', role: 'MEMBER', status: 'APPROVED', createdAt: new Date(Date.now() - 86400000).toISOString() },
        { id: '4', email: 'admin@bimera-group.com', fullName: 'Marc Bimera (Admin)', role: 'ADMIN', status: 'APPROVED', createdAt: new Date(Date.now() - 172800000).toISOString() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    setActionLoading(id + action);
    try {
      const token = getStoredToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/utilisateurs/${id}/${action}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setUsers((prev) => prev.map((u) =>
          u.id === id ? { ...u, status: action === 'approve' ? 'APPROVED' : 'REJECTED' } : u
        ));
        setMessage({ text: action === 'approve' ? 'Compte approuvé avec succès.' : 'Compte refusé.', type: 'success' });
      } else {
        // Mode démo — mise à jour locale
        setUsers((prev) => prev.map((u) =>
          u.id === id ? { ...u, status: action === 'approve' ? 'APPROVED' : 'REJECTED' } : u
        ));
        setMessage({ text: action === 'approve' ? 'Compte approuvé (démo).' : 'Compte refusé (démo).', type: 'success' });
      }
    } catch {
      setMessage({ text: 'Erreur lors de l\'action.', type: 'error' });
    } finally {
      setActionLoading(null);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const filtered = filter === 'ALL' ? users : users.filter((u) => u.status === filter);
  const pendingCount = users.filter((u) => u.status === 'PENDING').length;

  const statusBadge = (status: UserStatus) => {
    if (status === 'APPROVED') return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-brand-500/20 text-brand-400 border border-brand-500/30">Approuvé</span>;
    if (status === 'REJECTED') return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">Refusé</span>;
    return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-gold-500/20 text-gold-400 border border-gold-500/30 animate-pulse">En attente</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Gestion des Utilisateurs</h1>
          <p className="text-sm text-gray-400">Approuvez ou refusez les nouvelles inscriptions.</p>
        </div>
        <div className="flex items-center gap-3">
          {pendingCount > 0 && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gold-500/20 border border-gold-500/30 text-gold-400 text-xs font-bold">
              <Clock size={14} />
              {pendingCount} en attente
            </span>
          )}
          <Button variant="outline" size="sm" onClick={fetchUsers} className="flex items-center gap-1.5">
            <RefreshCw size={14} />
            Actualiser
          </Button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-3 rounded-xl text-sm font-medium border ${
          message.type === 'success'
            ? 'bg-brand-950/60 border-brand-700/50 text-brand-300'
            : 'bg-red-950/60 border-red-700/50 text-red-300'
        }`}>
          {message.text}
        </div>
      )}

      {/* Filtres */}
      <div className="flex flex-wrap gap-2">
        {(['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              filter === f
                ? 'bg-brand-600 text-white'
                : 'bg-navy-900 text-gray-400 border border-gray-800 hover:text-white'
            }`}
          >
            {f === 'ALL' ? 'Tous' : f === 'PENDING' ? 'En attente' : f === 'APPROVED' ? 'Approuvés' : 'Refusés'}
            {f === 'PENDING' && pendingCount > 0 && (
              <span className="ml-1.5 bg-gold-500 text-navy-950 rounded-full px-1.5 py-0.5 text-[10px]">{pendingCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="glass-panel rounded-2xl border border-gray-800 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm">Chargement...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Users size={40} className="text-gray-700 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Aucun utilisateur dans cette catégorie.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-navy-900/60">
                  <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Nom</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Email</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Rôle</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Statut</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-navy-900/40 transition-colors">
                    <td className="px-5 py-4 font-semibold text-white">{user.fullName}</td>
                    <td className="px-5 py-4 text-gray-400">{user.email}</td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-bold text-gray-300 bg-gray-800 px-2 py-0.5 rounded">{user.role}</span>
                    </td>
                    <td className="px-5 py-4">{statusBadge(user.status)}</td>
                    <td className="px-5 py-4 text-gray-500 text-xs">
                      {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-5 py-4">
                      {user.status === 'PENDING' && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleAction(user.id, 'approve')}
                            disabled={actionLoading === user.id + 'approve'}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-colors disabled:opacity-50"
                          >
                            <CheckCircle2 size={13} />
                            {actionLoading === user.id + 'approve' ? '...' : 'Approuver'}
                          </button>
                          <button
                            onClick={() => handleAction(user.id, 'reject')}
                            disabled={actionLoading === user.id + 'reject'}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-700 hover:bg-red-600 text-white text-xs font-bold transition-colors disabled:opacity-50"
                          >
                            <XCircle size={13} />
                            {actionLoading === user.id + 'reject' ? '...' : 'Refuser'}
                          </button>
                        </div>
                      )}
                      {user.status !== 'PENDING' && (
                        <span className="text-gray-600 text-xs italic">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
