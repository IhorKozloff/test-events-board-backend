import { AvailableStatusType, IEventDetails, IEventInfo } from '../types/entities/event';
import { Events } from '../models/event.model';
import { Subscribers } from '../models/subscriber.model';
import { errorMessages } from '../errors';
import { AppError } from '../types/AppError';
import { IFilterEventsQueryParams, ISortSettings } from '../types/entities/filter';
import httpStatus from 'http-status';
export class EventService {

    static async list(queryParams: IFilterEventsQueryParams): Promise<IEventDetails[]> {

        const {
            limit = 12,
            offset = 0,
            sortBy,
            sortDirection,
        } = queryParams;

        let searchSettings: ISortSettings = {
            skip: offset,
            limit,
        };

        if (sortBy) {
            if (sortDirection !== undefined) {
                
                searchSettings = {
                    ...searchSettings,
                    sort: {
                        [sortBy]: sortDirection
                    }
                };

            } else {
                
                searchSettings = {
                    ...searchSettings,
                    sort: {
                        [sortBy]: 1
                    }
                };
            }
        } else {
            if (sortDirection) {
                throw new AppError(httpStatus.BAD_REQUEST, errorMessages.EVENTS.MISSING_SORT_VALUE);
            } 
        }

        const allEvents = await Events.find(
            {},
            null,
            searchSettings,
        );
        
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
                    };
                })
            ]
        };
    }

    static async countTotalEvents (): Promise<number> {
        const allEvents = await Events.find();
        return allEvents.length;
    }
}