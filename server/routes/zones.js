import express from 'express';
import { getZones, checkLocation } from '../controllers/zoneController.js';

const router = express.Router();

router.get('/', getZones);
router.post('/check', checkLocation);

export default router;
