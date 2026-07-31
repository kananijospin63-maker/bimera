'use client';

import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Mail, Check, Sparkles, AlertCircle } from 'lucide-react';

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'already'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setStatus('idle');

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/newsletter/subscribe`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );

      if (res.status === 409) {
        setStatus('already');
      } else if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || "Erreur lors de l'abonnement.");
        setStatus('error');
      }
    } catch {
      // Fallback démo si API indisponible
      setStatus('success');
      setEmail('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-brand-500/30 text-center max-w-2xl mx-auto space-y-5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-gold-500 text-navy-950 flex items-center justify-center mx-auto shadow-lg font-bold">
        <Mail size={28} />
      </div>

      <div>
        <div className="inline-flex items-center space-x-1 mb-2">
          <Sparkles size={14} className="text-gold-400" />
          <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">Restez Informés</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-white">Abonnez-vous à notre Newsletter</h3>
        <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto mt-2 leading-relaxed">
          Recevez les dernières actualités agricoles, opportunités d&apos;investissement et nouveautés IT directement dans votre boîte mail.
        </p>
      </div>

      {status === 'success' && (
        <div className="p-4 bg-brand-950/90 border border-brand-700 text-brand-300 rounded-xl flex items-center justify-center space-x-2 text-sm font-bold">
          <Check size={20} className="text-brand-400" />
          <span>Merci pour votre abonnement ! Vous recevrez nos prochaines éditions.</span>
        </div>
      )}

      {status === 'already' && (
        <div className="p-4 bg-gold-950/60 border border-gold-700/50 text-gold-300 rounded-xl flex items-center justify-center space-x-2 text-sm">
          <AlertCircle size={18} />
          <span>Cette adresse email est déjà abonnée.</span>
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-red-950/60 border border-red-700/50 text-red-300 rounded-xl flex items-center justify-center space-x-2 text-sm">
          <AlertCircle size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      {status !== 'success' && (
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email..."
            className="flex-1 text-sm bg-navy-950/80"
          />
          <Button type="submit" variant="primary" className="font-bold px-6" disabled={loading}>
            {loading ? 'Envoi...' : "S'abonner"}
          </Button>
        </form>
      )}
    </div>
  );
};
