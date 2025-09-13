import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.js';
import zoneRoutes from './routes/zones.js';
import alertRoutes from './routes/alerts.js';
import chatbotRoutes from './routes/chatbot.js';
import idRoutes from './routes/id.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/zones', zoneRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/id', idRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
