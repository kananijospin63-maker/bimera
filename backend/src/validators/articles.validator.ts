import { z } from 'zod';

export const articleSchema = z.object({
  title: z.string().min(3, { message: 'Le titre doit avoir au moins 3 caractères.' }),
  summary: z.string().min(10, { message: 'Le résumé doit avoir au moins 10 caractères.' }),
  content: z.string().min(20, { message: 'Le contenu doit avoir au moins 20 caractères.' }),
  category: z.enum(['AGRICULTURE', 'ELEVAGE', 'INFORMATIQUE', 'TECHNIQUE', 'GENERAL']),
  imageUrl: z.string().url().optional(),
  published: z.boolean().optional(),
});
