/**
 * Created on 01.04.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { ServiceProvider } = require('@adonisjs/fold');
const RequestService = require('./services/RequestService');

/**
 * @class RequestProvider
 */
class RequestProvider extends ServiceProvider {
    /**
     * Registers the request provider
     *
     * @return {void}
     */
    register() {
        this.app.singleton('Request', () => {
            const Config = this.app.use('Adonis/Src/Config');
            return new (RequestService)(Config);
        });
    }
}

module.exports = RequestProvider;
