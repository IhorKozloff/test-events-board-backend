import { NextFunction, Request, Response } from 'express';
import { EventService } from '../services/event.service';

export class EventsController {

    static async getAllEvents(req: Request, res: Response, _next: NextFunction) {
        const result = await EventService.list();
        res.status(200).json(result);
    }
    static async create(req: Request, res: Response, _next: NextFunction) {
        const result = await EventService.create();
        res.status(200).json(result);
    }
}