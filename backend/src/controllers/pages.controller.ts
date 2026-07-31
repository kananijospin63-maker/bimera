import { Request, Response } from 'express';
import { prisma } from '../config/db';

export class PagesController {
  static async getAllPages(req: Request, res: Response) {
    try {
      const pages = await prisma.page.findMany({
        orderBy: { updatedAt: 'desc' },
      });
      res.json(pages);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des pages.' });
    }
  }

  static async getPageBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const page = await prisma.page.findUnique({ where: { slug } });
      if (!page) {
        return res.status(404).json({ error: 'Page non trouvée.' });
      }
      res.json(page);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération de la page.' });
    }
  }

  static async createOrUpdatePage(req: Request, res: Response) {
    try {
      const { slug, title, description, blocks, published } = req.body;
      const page = await prisma.page.upsert({
        where: { slug },
        update: { title, description, blocks, published },
        create: { slug, title, description, blocks, published: published ?? true },
      });
      res.json(page);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de l'enregistrement de la page." });
    }
  }
}
