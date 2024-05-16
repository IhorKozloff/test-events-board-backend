import express from 'express';
import asyncHandler from 'express-async-handler';
import { SubscribeController } from '../controllers/subscribe.controller';
import { validateParams } from '../middlewares/validateParams';
import subscribeRules from '../rules/subscriber.rules';

const router = express.Router();

router.post('/', validateParams('body', subscribeRules.subscribeUser), asyncHandler(SubscribeController.subscribeUser));

export default router;