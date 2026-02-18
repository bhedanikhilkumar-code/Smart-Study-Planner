import { Router } from 'express';
import { getAiPlan } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { aiPlanSchema } from '../utils/validationSchemas.js';

const router = Router();
router.use(protect);
router.post('/study-plan', validate(aiPlanSchema), getAiPlan);

export default router;
