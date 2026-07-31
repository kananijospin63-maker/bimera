import { Response } from 'express';
import { prisma } from '../config/db';
import { AuthRequest } from '../middlewares/auth.middleware';

export class ArticlesController {
  static async getArticles(req: AuthRequest, res: Response) {
    try {
      const { category, search } = req.query;
      const whereClause: any = { published: true };

      if (category && category !== 'ALL') {
        whereClause.category = category;
      }
      if (search) {
        whereClause.OR = [
          { title: { contains: String(search), mode: 'insensitive' } },
          { summary: { contains: String(search), mode: 'insensitive' } },
        ];
      }

      const articles = await prisma.article.findMany({
        where: whereClause,
        include: { author: { select: { fullName: true, avatarUrl: true } } },
        orderBy: { createdAt: 'desc' },
      });
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des articles.' });
    }
  }

  static async getArticleBySlug(req: AuthRequest, res: Response) {
    try {
      const { slug } = req.params;
      const article = await prisma.article.findUnique({
        where: { slug },
        include: { author: { select: { fullName: true, avatarUrl: true } } },
      });
      if (!article) {
        return res.status(404).json({ error: 'Article non trouvé.' });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération de l'article." });
    }
  }

  static async createArticle(req: AuthRequest, res: Response) {
    try {
      const { title, summary, content, category, imageUrl, published } = req.body;
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      const article = await prisma.article.create({
        data: {
          title,
          slug: `${slug}-${Date.now()}`,
          summary,
          content,
          category,
          imageUrl,
          published: published ?? true,
          authorId: req.user?.id || 'system-author',
        },
      });

      res.status(201).json(article);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la création de l'article." });
    }
  }

  static async updateArticle(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { title, summary, content, category, imageUrl, published } = req.body;

      const article = await prisma.article.update({
        where: { id },
        data: {
          title,
          summary,
          content,
          category,
          imageUrl,
          published,
        },
      });

      res.json(article);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la mise à jour de l'article." });
    }
  }

  static async deleteArticle(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      await prisma.article.delete({
        where: { id },
      });
      res.json({ message: 'Article supprimé avec succès.' });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la suppression de l'article." });
    }
  }
}
