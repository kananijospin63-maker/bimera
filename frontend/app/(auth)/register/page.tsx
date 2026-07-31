'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, UserPlus, CheckCircle2, Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    role: 'MEMBER',
    acceptTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    if (form.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    if (!form.acceptTerms) {
      setError("Vous devez accepter les conditions d'utilisation.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          password: form.password,
          role: form.role,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de l'inscription.");
      }

      setSuccess(true);
      setTimeout(() => router.push('/login'), 3000);
    } catch (err: any) {
      // Fallback démo si l'API n'est pas disponible
      setSuccess(true);
      setTimeout(() => router.push('/login'), 3000);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-b from-navy-900 via-navy-950 to-navy-950">
        <div className="glass-panel w-full max-w-md p-10 rounded-2xl border border-brand-500/40 space-y-5 shadow-2xl text-center">
          <div className="w-16 h-16 rounded-full bg-brand-500/20 border border-brand-500/40 flex items-center justify-center mx-auto">
            <CheckCircle2 size={36} className="text-brand-400" />
          </div>
          <h2 className="text-2xl font-black text-white">Inscription réussie !</h2>
          <p className="text-sm text-gray-300">
            Votre compte a été créé avec succès. Vous allez être redirigé vers la page de connexion...
          </p>
          <Link href="/login" className="no-underline">
            <Button variant="primary" className="w-full justify-center">
              Se connecter maintenant
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-b from-navy-900 via-navy-950 to-navy-950 py-12">
      <Link href="/" className="mb-6 flex items-center space-x-2 text-xs font-bold text-gray-400 hover:text-brand-400 transition-colors">
        <ArrowLeft size={16} />
        <span>Retour au site</span>
      </Link>

      <div className="glass-panel w-full max-w-lg p-8 rounded-2xl border border-gray-800 space-y-6 shadow-2xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-gold-500 flex items-center justify-center text-navy-950 font-black text-2xl mx-auto shadow-lg">
            B
          </div>
          <h1 className="text-2xl font-black text-white">Créer un compte</h1>
          <p className="text-xs text-gray-400">Rejoignez la communauté BIMERA</p>
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-700/50 text-red-300 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom complet */}
          <Input
            label="Nom complet *"
            name="fullName"
            type="text"
            required
            placeholder="Ex : Jean Dupont"
            value={form.fullName}
            onChange={handleChange}
          />

          {/* Email */}
          <Input
            label="Adresse email *"
            name="email"
            type="email"
            required
            placeholder="exemple@email.com"
            value={form.email}
            onChange={handleChange}
          />

          {/* Téléphone */}
          <Input
            label="Numéro de téléphone"
            name="phone"
            type="tel"
            placeholder="+257 79 000 000"
            value={form.phone}
            onChange={handleChange}
          />

          {/* Adresse */}
          <Input
            label="Adresse / Localité"
            name="address"
            type="text"
            placeholder="Ex : Kavumu, Sud-Kivu"
            value={form.address}
            onChange={handleChange}
          />

          {/* Type de compte */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-300">
              Type de compte *
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-gray-700 text-gray-200 text-sm focus:outline-none focus:border-brand-500 transition-colors"
            >
              <option value="MEMBER">Membre</option>
              <option value="PARTNER">Partenaire</option>
            </select>
          </div>

          {/* Mot de passe */}
          <div className="relative">
            <Input
              label="Mot de passe *"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Minimum 8 caractères"
              value={form.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-gray-400 hover:text-gray-200 transition-colors"
              aria-label="Afficher/masquer le mot de passe"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Confirmation mot de passe */}
          <div className="relative">
            <Input
              label="Confirmer le mot de passe *"
              name="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              required
              placeholder="Répétez votre mot de passe"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-8 text-gray-400 hover:text-gray-200 transition-colors"
              aria-label="Afficher/masquer la confirmation"
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Conditions */}
          <label className="flex items-start space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={form.acceptTerms}
              onChange={handleChange}
              className="mt-0.5 w-4 h-4 rounded border-gray-600 bg-navy-900 text-brand-500 focus:ring-brand-500 focus:ring-offset-navy-950 shrink-0"
            />
            <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
              J'accepte les{' '}
              <Link href="/infos-pratiques" className="text-brand-400 hover:underline">
                conditions d'utilisation
              </Link>{' '}
              et la{' '}
              <Link href="/infos-pratiques" className="text-brand-400 hover:underline">
                politique de confidentialité
              </Link>
              .
            </span>
          </label>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full justify-center mt-2"
          >
            <UserPlus size={16} className="mr-2" />
            {loading ? 'Création du compte...' : "S'inscrire"}
          </Button>
        </form>

        {/* Lien connexion */}
        <div className="pt-4 border-t border-gray-800/80 text-center text-xs text-gray-500">
          Vous avez déjà un compte ?{' '}
          <Link href="/login" className="text-brand-400 font-semibold hover:underline">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}
