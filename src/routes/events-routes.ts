import express from 'express';
import asyncHandler from 'express-async-handler';
import { EventsController } from '../controllers/events.controller';

const router = express.Router();

router.post('/create', asyncHandler(EventsController.create));

router.get('/', asyncHandler(EventsController.getAllEvents));


export default router;