import { Router } from 'express';
import { EvenementsController } from '../controllers/evenements.controller';
import { authenticateToken, requireRole } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', EvenementsController.getEvents);
router.post('/', authenticateToken, requireRole(['ADMIN', 'EDITOR']), EvenementsController.createEvent);

export default router;
