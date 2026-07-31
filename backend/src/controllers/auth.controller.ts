import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/db';
import { ENV } from '../config/env';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { email, password, fullName, phone, address, role } = req.body;

      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return res.status(400).json({ error: 'Un compte existe déjà avec cette adresse email.' });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          passwordHash,
          fullName,
          role: role === 'PARTNER' ? 'MEMBER' : 'MEMBER',
          status: 'PENDING', // En attente d'approbation admin
        },
      });

      res.status(201).json({
        message: 'Compte créé avec succès. Votre compte est en attente d\'approbation par un administrateur.',
        pending: true,
        user: { id: user.id, email: user.email, fullName: user.fullName, status: user.status },
      });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création du compte.' });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Identifiants invalides.' });
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ error: 'Identifiants invalides.' });
      }

      // Vérification du statut du compte
      if (user.status === 'PENDING') {
        return res.status(403).json({
          error: 'Votre compte est en attente d\'approbation par un administrateur.',
          status: 'PENDING',
        });
      }

      if (user.status === 'REJECTED') {
        return res.status(403).json({
          error: 'Votre compte a été refusé. Contactez l\'administrateur pour plus d\'informations.',
          status: 'REJECTED',
        });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        ENV.JWT_SECRET,
        { expiresIn: ENV.JWT_EXPIRES_IN }
      );

      res.json({
        message: 'Connexion réussie.',
        token,
        user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role },
      });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la connexion.' });
    }
  }
}
