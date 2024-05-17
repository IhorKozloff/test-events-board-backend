import { Subscribers } from '../models/subscriber.model';
import { errorMessages } from '../errors';
import { AppError } from '../types/AppError';
import { ISubscribeUserData, ISubscriberDetails } from '../types/entities/subscriber';
import httpStatus from 'http-status';

export class SubscribeService {

    static async create(subscribeUserData: ISubscribeUserData): Promise<ISubscriberDetails> {

        const { email, name, subscribed_event_id } = subscribeUserData;

        const existingUser = await Subscribers.findOne({ email });

        if (!existingUser) {
            const result = await Subscribers.create({
                email,
                name,
                subscribed_events_ids: [subscribed_event_id]
            });
            return result.sanitize();
        } else {
            if(name === existingUser.name) {
                
                const existingEvent = existingUser.subscribed_events_ids.find(item => item === subscribed_event_id);

                if (existingEvent) {

                    throw new AppError(httpStatus.CONFLICT, errorMessages.SUBSCRIBERS.USER_ALREADY_SUBSCRIBED);

                } else {

                    const result = await Subscribers.findOneAndUpdate(
                        {
                            email: existingUser.email,
                        },
                        
                        {
                            subscribed_events_ids: [
                                ...existingUser.subscribed_events_ids,
                                subscribed_event_id
                            ],
                        }, 
                        {
                            new: true,
                        }
                    );
                    
                    if (result) {
                        return result!.sanitize();
                    } else {
                        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, errorMessages.SUBSCRIBERS.EMAIL_IN_USE);
                    }
                    
                }
            } else {
                throw new AppError(httpStatus.CONFLICT, errorMessages.SUBSCRIBERS.EMAIL_IN_USE);
            }
        }
        
    }
}