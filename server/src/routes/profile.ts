import { Router, Request, Response } from 'express';
import { supabase } from '../supabaseClient';

const router = Router();

// Create or update user profile
router.post('/', async (req: Request, res: Response) => {
  const { id, name, age, profile_picture } = req.body;
  const { data, error } = await supabase.from('profiles').upsert([
    { id, name, age, profile_picture }
  ], { onConflict: 'id' });
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

// Get user profile
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

export default router; 