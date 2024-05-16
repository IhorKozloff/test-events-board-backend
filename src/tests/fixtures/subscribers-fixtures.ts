import { Subscribers } from "../../models/subscriber.model";
import { ISubscriber } from "../../types/entities/subscriber"
import { defaultEventId } from "./events-fixtures"

export const firstDefaultSubsriber: ISubscriber = {
    name: 'Dany',
    email: 'dany@gmail.com',
    subscribed_events_ids: [defaultEventId]
};

export const secondDefaultSubsriber: ISubscriber = {
    name: 'Jack',
    email: 'jack@gmail.com',
    subscribed_events_ids: [defaultEventId]
};


export const setDefaultSubsribersList = () => {
    const preparedData = [
        firstDefaultSubsriber,
        secondDefaultSubsriber
    ]
    return Subscribers.insertMany(preparedData);
}