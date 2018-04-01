/**
 * Created on 01.04.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const RequestService = require('./RequestService');

/**
 * @class CockpitRequestService
 */
class CockpitRequestService extends RequestService {
    /**
     * Constructor of CockpitRequestService
     *
     * @param {Object} config : Object : The provider config
     */
    constructor(config) {
        super(config);
        this.config = config.cockpit;
    }
}

module.exports = CockpitRequestService;
