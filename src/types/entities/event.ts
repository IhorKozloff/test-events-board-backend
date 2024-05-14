import { Document } from 'mongoose';
import { ModelSanitize } from '../sanitize';
import { ObjectId } from 'bson';

export interface IEvent {
    title: string;
    description: string;
    eventDate: Date;
    organizer: string;
}

export interface IEventDetails extends IEvent {
    id: ObjectId;
}

export interface EventModel extends Document<ObjectId>, IEvent, ModelSanitize<IEventDetails> { }