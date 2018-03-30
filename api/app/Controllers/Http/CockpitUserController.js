
const CockpitUserModel = use('App/Models/CockpitUser');

/**
 * @class CockpitUserController
 */
class CockpitUserController {
    /**
     * Returns all the cockpit users
     *
     * @returns {Object} : The cockpit user
     */
    async index() {
        return CockpitUserModel.all();
    }

    /**
     * Returns an user selected by id
     *
     * @param {Object} params : Object : The request parameters
     * @returns {Promise<void>} : Returns the requested user
     */
    async show({ params }) {
        return CockpitUserModel.find(params.id);
    }
}

module.exports = CockpitUserController;
