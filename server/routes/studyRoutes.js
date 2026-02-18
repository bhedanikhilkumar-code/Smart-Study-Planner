import { Router } from 'express';
import { createSession, deleteSession, listSessions, updateSession } from '../controllers/studyController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { studySessionSchema } from '../utils/validationSchemas.js';

const router = Router();
router.use(protect);
router.get('/', listSessions);
router.post('/', validate(studySessionSchema), createSession);
router.patch('/:id', updateSession);
router.delete('/:id', deleteSession);

export default router;
