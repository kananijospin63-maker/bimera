import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères.' }),
  email: z.string().email({ message: 'Adresse email invalide.' }),
  phone: z.string().optional(),
  subject: z.string().min(3, { message: 'Le sujet doit contenir au moins 3 caractères.' }),
  message: z.string().min(10, { message: 'Le message doit contenir au moins 10 caractères.' }),
});
