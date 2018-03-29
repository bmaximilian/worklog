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
 * @param {Number} i : Number : The increment
 * @param {Object} data : Object : Additional data
 * @returns {Object} : The seed blueprint
 */
module.exports = async (faker, i, data) => ({
    username: data.username || faker.username(),
    password: await Hash.make(data.password || faker.password()),
    email: data.email || faker.email(),
});
