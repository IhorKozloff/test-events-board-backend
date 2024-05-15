import { Schema, model } from 'mongoose';
import { omit } from 'lodash';
import { SubscriberModel } from '../types/entities/subscriber';

const SubscriberSchema: Schema = new Schema({
    name: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true },
    subscribed_events_ids: { type: [Schema.Types.String], required: true },
}, { timestamps: true });

SubscriberSchema.method('sanitize', function (_model: SubscriberModel) {
    const data = this.toJSON({ virtuals: true });
    return {
        ...omit(data, ['createdAt', 'updatedAt', '__v', '_id']),
    };
});

export const Subscribers = model<SubscriberModel>('subscriber', SubscriberSchema);
