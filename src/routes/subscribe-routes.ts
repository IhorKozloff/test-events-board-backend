import express from 'express';
import asyncHandler from 'express-async-handler';
import { SubscribeController } from '../controllers/subscribe.controller';

const router = express.Router();

router.post('/', asyncHandler(SubscribeController.subscribeUser));

export default router;