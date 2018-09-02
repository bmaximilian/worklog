/**
 * Created on 01.09.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { whitelist } = require('bmax-utils');
const { get } = require('lodash');

const CockpitWorkType = use('App/Models/CockpitWorkType');

/**
 * @class CockpitWorkTypePersister
 */
class CockpitWorkTypePersister {
    /**
     * Persists the work types in the database
     * Creates a new or returns the existing
     *
     * @param {object[]} workType : object[] : The work type
     * @return {Promise<void>} : A promise returning the work type from the database
     */
    async persistInDatabase(workType) {
        let workTypeFromDatabase = await CockpitWorkType.findBy('name', get(workType, 'name'));

        if (!workTypeFromDatabase) {
            workTypeFromDatabase = await CockpitWorkType.create(whitelist(workType, [
                'name',
                'description',
            ]));
        }

        return workTypeFromDatabase.toJSON();
    }
}

module.exports = CockpitWorkTypePersister;
