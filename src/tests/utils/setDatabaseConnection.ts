import mongoose from 'mongoose';
import { Events } from '../../models/event.model';
import { Subscribers } from '../../models/subscriber.model';

const { DATABASE_TEST_URL } = process.env;

export const setDatabaseConnection = () => {

    beforeAll(async () => {
        await mongoose.connect(DATABASE_TEST_URL!);
    });

    beforeEach(async () => {
        await Events.deleteMany();
        await Subscribers.deleteMany();
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });
};