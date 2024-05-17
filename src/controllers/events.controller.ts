import { NextFunction, Request, Response } from 'express';
import { EventService } from '../services/event.service';
import httpStatus from 'http-status';
import { IEventsListQueryRequest } from '../types/entities/event';

export class EventsController {

    static async getAllEvents(req: IEventsListQueryRequest, res: Response, _next: NextFunction) {
        const result = await EventService.list(req.query);
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