
/*
 |--------------------------------------------------------------------------
 | UserSeeder
 |--------------------------------------------------------------------------
 |
 | Make use of the Factory instance to seed database with dummy data or
 | make use of Lucid models directly.
 |
 */

const Factory = use('Factory');
const Logger = use('Logger');

/**
 * @class UserSeeder
 */
class UserSeeder {
    /**
     * Runs the seeder
     * @returns {void}
     */
    async run() {
        await Factory
            .model('App/Models/User')
            .createMany(5);

        await Factory
            .model('App/Models/User')
            .create({
                username: 'bilbo.baggins',
                email: 'bilbo.baggins@example.net',
                password: 'test123',
            });

        Logger.info('Seeded users table');
    }
}

module.exports = UserSeeder;
