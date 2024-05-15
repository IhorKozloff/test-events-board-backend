import { AvailableStatusType, IEventDetails, IEventInfo } from '../types/entities/event';
import { Events } from '../models/event.model';
import {eventData} from '../../eventsData'
import { Subscribers } from '../models/subscriber.model';
import { errorMessages } from '../errors';
import { AppError } from '../types/AppError';
export class EventService {

    static async list(): Promise<IEventDetails[]> {
        
        const allEvents = await Events.find({});
        
        if (allEvents.length === 0) {
            return [];
        }

        const now = Date.now();

        return allEvents.map(item => {
            const sanitizedItem = item.sanitize();
            const currentDate = new Date(sanitizedItem.eventDate).getTime();

            let available_status: AvailableStatusType = 'available';

            if (currentDate < now) {
                available_status = 'expired';
            }

            return {
                ...sanitizedItem,
                available_status
            };
        });
    }

    static async findById(eventId: string): Promise<IEventInfo> {
        const event = await Events.findById(eventId);

        if (!event) {
            throw new AppError(404, errorMessages.EVENTS.EVENT_NOT_FOUND);
        }

        const subscribers = await Subscribers.find({subscribed_events_ids: eventId});
  
        return {
            ...event.sanitize(),
            subscribers: [
                ...subscribers.map(item => {
                    return {
                        name: item.name,
                        email: item.email
                    }
                })
            ]
        }

    }

    static async create(): Promise<void> {
        await Events.insertMany(eventData.map(item => {
            return {
                ...item,
                eventDate: new Date(item.eventDate).toISOString()
            }
        }))
    }

}