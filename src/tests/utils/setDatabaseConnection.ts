import mongoose from 'mongoose';
import { Events } from '../../models/event.model';
import { Subscribers } from '../../models/subscriber.model';

export const setDatabaseConnection = () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb+srv://eyeshield21:112212qw@cluster0.6nmjspu.mongodb.net/db-events-board-tests?retryWrites=true&w=majority');
    });

    beforeEach(async () => {
        await Events.deleteMany();
        await Subscribers.deleteMany();
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });
};