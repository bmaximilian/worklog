/**
 * Created on 01.09.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

/**
 * @class CockpitUserProjectsComparisonsPersister
 */
class CockpitUserProjectsComparisonsPersister {
    /**
     * Constructor of CockpitUserProjectsComparisonsPersister
     */
    constructor() {}

    /**
     * Persists the projects comparisons in the database
     *
     * @param {CockpitUser} userModel : CockpitUser : The user model
     * @param {object[]} projectsComparisons : object[] : The projects comparisons
     * @return {Promise<void>} : The persist promise
     */
    async persistInDatabase(userModel, projectsComparisons) {
    }
}

module.exports = CockpitUserProjectsComparisonsPersister;
