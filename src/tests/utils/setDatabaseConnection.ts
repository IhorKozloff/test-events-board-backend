import mongoose from 'mongoose';
import { Events } from '../../models/event.model';
import { Subscribers } from '../../models/subscriber.model';

const { MONGO_TEST_URL } = process.env;

export const setDatabaseConnection = () => {
    beforeAll(async () => {
        await mongoose.connect(MONGO_TEST_URL!);
    });

    beforeEach(async () => {
        await Events.deleteMany();
        await Subscribers.deleteMany();
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });
};