'use client';

import React, { useState } from 'react';
import { ContentBlock } from '@/types';
import { Plus, Trash2, Heading, AlignLeft, Image as ImageIcon, MessageSquare } from 'lucide-react';
import { Button } from './Button';

interface BlockEditorProps {
  initialBlocks?: ContentBlock[];
  onChange?: (blocks: ContentBlock[]) => void;
}

export const BlockEditor: React.FC<BlockEditorProps> = ({ initialBlocks = [], onChange }) => {
  const [blocks, setBlocks] = useState<ContentBlock[]>(
    initialBlocks.length > 0
      ? initialBlocks
      : [
          { id: '1', type: 'heading', data: { text: 'Titre de la section', level: 2 } },
          { id: '2', type: 'paragraph', data: { text: 'Contenu modulaire de la page...' } },
        ]
  );

  const updateBlocks = (newBlocks: ContentBlock[]) => {
    setBlocks(newBlocks);
    if (onChange) onChange(newBlocks);
  };

  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type,
      data: type === 'heading' ? { text: 'Nouveau titre', level: 2 } : { text: '' },
    };
    updateBlocks([...blocks, newBlock]);
  };

  const removeBlock = (id: string) => {
    updateBlocks(blocks.filter((b) => b.id !== id));
  };

  const updateBlockContent = (id: string, text: string) => {
    updateBlocks(
      blocks.map((b) => (b.id === id ? { ...b, data: { ...b.data, text } } : b))
    );
  };

  return (
    <div className="space-y-4 bg-navy-900/40 border border-gray-800 p-6 rounded-xl">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <h4 className="font-bold text-gray-200">Éditeur de Blocs CMS</h4>
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline" onClick={() => addBlock('heading')}>
            <Heading size={14} className="mr-1" /> Titre
          </Button>
          <Button size="sm" variant="outline" onClick={() => addBlock('paragraph')}>
            <AlignLeft size={14} className="mr-1" /> Paragraphe
          </Button>
          <Button size="sm" variant="outline" onClick={() => addBlock('image')}>
            <ImageIcon size={14} className="mr-1" /> Image
          </Button>
          <Button size="sm" variant="outline" onClick={() => addBlock('callout')}>
            <MessageSquare size={14} className="mr-1" /> Encart
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {blocks.map((block) => (
          <div key={block.id} className="glass-panel p-4 rounded-lg flex items-start space-x-3 group relative">
            <div className="mt-1 text-gray-400">
              {block.type === 'heading' && <Heading size={18} />}
              {block.type === 'paragraph' && <AlignLeft size={18} />}
              {block.type === 'image' && <ImageIcon size={18} />}
              {block.type === 'callout' && <MessageSquare size={18} />}
            </div>

            <div className="flex-1 space-y-2">
              <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">
                Bloc {block.type}
              </span>
              {block.type === 'paragraph' || block.type === 'heading' || block.type === 'callout' ? (
                <textarea
                  rows={block.type === 'heading' ? 1 : 3}
                  value={block.data.text || ''}
                  onChange={(e) => updateBlockContent(block.id, e.target.value)}
                  className="w-full bg-navy-950/70 border border-gray-700 rounded p-2 text-sm text-gray-100 focus:outline-none focus:border-brand-500"
                  placeholder={`Saisir le contenu du bloc ${block.type}...`}
                />
              ) : (
                <input
                  type="text"
                  value={block.data.url || ''}
                  onChange={(e) =>
                    updateBlocks(
                      blocks.map((b) =>
                        b.id === block.id ? { ...b, data: { ...b.data, url: e.target.value } } : b
                      )
                    )
                  }
                  className="w-full bg-navy-950/70 border border-gray-700 rounded p-2 text-sm text-gray-100 placeholder-gray-500"
                  placeholder="URL de l'image (Uploadthing / Supabase)..."
                />
              )}
            </div>

            <button
              onClick={() => removeBlock(block.id)}
              className="text-gray-500 hover:text-red-400 p-1 opacity-80 group-hover:opacity-100 transition"
              title="Supprimer ce bloc"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
