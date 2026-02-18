import { Router } from 'express';
import { createBacklog, deleteBacklog, listBacklogs, updateBacklog } from '../controllers/backlogController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { backlogSchema } from '../utils/validationSchemas.js';

const router = Router();
router.use(protect);
router.get('/', listBacklogs);
router.post('/', validate(backlogSchema), createBacklog);
router.patch('/:id', updateBacklog);
router.delete('/:id', deleteBacklog);

export default router;
