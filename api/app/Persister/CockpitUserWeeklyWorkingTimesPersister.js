/**
 * Created on 01.09.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { whitelist } = require('bmax-utils');
const { get, assign } = require('lodash');

const CockpitUsersWeeklyWorkingTime = use('App/Models/CockpitUsersWeeklyWorkingTime');
const CockpitWorkingTimePersister = use('App/Persister/CockpitWorkingTimePersister');

/**
 * @class CockpitUserWeeklyWorkingTimesPersister
 */
class CockpitUserWeeklyWorkingTimesPersister {
    /**
     * Constructor of CockpitUserWeeklyWorkingTimesPersister
     */
    constructor() {
        this.cockpitWorkingTimePersister = new CockpitWorkingTimePersister();
    }

    /**
     * Persists the weekly working times in the database
     *
     * @param {CockpitUser} userModel : CockpitUser : The user model
     * @param {object[]} weeklyWorkingTimes : object[] : The weekly working times
     * @return {Promise<any>} : The persist promise
     */
    async persistInDatabase(userModel, weeklyWorkingTimes) {
        await this.clean(userModel);
        const savedWeeklyWorkingTimes = [];

        for (let i = 0; i < weeklyWorkingTimes.length; i += 1) {
            const weeklyWorkingTime = weeklyWorkingTimes[i];
            const weeklyWorkingTimeData = assign(
                {},
                whitelist(weeklyWorkingTime, [
                    'year',
                    'calendar_week',
                ]),
                { cockpit_user_id: userModel.id },
            );

            // eslint-disable-next-line no-await-in-loop
            const savedWeeklyWorkingTime = await CockpitUsersWeeklyWorkingTime.create(weeklyWorkingTimeData);

            // eslint-disable-next-line no-await-in-loop
            const savedWorkingTimes = await this.cockpitWorkingTimePersister.persistInDatabase(
                savedWeeklyWorkingTime,
                get(weeklyWorkingTime, 'working_times', []),
            );

            savedWeeklyWorkingTimes.push(assign({}, savedWeeklyWorkingTime.toJSON(), {
                working_times: savedWorkingTimes,
            }));
        }

        return savedWeeklyWorkingTimes;
    }

    /**
     * Deletes all entries for the user
     *
     * @param {CockpitUser} userModel : CockpitUser : The user model
     * @return {Promise<void>} : The clean action
     */
    async clean(userModel) {
        const weeklyWorkingTimes = await CockpitUsersWeeklyWorkingTime
        .query()
        .where('cockpit_user_id', userModel.id);

        weeklyWorkingTimes.forEach((weeklyWorkingTime) => {
            this.cockpitWorkingTimePersister.clean(weeklyWorkingTime);
        });

        await CockpitUsersWeeklyWorkingTime
        .query()
        .where('cockpit_user_id', userModel.id)
        .delete();

        return weeklyWorkingTimes;
    }
}

module.exports = CockpitUserWeeklyWorkingTimesPersister;
