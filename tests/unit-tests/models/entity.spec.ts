import 'jest';
import IntegrationHelpers from '../../helpers/Integration-helpers';
import User from '../../../src/models/User';


describe('Entity abstract class', () => {
    beforeAll(async() => {
        await IntegrationHelpers.runDatabaseMigrations();
    });

    afterAll(async() => {
        await IntegrationHelpers.clearDatabase();
    })

    test('that a model inherits all of the base level entity details', async () => {
        const user = await new User({userAuthId: '123abc'}).save();

        expect(user.internalId).toBeDefined();
        expect(user.id).toBeDefined();
        expect(user.userAuthId).toBeDefined();
    })
})