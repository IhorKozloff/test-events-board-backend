import { ObjectId } from 'bson';
import { IEvent, IEventDetails } from '../../types/entities/event';
import { Events } from '../../models/event.model';
import { omit } from 'lodash';

export const defaultEventId = new ObjectId().toHexString();
export const defaultEventDate = new Date('2024, 6, 2');
export const defaultEvent: IEvent = {
    title: 'Bakery China',
    description: 'World\'s leading exhibition of baking products and services.',
    eventDate: defaultEventDate,
    organizer: 'Sam Lee',
};

export const secondaryEventId = new ObjectId().toHexString();
export const secondaryEventDate = new Date('2024, 7, 17');
export const secondaryEvent: IEvent = {
    title: 'Palm Beach Home Design and Remodeling Show',
    description: 'A Wealth of Ideas Under One Roof.',
    eventDate: secondaryEventDate,
    organizer: 'Home Show Management Corp.',
};

export const setEventsInDB = async (events: Array<Omit<IEventDetails, 'available_status'>>) => {
    const preparedData = events.map(item => {
        return {
            ...omit(item, ['id']),
            _id: item.id,
        };
    });

    return Events.insertMany(preparedData);
};

export const setDefaultEvents = async () => {
    await setEventsInDB(
        [
            {
                ...defaultEvent,
                id: defaultEventId,
            },
        ]
    );
};
