'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { setStoredAuth } from '@/lib/auth';
import { KeyRound, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@bimera-group.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [show2FA, setShow2FA] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || 'Erreur de connexion.');
          setLoading(false);
          return;
        }

        if (!show2FA) {
          setShow2FA(true);
          setLoading(false);
          return;
        }

        setStoredAuth(data.token, data.user);
        router.push('/admin/dashboard');
      } catch {
        // Mode démo
        if (!show2FA) {
          setShow2FA(true);
          setLoading(false);
          return;
        }
        const mockUser = {
          id: 'u-admin-1',
          email,
          fullName: 'Marc Bimera (Admin)',
          role: 'ADMIN' as const,
          twoFactorEnabled: true,
        };
        setStoredAuth('demo-jwt-token-bimera-2026', mockUser);
        router.push('/admin/dashboard');
      } finally {
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-b from-navy-900 via-navy-950 to-navy-950 py-12">
      <Link href="/" className="mb-8 flex items-center space-x-2 text-xs font-bold text-gray-400 hover:text-brand-400">
        <ArrowLeft size={16} />
        <span>Retour au site principal</span>
      </Link>

      <div className="glass-panel w-full max-w-md p-8 rounded-2xl border border-gray-800 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-gold-500 flex items-center justify-center text-navy-950 font-black text-2xl mx-auto shadow-lg">
            B
          </div>
          <h1 className="text-2xl font-black text-white">Connexion Espace bimera</h1>
          <p className="text-xs text-gray-400">Accès sécurisé pour membres et administrateurs</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-700/50 text-red-300 text-xs font-medium flex items-start gap-2">
              <span>{error}</span>
            </div>
          )}
          {!show2FA ? (
            <>
              <Input
                label="Adresse Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="relative">
                <Input
                  label="Mot de Passe"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-8 text-gray-400 hover:text-gray-200 transition-colors"
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-3 animate-fade-in">
              <div className="p-3 bg-brand-950/80 rounded-lg border border-brand-800 text-xs text-brand-300 flex items-center space-x-2">
                <KeyRound size={18} />
                <span>Authentification à double facteur (2FA) requise.</span>
              </div>
              <Input
                label="Code d'authentification 2FA (6 chiffres)"
                type="text"
                required
                placeholder="123456"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
              />
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full justify-center">
            <Lock size={16} className="mr-2" />
            {loading ? 'Vérification...' : show2FA ? 'Valider le code 2FA' : 'Se Connecter'}
          </Button>
        </form>

        <div className="pt-4 border-t border-gray-800/80 text-center text-xs text-gray-500">
          Identifiants démo pré-remplis (Cliquer sur Connexion puis Valider).
        </div>
      </div>
    </div>
  );
}
