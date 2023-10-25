import 'jest';
import IntegrationHelpers from '../../helpers/Integration-helpers';
import User from '../../../src/models/User';


describe('User model', () => {
    beforeAll(async() => {
        await IntegrationHelpers.runDatabaseMigrations();
    });

    afterAll(async() => {
        await IntegrationHelpers.clearDatabase();
    })

    test('it saves a users auth id', async () => {
        const user = await new User({userAuthId: '123abc'}).save();

        expect(user.userAuthId).toBeDefined();
    })
})