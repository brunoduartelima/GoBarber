import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        updateProfile = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);
    });

    it('should be able to update the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@mail.com',
            password: '123456'
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Tree',
            email: 'johntree@mail.com',
        });

        expect(updatedUser.name).toBe('John Tree');
        expect(updatedUser.email).toBe('johntree@mail.com');
    });

    it('should not be able to change to another user email', async () => {
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@mail.com',
            password: '123456'
        });

        const user = await fakeUsersRepository.create({
            name: 'John Up',
            email: 'upload@mail.com',
            password: '123456'
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Tree',
                email: 'johndoe@mail.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@mail.com',
            password: '123456'
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Tree',
            email: 'johntree@mail.com',
            old_password: '123456',
            password: '123123'
        });

        expect(updatedUser.password).toBe('123123');
    });

    it('should not be able to update the password without old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@mail.com',
            password: '123456'
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Tree',
                email: 'johntree@mail.com',
                password: '123123'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password with wrong old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@mail.com',
            password: '123456'
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Tree',
                email: 'johntree@mail.com',
                old_password: 'wrong-old-password',
                password: '123123'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

});