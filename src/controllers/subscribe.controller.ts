
import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { SubscribeRequest } from '../types/entities/subscriber';
import { SubscribeService } from '../services/subscribe.service';

export class SubscribeController {

    static async subscribeUser(req: SubscribeRequest, res: Response, _next: NextFunction) {
        const result = await SubscribeService.create(req.body);
        res.status(httpStatus.OK).json(result);
    }
}