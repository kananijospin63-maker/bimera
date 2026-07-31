import React from 'react';
import { Loader2, Inbox, AlertTriangle } from 'lucide-react';
import { Button } from './Button';

/* ── Loading State ── */
export const LoadingState: React.FC<{ message?: string }> = ({
  message = 'Chargement en cours...',
}) => (
  <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center" role="status">
    <Loader2 size={36} className="text-brand-400 animate-spin" />
    <p className="text-sm text-gray-400 font-medium">{message}</p>
  </div>
);

/* ── Empty State ── */
export const EmptyState: React.FC<{
  icon?: React.ReactNode;
  title?: string;
  message?: string;
  action?: { label: string; onClick: () => void };
}> = ({
  icon,
  title = 'Aucune donnée disponible',
  message = 'Il n\'y a rien à afficher pour le moment.',
  action,
}) => (
  <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center max-w-sm mx-auto">
    <div className="w-16 h-16 rounded-2xl bg-surface-raised border border-gray-800 flex items-center justify-center text-gray-500">
      {icon || <Inbox size={28} />}
    </div>
    <div className="space-y-1">
      <h4 className="text-base font-bold text-gray-200">{title}</h4>
      <p className="text-xs text-gray-400 leading-relaxed">{message}</p>
    </div>
    {action && (
      <Button size="sm" variant="outline" onClick={action.onClick}>
        {action.label}
      </Button>
    )}
  </div>
);

/* ── Error State ── */
export const ErrorState: React.FC<{
  message?: string;
  onRetry?: () => void;
}> = ({
  message = 'Une erreur est survenue lors du chargement.',
  onRetry,
}) => (
  <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center max-w-sm mx-auto">
    <div className="w-16 h-16 rounded-2xl bg-red-950/60 border border-red-800/50 flex items-center justify-center text-red-400">
      <AlertTriangle size={28} />
    </div>
    <div className="space-y-1">
      <h4 className="text-base font-bold text-red-300">Erreur de chargement</h4>
      <p className="text-xs text-gray-400 leading-relaxed">{message}</p>
    </div>
    {onRetry && (
      <Button size="sm" variant="outline" onClick={onRetry}>
        Réessayer
      </Button>
    )}
  </div>
);
