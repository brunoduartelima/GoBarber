import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let listProviderMonthAvailability: ListProviderMonthAvailabilityService;
let fakeAppoinmentsRepository: FakeAppointmentsRepository;

describe('ListProviderMonthAvailability', () => {
    beforeEach(() => {
        fakeAppoinmentsRepository = new FakeAppointmentsRepository();
        listProviderMonthAvailability = new ListProviderMonthAvailabilityService(fakeAppoinmentsRepository);
    });

    it('should be able to list the month availability from provider', async () => {
        await fakeAppoinmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2021, 4, 20, 8, 0, 0),
        });
        
        await fakeAppoinmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2021, 4, 20, 9, 0, 0),
        });

        await fakeAppoinmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2021, 4, 20, 10, 0, 0),
        });

        await fakeAppoinmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2021, 4, 20, 11, 0, 0),
        });

        await fakeAppoinmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2021, 4, 20, 12, 0, 0),
        });

        await fakeAppoinmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2021, 4, 20, 13, 0, 0),
        });

        await fakeAppoinmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2021, 4, 20, 14, 0, 0),
        });

        await fakeAppoinmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2021, 4, 20, 15, 0, 0),
        });

        await fakeAppoinmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2021, 4, 20, 16, 0, 0),
        });

        await fakeAppoinmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2021, 4, 20, 17, 0, 0),
        });

        await fakeAppoinmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2021, 4, 21, 8, 0, 0),
        });

        const availability = await listProviderMonthAvailability.execute({
            provider_id: 'user',
            year: 2021,
            month: 5,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { day: 19, available: true },
                { day: 20, available: false },
                { day: 21, available: true },
                { day: 22, available: true },
            ]),
        );
    });
});