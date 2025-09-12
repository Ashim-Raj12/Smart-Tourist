import express from 'express';
import { getResponse } from '../controllers/chatbotController.js';

const router = express.Router();

router.post('/response', getResponse);

export default router;
