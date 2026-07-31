import { Router } from 'express';
import { ContactController } from '../controllers/contact.controller';
import { validateRequest } from '../middlewares/validate.middleware';
import { contactSchema } from '../validators/contact.validator';
import { authenticateToken, requireRole } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', validateRequest(contactSchema), ContactController.submitContact);
router.get('/', authenticateToken, requireRole(['ADMIN', 'EDITOR']), ContactController.getMessages);

export default router;
