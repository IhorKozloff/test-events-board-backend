import express from 'express';
import eventsRouter from './events';
import subscribeRouter from './subscribe';

const router = express.Router();

router.use('/events', eventsRouter);
router.use('/subscribe', subscribeRouter);

export default router;