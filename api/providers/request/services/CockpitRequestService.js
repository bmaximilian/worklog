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
        this.token = '';
    }

    /**
     * Sends a login request
     *
     * @param {String} username : String : The username of the user
     * @param {String} password : String : The password of the user
     * @return {Promise} : Returns the login request
     */
    login(username, password) {
        return this.fetch(
            `${this.config.baseRoute}${this.config.apiRoutes.login}`,
            this.methods.POST,
            {
                username,
                password,
            },
        )
            .then((response) => {
                this.token = `Bearer ${response.body.token}`;
                this.setDefaultHeader('Authorization', this.token);
            });
    }
}

module.exports = CockpitRequestService;
