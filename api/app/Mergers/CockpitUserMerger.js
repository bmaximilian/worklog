/**
 * Created on 30.03.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { get } = require('lodash');

const CockpitUserModel = use('App/Models/CockpitUser');

/**
 * @class CockpitUserMerger
 */
class CockpitUserMerger {
    /**
     * Constructor of CockpitUserMerger
     *
     * @param {Object} remoteUser : Object : The user from the cockpit api
     * @returns {void}
     */
    constructor(remoteUser) {
        this.remoteUser = remoteUser;
    }

    /**
     * Merges the user data
     *
     * @param {Object} remoteUser : Object : The user from the cockpit api
     * @returns {Object} : The database user
     */
    async merge(remoteUser = this.remoteUser) {
        const user = await CockpitUserModel.findBy('uuid', get(remoteUser, 'uuid'));

        if (!user) {
            return CockpitUserModel.create(this.sanitize(remoteUser));
        }

        return user.fill(remoteUser);
    }

    /**
     * Sanitizes the remote user
     *
     * @param {Object} remoteUser : Object : The user from the cockpit api
     * @returns {Object} : The sanitized remote user
     */
    sanitize(remoteUser = this.remoteUser) {
        return remoteUser;
    }
}

module.exports = CockpitUserMerger;
