import { Router, Request, Response } from 'express';
import { supabase } from '../supabaseClient';

const router = Router();

// Get all content
router.get('/', async (_req: Request, res: Response) => {
  const { data, error } = await supabase.from('content').select('*');
  if (error) {
    console.error('Supabase error:', error);
    return res.status(400).json({ error: error.message });
  }
  res.json(data);
});

// Create new content (protected)
router.post('/', async (req: Request, res: Response) => {
  const { title, description, imageUrl } = req.body;
  const { data, error } = await supabase.from('content').insert([{ title, description, imageUrl }]);
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

export default router; 