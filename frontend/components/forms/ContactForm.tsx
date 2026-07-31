'use client';

import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Erreur lors de l’envoi du formulaire.');
      }

      setStatus({
        type: 'success',
        msg: 'Votre message a été transmis avec succès. Merci !',
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err: any) {
      setStatus({
        type: 'error',
        msg: err.message || 'Une erreur est survenue, veuillez réessayer.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-2xl space-y-6 border border-gray-800">
      <h3 className="text-2xl font-bold text-white">Envoyez-nous un Message</h3>

      {status && (
        <div
          className={`p-4 rounded-xl flex items-center space-x-3 text-sm ${
            status.type === 'success'
              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
              : 'bg-red-950/80 text-red-300 border border-red-800'
          }`}
        >
          {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span>{status.msg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nom complet *"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Ex: Jean Mukendi"
        />
        <Input
          label="Email *"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="ex: jean@domaine.com"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Téléphone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+257 79490806"
        />
        <Input
          label="Sujet *"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          placeholder="Partenariat / Information..."
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-200">Message *</label>
        <textarea
          rows={5}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-2.5 bg-navy-900/80 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          placeholder="Rédigez votre demande ici..."
        />
      </div>

      <div className="text-xs text-gray-500 flex items-center space-x-1">
        <span className="w-2 h-2 rounded-full bg-brand-500" />
        <span>Protégé par reCAPTCHA v3 et notre politique de confidentialité.</span>
      </div>

      <Button type="submit" disabled={loading} className="w-full justify-center">
        <Send size={16} className="mr-2" />
        {loading ? 'Envoi en cours...' : 'Envoyer le Message'}
      </Button>
    </form>
  );
};
