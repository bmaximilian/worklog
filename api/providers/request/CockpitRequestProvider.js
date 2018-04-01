/**
 * Created on 01.04.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { ServiceProvider } = require('@adonisjs/fold');
const CockpitRequestService = require('./services/CockpitRequestService');

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
            const Config = this.app.use('Adonis/Src/Config');
            return new (CockpitRequestService)(Config);
        });
    }
}

module.exports = CockpitRequestProvider;
