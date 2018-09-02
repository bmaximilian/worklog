/**
 * Created on 01.09.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { blacklist } = require('bmax-utils');
const { get, assign } = require('lodash');

const CockpitUserModel = use('App/Models/CockpitUser');
const CockpitUserWeeklyWorkingTimesPersister = use('App/Persister/CockpitUserWeeklyWorkingTimesPersister');
const CockpitUserProjectsComparisonsPersister = use('App/Persister/CockpitUserProjectsComparisonsPersister');

/**
 * @class CockpitUserPersister
 */
class CockpitUserPersister {
    /**
     * Constructor of CockpitUserPersister
     */
    constructor() {
        this.cockpitUserWeeklyWorkingTimesPersister = new CockpitUserWeeklyWorkingTimesPersister();
        this.cockpitUserProjectsComparisonsPersister = new CockpitUserProjectsComparisonsPersister();
    }

    /**
     * Saves the complete user
     *
     * @param {Object} formattedJson Object : The user json
     * @return {void}
     */
    async persistInDatabase(formattedJson) {
        const userData = blacklist(
            formattedJson,
            [
                'weekly_working_times',
                'projects_comparisons',
            ],
        );
        let user = await CockpitUserModel.findBy('uuid', get(userData, 'uuid'));
        const weeklyWorkingTimes = get(formattedJson, 'weekly_working_times', []);
        const projectsComparisons = get(formattedJson, 'projects_comparisons', []);

        if (user) {
            user.merge(userData);
            await user.save();
        } else {
            user = await CockpitUserModel.create(userData);
        }

        const savedWeeklyWorkingTimes = await this.cockpitUserWeeklyWorkingTimesPersister.persistInDatabase(
            user,
            weeklyWorkingTimes,
        );
        const savedProjectsComparisons = await this.cockpitUserProjectsComparisonsPersister.persistInDatabase(
            user,
            projectsComparisons,
        );

        return assign({}, user, {
            weekly_working_times: savedWeeklyWorkingTimes,
            projects_comparisons: savedProjectsComparisons,
        });
    }
}

module.exports = CockpitUserPersister;
