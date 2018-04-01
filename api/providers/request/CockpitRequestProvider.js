/**
 * Created on 01.04.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { ServiceProvider } = require('@adonisjs/fold');
const CockpitRequestService = require('./services/CockpitRequestService');
const { get } = require('lodash');

/**
 * @class CockpitRequestProvider
 */
class CockpitRequestProvider extends ServiceProvider {
    /**
     * Registers the request provider
     *
     * @return {void}
     */
    register() {
        this.app.singleton('CockpitRequest', () => {
            const Config = get(this.app.use('Adonis/Src/Config'), '_config.request', {});
            return new (CockpitRequestService)(Config);
        });
    }
}

module.exports = CockpitRequestProvider;
