import { Router } from 'express';
import { createContactMessage } from '../controllers/contactController';
import { contactValidation, validateRequest } from '../middleware/validation';

const router = Router();

router.post('/', contactValidation, validateRequest, createContactMessage);

export default router;
