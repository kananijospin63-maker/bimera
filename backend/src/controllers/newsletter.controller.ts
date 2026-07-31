import { Request, Response } from 'express';
import { prisma } from '../config/db';

export class NewsletterController {
  static async subscribe(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ error: 'Email requis.' });

      const existing = await prisma.newsletter.findUnique({ where: { email } });
      if (existing) {
        return res.status(409).json({ error: 'Cette adresse email est déjà abonnée.' });
      }

      const sub = await prisma.newsletter.create({ data: { email } });
      res.status(201).json({ message: 'Abonnement réussi !', sub });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de l'abonnement." });
    }
  }

  static async getSubscribers(req: Request, res: Response) {
    try {
      const subscribers = await prisma.newsletter.findMany({
        orderBy: { createdAt: 'desc' },
      });
      res.json(subscribers);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des abonnés.' });
    }
  }

  static async deleteSubscriber(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.newsletter.delete({ where: { id } });
      res.json({ message: 'Abonné supprimé.' });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la suppression." });
    }
  }
}
