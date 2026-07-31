import { Router } from 'express';
import { MediasController } from '../controllers/medias.controller';
import { authenticateToken, requireRole } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateToken, MediasController.getMedias);
router.post('/upload', authenticateToken, requireRole(['ADMIN', 'EDITOR']), MediasController.uploadMedia);

export default router;
