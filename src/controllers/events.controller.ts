import { NextFunction, Request, Response } from 'express';
import { EventService } from '../services/event.service';
import httpStatus from 'http-status';

export class EventsController {

    static async getAllEvents(req: Request, res: Response, _next: NextFunction) {
        const result = await EventService.list();
        res.status(httpStatus.OK).json(result);
    }

    static async getEventById(req: Request, res: Response, _next: NextFunction) {
        const { id } = req.params;

        const result = await EventService.findById(id);
        res.status(httpStatus.OK).json(result);
    }

    static async create(req: Request, res: Response, _next: NextFunction) {
        const result = await EventService.create();
        res.status(200).json(result);
    }
}