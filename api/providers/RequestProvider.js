/**
 * Created on 30.03.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { ServiceProvider } = require('@adonisjs/fold');
const fetch = require('node-fetch');
const {
    get,
    includes,
    toUpper,
    isObject,
    isString,
} = require('lodash');

/**
 * @class RequestProvider
 */
class RequestProvider extends ServiceProvider {
    /**
     * Boots the provider
     *
     * @return {void}
     */
    boot() {
        this.config = get(this.app.use('Adonis/Src/Config'), '_config.request', {});
    }

    /**
     * Fetched data from an api
     *
     * @return {Promise} : A promise which is returning the data
     */
    fetch(apiUrl, method = 'GET', body = {}, headers = {}) {
        if (!isString(apiUrl)) throw new Error('Parameter 1 must be a string');
        if (!isString(method) || !includes(['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], toUpper(method))) {
            throw new Error('Parameter 2 must be a string and one of GET, POST, PUT, PATCH or DELETE');
        }
        if (!isObject(body)) throw new Error('Parameter 3 must be an object');
        if (!isObject(headers)) throw new Error('Parameter 4 must be an object');

        return fetch(
            apiUrl,
            {
                method: toUpper(method),
                body,
                headers,
            },
        );
    }
}

module.exports = RequestProvider;
