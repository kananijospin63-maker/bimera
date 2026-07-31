'use client';

import React, { useState } from 'react';
import { Bell, LogOut, Shield, X, Check } from 'lucide-react';
import { clearStoredAuth, getStoredUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';

const NOTIFICATIONS = [
  { id: '1', message: 'Nouveau message reçu de contact@example.com', time: 'Il y a 5 min', read: false },
  { id: '2', message: 'Sauvegarde automatique effectuée avec succès', time: 'Il y a 2h', read: false },
  { id: '3', message: 'Article "Pôle Élevage" publié par Sarah Kabila', time: 'Hier 14:10', read: true },
  { id: '4', message: 'Nouvel utilisateur enregistré sur le portail', time: 'Hier 09:30', read: true },
];

export const AdminHeader: React.FC = () => {
  const router = useRouter();
  const user = getStoredUser() || { fullName: 'Administrateur', role: 'ADMIN' };
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    clearStoredAuth();
    router.push('/login');
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const dismissNotif = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <header className="h-16 bg-navy-900/80 border-b border-gray-800 px-6 flex items-center justify-between relative">
      <div className="flex items-center space-x-2 text-xs font-semibold text-gray-400">
        <Shield size={14} className="text-brand-400" />
        <span>Espace de Gestion Administrateur</span>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-navy-800 transition"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-brand-500 text-[9px] font-bold text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-10 w-80 bg-navy-900 border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                <span className="text-sm font-bold text-white">Notifications</span>
                <button onClick={markAllRead} className="text-[10px] text-brand-400 hover:text-brand-300 font-semibold">
                  Tout marquer comme lu
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-gray-800">
                {notifications.length === 0 ? (
                  <p className="text-xs text-gray-500 text-center py-6">Aucune notification</p>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} className={`flex items-start space-x-3 px-4 py-3 ${!n.read ? 'bg-brand-950/30' : ''}`}>
                      <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${!n.read ? 'bg-brand-400' : 'bg-gray-700'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-200 leading-relaxed">{n.message}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{n.time}</p>
                      </div>
                      <button onClick={() => dismissNotif(n.id)} className="text-gray-600 hover:text-gray-400 shrink-0">
                        <X size={12} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3 pl-4 border-l border-gray-800">
          <div className="w-8 h-8 rounded-full bg-brand-700 text-white flex items-center justify-center font-bold text-xs">
            {user.fullName.charAt(0)}
          </div>
          <div className="text-xs">
            <span className="block font-bold text-white">{user.fullName}</span>
            <span className="text-brand-400 text-[10px] font-semibold">{user.role}</span>
          </div>

          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-950/40 transition"
            title="Se déconnecter"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};
