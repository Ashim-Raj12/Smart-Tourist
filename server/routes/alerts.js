import express from 'express';
import { logAlert, getAlerts } from '../controllers/alertController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, logAlert);
router.get('/', authenticate, getAlerts);

export default router;
