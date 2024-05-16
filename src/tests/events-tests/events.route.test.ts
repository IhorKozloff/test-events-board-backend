import request from 'supertest';
import app from '../../../app';
import httpStatus from 'http-status';
import { setDatabaseConnection } from "../utils/setDatabaseConnection";
import { setMockSettings } from "../utils/setMockSettings";
import { defaultEvent, defaultEventId, secondaryEvent, secondaryEventId, setDefaultEvents, setEventsInDB } from '../fixtures/events-fixtures';
import { firstDefaultSubsriber, secondDefaultSubsriber, setDefaultSubsribersList } from '../fixtures/subscribers-fixtures';


setDatabaseConnection();
setMockSettings();

describe('GET:/api/events/', () => {
    it('Should return all events', async () => {

        await setDefaultEvents();

        expect.assertions(3);

        const result = await request(app)
            .get('/api/events');

        expect(result.status).toBe(httpStatus.OK);
        expect(result.body.length).toBe(1);
        expect(result.body).toEqual(expect.arrayContaining(
            [
                expect.objectContaining({
                    ...defaultEvent,
                    eventDate: defaultEvent.eventDate.toISOString(),
                    id: defaultEventId,
                })
            ]
        ));
    });

    it('Should return event with available_status property', async () => {

        await setDefaultEvents();

        expect.assertions(3);

        const result = await request(app)
            .get('/api/events');

        expect(result.status).toBe(httpStatus.OK);
        expect(result.body.length).toBe(1);
        expect(result.body[0]).toHaveProperty('available_status');
    });

    it('Should return event with available_status (available), the event has not yet occurred.', async () => {

        jest.spyOn(Date, 'now')
        .mockReturnValue(
          new Date('2011-01-01').getTime(),
        );

        await setDefaultEvents();

        expect.assertions(3);

        const result = await request(app)
            .get('/api/events');

        expect(result.status).toBe(httpStatus.OK);
        expect(result.body.length).toBe(1);
        expect(result.body).toEqual(expect.arrayContaining(
            [
                expect.objectContaining({
                    available_status: 'available',
                })
            ]
        ));
    });

    it('Should return event with available_status (expired), the event is over.', async () => {

        jest.spyOn(Date, 'now')
        .mockReturnValue(
          new Date('2099-01-01').getTime(),
        );

        await setDefaultEvents();

        expect.assertions(3);

        const result = await request(app)
            .get('/api/events');

        expect(result.status).toBe(httpStatus.OK);
        expect(result.body.length).toBe(1);
        expect(result.body).toEqual(expect.arrayContaining(
            [
                expect.objectContaining({
                    available_status: 'expired',
                })
            ]
        ));
    });
});

describe('GET:/api/events/:id', () => {
    it('Should return one event with details information', async () => {
        await Promise.all([
            setDefaultEvents(),
            setEventsInDB([
                {
                    ...secondaryEvent,
                    id: secondaryEventId,
                }
            ]),
            setDefaultSubsribersList()
        ])

        expect.assertions(2);

        const result = await request(app)
            .get(`/api/events/${defaultEventId}`);

            expect(result.status).toBe(httpStatus.OK);
            expect(result.body).toEqual(
                    expect.objectContaining({
                        ...defaultEvent,
                        eventDate: defaultEvent.eventDate.toISOString(),
                        id: defaultEventId,
                        subscribers: expect.arrayContaining([
                            expect.objectContaining({
                                name: firstDefaultSubsriber.name,
                                email: firstDefaultSubsriber.email,
                            }),
                            expect.objectContaining({
                                name: secondDefaultSubsriber.name,
                                email: secondDefaultSubsriber.email,
                            })
                        ])
                    })
            );
    })
});