import { Router } from 'express';
import { PagesController } from '../controllers/pages.controller';
import { authenticateToken, requireRole } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', PagesController.getAllPages);
router.get('/:slug', PagesController.getPageBySlug);
router.post('/', authenticateToken, requireRole(['ADMIN', 'EDITOR']), PagesController.createOrUpdatePage);

export default router;
