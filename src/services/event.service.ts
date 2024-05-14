import { IEventDetails } from '../types/entities/event';
import { Events } from '../models/event.model';

export class EventService {

    static async list(): Promise<IEventDetails[]> {
        
        const allEvents = await Events.find({});
        
        if (allEvents.length === 0) {
            return [];
        }

        return allEvents.map(item => {
            const sanitizedItem = item.sanitize();
            return sanitizedItem;
        });
    }

    static async create(): Promise<any> {
        
        const result = await Events.create({
            title: "Halloween Party",
            description: "Halloween party, yeah! It will be fun!",
            eventDate: new Date().toISOString(),
            organizer: "Pumpkin Jack",
        });

        return result
    }

}