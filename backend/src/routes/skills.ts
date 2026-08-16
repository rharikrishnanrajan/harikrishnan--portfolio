import { Router } from 'express';
import { listSkills } from '../controllers/skillsController';

const router = Router();

router.get('/', listSkills);

export default router;
