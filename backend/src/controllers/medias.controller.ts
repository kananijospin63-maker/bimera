import { Response } from 'express';
import { prisma } from '../config/db';
import { AuthRequest } from '../middlewares/auth.middleware';

export class MediasController {
  static async getMedias(req: AuthRequest, res: Response) {
    try {
      const medias = await prisma.media.findMany({
        orderBy: { createdAt: 'desc' },
      });
      res.json(medias);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des médias.' });
    }
  }

  static async uploadMedia(req: AuthRequest, res: Response) {
    try {
      const { filename, url, mimeType, size, category } = req.body;
      const media = await prisma.media.create({
        data: {
          filename,
          url,
          mimeType,
          size: size || 1024,
          category: category || 'GENERAL',
          uploaderId: req.user?.id,
        },
      });
      res.status(201).json(media);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors du téléversement du média.' });
    }
  }

  static async deleteMedia(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      await prisma.media.delete({
        where: { id },
      });
      res.json({ message: 'Média supprimé avec succès.' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la suppression du média.' });
    }
  }
}
