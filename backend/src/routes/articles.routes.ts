import { Router } from 'express';
import { ArticlesController } from '../controllers/articles.controller';
import { authenticateToken, requireRole } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import { articleSchema } from '../validators/articles.validator';

const router = Router();

router.get('/', ArticlesController.getArticles);
router.get('/:slug', ArticlesController.getArticleBySlug);
router.post(
  '/',
  authenticateToken,
  requireRole(['ADMIN', 'EDITOR']),
  validateRequest(articleSchema),
  ArticlesController.createArticle
);

export default router;
