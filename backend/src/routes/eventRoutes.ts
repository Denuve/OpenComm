import { Router } from 'express';
import { getEvents } from '../controllers/eventController';

const router = Router();

// Endpoint: GET /api/events
router.get('/', getEvents);

export default router;