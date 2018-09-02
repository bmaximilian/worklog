/**
 * Created on 01.09.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { whitelist } = require('bmax-utils');
const { get } = require('lodash');

const CockpitTimeType = use('App/Models/CockpitTimeType');

/**
 * @class CockpitTimeTypePersister
 */
class CockpitTimeTypePersister {
    /**
     * Persists the time types in the database
     * Creates a new or returns the existing
     *
     * @param {object[]} timeType : object[] : The time type
     * @return {Promise<void>} : A promise returning the time type from the database
     */
    async persistInDatabase(timeType) {
        let timeTypeFromDatabase = await CockpitTimeType.findBy('name', get(timeType, 'name'));

        if (!timeTypeFromDatabase) {
            timeTypeFromDatabase = await CockpitTimeType.create(whitelist(timeType, [
                'name',
                'description',
            ]));
        }

        return timeTypeFromDatabase.toJSON();
    }
}

module.exports = CockpitTimeTypePersister;
