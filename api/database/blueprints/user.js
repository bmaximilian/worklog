/**
 * Created on 29.03.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const Hash = use('Hash');

/**
 * Blueprint for user seed
 *
 * @param {Object} faker : Object : The db faker
 * @returns {Object} : The seed blueprint
 */
export default async faker => ({
    username: faker.username(),
    password: await Hash.make(faker.password()),
});
