import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { MailService } from '../services/mail.service';

export class UtilisateursController {
  static async getUsers(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          fullName: true,
          role: true,
          status: true,
          twoFactorEnabled: true,
          avatarUrl: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
    }
  }

  static async getPendingUsers(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({
        where: { status: 'PENDING' },
        select: {
          id: true,
          email: true,
          fullName: true,
          role: true,
          status: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des comptes en attente.' });
    }
  }

  static async approveUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await prisma.user.update({
        where: { id },
        data: { status: 'APPROVED' },
        select: { id: true, email: true, fullName: true, status: true },
      });

      // Notification par email
      MailService.sendAccountApproved(user.email, user.fullName).catch((err) =>
        console.error('Failed to send approval email:', err)
      );

      res.json({ message: 'Compte approuvé avec succès.', user });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de l'approbation du compte." });
    }
  }

  static async rejectUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await prisma.user.update({
        where: { id },
        data: { status: 'REJECTED' },
        select: { id: true, email: true, fullName: true, status: true },
      });

      res.json({ message: 'Compte refusé.', user });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors du refus du compte.' });
    }
  }

  static async updateUserRole(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { role } = req.body;
      const updated = await prisma.user.update({
        where: { id },
        data: { role },
        select: { id: true, email: true, fullName: true, role: true },
      });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour du rôle.' });
    }
  }

  static async inviteUser(req: Request, res: Response) {
    try {
      const { name, email, role } = req.body;
      const tempPassword = Math.random().toString(36).slice(-8);

      const user = await prisma.user.create({
        data: {
          email,
          fullName: name,
          passwordHash: tempPassword,
          role: role || 'MEMBER',
          status: 'APPROVED', // Invité par admin = approuvé directement
          twoFactorEnabled: false,
        },
      });

      MailService.sendInvitation(email, name, tempPassword).catch((err) =>
        console.error('Failed to send invitation email:', err)
      );

      res.status(201).json({
        message: 'Utilisateur invité avec succès.',
        user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role },
      });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de l'invitation de l'utilisateur." });
    }
  }
}
