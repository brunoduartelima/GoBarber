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
            date: new Date(2020, 3, 20, 8, 0, 0),
        });
        
        await fakeAppoinmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 8, 0, 0),
        });

        await fakeAppoinmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 10, 0, 0),
        });

        await fakeAppoinmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 21, 8, 0, 0),
        });

        const availability = await listProviderMonthAvailability.execute({
            provider_id: 'user',
            year: 2020,
            month: 5,
        });

        expect(availability).toEqual(expect.arrayContaining([
            { day: 19, available: true },
            { day: 20, available: false },
            { day: 21, available: false },
            { day: 22, available: true },
        ]));
    });

});