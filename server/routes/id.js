import express from 'express';
import { verifyId } from '../controllers/idController.js';

const router = express.Router();

router.post('/verify', verifyId);

export default router;
