import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import contentRoutes from './routes/content';
import profileRoutes from './routes/profile';
import myListRoutes from './routes/myList';
// import { authenticateToken } from './middleware/authMiddleware';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/my-list', myListRoutes);
// Public access to content for now
app.use('/api/content', contentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 