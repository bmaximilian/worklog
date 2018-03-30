/**
 * Created on 30.03.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { ServiceProvider } = require('@adonisjs/fold');
const fetch = require('node-fetch');
const { get } = require('lodash');

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
    fetch() {
        return fetch();
    }
}

module.exports = RequestProvider;
