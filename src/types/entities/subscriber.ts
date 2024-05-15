import { Document } from 'mongoose';
import { ModelSanitize } from '../sanitize';
import { ObjectId } from 'bson';
import { Request } from 'express';

export interface ISubscriber {
    name: string;
    email: string;
    subscribed_events_ids: string[]
}

export interface ISubscriberDetails {
    id: string;
}

export interface ISubscribeUserData extends Omit<ISubscriber, 'subscribed_events_ids'> {
    subscribed_event_id: string; 
}

export type SubscribeRequest = Request<object, object, ISubscribeUserData>
export interface SubscriberModel extends Document<ObjectId>, ISubscriber, ModelSanitize<ISubscriberDetails> { }