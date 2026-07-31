import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email({ message: 'Adresse email invalide.' }),
  password: z.string().min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' }),
  fullName: z.string().min(2, { message: 'Le nom complet doit contenir au moins 2 caractères.' }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: 'Adresse email invalide.' }),
  password: z.string().min(1, { message: 'Le mot de passe est requis.' }),
});
