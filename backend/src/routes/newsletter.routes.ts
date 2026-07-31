import { Router } from 'express';
import { NewsletterController } from '../controllers/newsletter.controller';
import { authenticateToken, requireRole } from '../middlewares/auth.middleware';

const router = Router();

router.post('/subscribe', NewsletterController.subscribe);
router.get('/', authenticateToken, requireRole(['ADMIN', 'EDITOR']), NewsletterController.getSubscribers);
router.delete('/:id', authenticateToken, requireRole(['ADMIN']), NewsletterController.deleteSubscriber);

export default router;
