import { Schema, model } from 'mongoose';
import { omit } from 'lodash';
import { EventModel } from '../types/entities/event';

const EventSchema: Schema = new Schema({
    title: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: true },
    organizer: { type: Schema.Types.String, required: true },
    eventDate: { type: Schema.Types.Date, required: true },
}, { timestamps: true });

EventSchema.method('sanitize', function (_model: EventModel) {
    const data = this.toJSON({ virtuals: true });
    return {
        ...omit(data, ['createdAt', 'updatedAt', '__v', '_id']),
    };
});

export const Events = model<EventModel>('event', EventSchema);
