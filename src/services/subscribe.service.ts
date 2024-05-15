import { Subscribers } from '../models/subscriber.model';
import { errorMessages } from '../errors';
import { AppError } from '../types/AppError';
import { ISubscribeUserData } from '../types/entities/subscriber';

export class SubscribeService {

    static async create(subscribeUserData: ISubscribeUserData): Promise<any> {

        const { email, name, subscribed_event_id } = subscribeUserData;

        const existingUser = await Subscribers.findOne({ email });

        if (!existingUser) {
            const result = await Subscribers.create({
                email,
                name,
                subscribed_events_ids: [subscribed_event_id]
            });
            return result;
        } else {
            if(name === existingUser.name) {
                
                const existingEvent = existingUser.subscribed_events_ids.find(item => item === subscribed_event_id);

                if (existingEvent) {

                    throw new AppError(409, errorMessages.SUBSCRIBERS.USER_ALREADY_SUBSCRIBED);

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
                    return result;
                }
            } else {
                throw new AppError(409, errorMessages.SUBSCRIBERS.EMAIL_IN_USE);
            }
        }
        
    }
}