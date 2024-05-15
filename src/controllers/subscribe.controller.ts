
import { NextFunction, Request, Response } from 'express';
import { EventService } from '../services/event.service';
import httpStatus from 'http-status';
import { SubscribeRequest } from '../types/entities/subscriber';

export class SubscribeController {

    static async subscribeUser(req: SubscribeRequest, res: Response, _next: NextFunction) {
        const { name, email, subscribed_event_id } = req.body;

        const result = await EventService.list();
        res.status(httpStatus.OK).json(result);
    }
}