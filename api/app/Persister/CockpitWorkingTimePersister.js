/**
 * Created on 01.09.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */
const { whitelist } = require('bmax-utils');
const { get, assign } = require('lodash');

const CockpitWorkingTime = use('App/Models/CockpitWorkingTime');
const CockpitWorkTypePersister = use('App/Persister/CockpitWorkTypePersister');
const CockpitTimeTypePersister = use('App/Persister/CockpitTimeTypePersister');

/**
 * @class CockpitWorkingTimePersister
 */
class CockpitWorkingTimePersister {
    /**
     * Constructor of CockpitUserWeeklyWorkingTimesPersister
     */
    constructor() {
        this.cockpitTimeTypePersister = new CockpitTimeTypePersister();
        this.cockpitWorkTypePersister = new CockpitWorkTypePersister();
    }

    /**
     * Persists the working times in the database
     *
     * @param {CockpitUsersWeeklyWorkingTime} weeklyWorkingTime : CockpitUsersWeeklyWorkingTime
     * @param {object[]} workingTimes : object[] : The working times
     * @return {Promise<any>} : The persist promise
     */
    async persistInDatabase(weeklyWorkingTime, workingTimes) {
        const savedWorkingTimes = [];

        for (let i = 0; i < workingTimes.length; i += 1) {
            const workingTime = workingTimes[i];
            const workingTimeData = assign(
                {},
                whitelist(workingTime, [
                    'value',
                ]),
                { cockpit_users_weekly_working_time_id: weeklyWorkingTime.id },
            );

            // eslint-disable-next-line no-await-in-loop
            const workType = await this.cockpitWorkTypePersister.persistInDatabase(get(workingTime, 'work_type', {}));
            // eslint-disable-next-line no-await-in-loop
            const timeType = await this.cockpitTimeTypePersister.persistInDatabase(get(workingTime, 'time_type', {}));

            // eslint-disable-next-line no-await-in-loop
            const savedWorkingTime = await CockpitWorkingTime.create(assign({}, workingTimeData, {
                cockpit_work_type_id: workType.id,
                cockpit_time_type_id: timeType.id,
            }));

            savedWorkingTimes.push(assign({}, savedWorkingTime.toJSON(), {
                work_type: workType,
                time_type: timeType,
            }));
        }

        return savedWorkingTimes;
    }

    /**
     * Deletes all entries for the weekly working time
     *
     * @param {CockpitUsersWeeklyWorkingTime} weeklyWorkingTime : CockpitUsersWeeklyWorkingTime
     * @return {Promise<void>} : The clean action
     */
    async clean(weeklyWorkingTime) {
        return CockpitWorkingTime
        .query()
        .where('cockpit_users_weekly_working_time_id', weeklyWorkingTime.id)
        .delete();
    }
}

module.exports = CockpitWorkingTimePersister;
