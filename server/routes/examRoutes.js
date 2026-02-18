import { Router } from 'express';
import { createExam, deleteExam, listExams, updateExam } from '../controllers/examController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { examSchema } from '../utils/validationSchemas.js';

const router = Router();
router.use(protect);
router.get('/', listExams);
router.post('/', validate(examSchema), createExam);
router.patch('/:id', updateExam);
router.delete('/:id', deleteExam);

export default router;
