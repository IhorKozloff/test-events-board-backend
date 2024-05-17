import express from 'express';
import asyncHandler from 'express-async-handler';
import { EventsController } from '../controllers/events.controller';
import { validateParams } from '../middlewares/validateParams';
import eventsRules from '../rules/events.rules';

const router = express.Router();

router.post('/create', asyncHandler(EventsController.create));

router.get('/', validateParams('query', eventsRules.listQueryParams), asyncHandler(EventsController.getAllEvents));
router.get('/:id', asyncHandler(EventsController.getEventById));

export default router;