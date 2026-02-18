import { Router } from 'express';
import { createSubject, deleteSubject, listSubjects, updateSubject } from '../controllers/subjectController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { subjectSchema } from '../utils/validationSchemas.js';

const router = Router();
router.use(protect);
router.get('/', listSubjects);
router.post('/', validate(subjectSchema), createSubject);
router.patch('/:id', updateSubject);
router.delete('/:id', deleteSubject);

export default router;
