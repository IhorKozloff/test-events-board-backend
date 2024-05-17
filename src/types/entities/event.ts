import { Document } from 'mongoose';
import { ModelSanitize } from '../sanitize';
import { ObjectId } from 'bson';
import { ISubscriber } from './subscriber';
import { IFilterEventsQueryParams } from './filter';
import { Request } from 'express';

export const KnownAvailableStatusTypes = ['available', 'expired'] as const;
export type AvailableStatusType = typeof KnownAvailableStatusTypes[number]

export type ISubscriberData = Omit<ISubscriber, 'subscribed_events_ids'>

export interface IEvent {
    title: string;
    description: string;
    eventDate: Date;
    organizer: string;
}

export interface IEventDetails extends IEvent {
    id: string;
    available_status: AvailableStatusType;
}

export interface IEventInfo extends Omit<IEventDetails, 'available_status'> {
    subscribers: ISubscriberData[]
}

export type IEventsListQueryRequest = Request<object, object, object, IFilterEventsQueryParams>

export interface EventModel extends Document<ObjectId>, IEvent, ModelSanitize<Omit<IEventDetails, 'available_status'>> { }