import { Router } from 'express';
import { deleteInactiveUsers, getStats, listUsers } from '../controllers/adminController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = Router();
router.use(protect, authorize('admin'));
router.get('/stats', getStats);
router.get('/users', listUsers);
router.delete('/inactive-users', deleteInactiveUsers);

export default router;
