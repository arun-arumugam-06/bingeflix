import { Router, Request, Response } from 'express';
import { supabase } from '../supabaseClient';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const router = Router();

// Register
router.post('/register', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return res.status(400).json({ error: error.message });
  res.json({ user: data.user });
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(400).json({ error: error.message });
  // Issue JWT for session
  const token = jwt.sign({ userId: data.user.id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
  res.json({ token, user: data.user });
});

// Profile (protected)
router.get('/profile', async (req: Request, res: Response) => {
  // This should be protected by auth middleware
  res.json({ message: 'Profile endpoint' });
});

export default router; 