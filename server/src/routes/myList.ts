import { Router, Request, Response } from 'express';
import { supabase } from '../supabaseClient';

const router = Router();

// Get user's list
router.get('/:user_id', async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const { data, error } = await supabase
    .from('user_lists')
    .select('content_id, content(*)')
    .eq('user_id', user_id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

// Add to user's list
router.post('/', async (req: Request, res: Response) => {
  const { user_id, content_id } = req.body;
  const { data, error } = await supabase.from('user_lists').insert([{ user_id, content_id }]);
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

// Remove from user's list
router.delete('/', async (req: Request, res: Response) => {
  const { user_id, content_id } = req.body;
  const { error } = await supabase.from('user_lists').delete().eq('user_id', user_id).eq('content_id', content_id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(204).send();
});

export default router; 