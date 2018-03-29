
const Model = use('Model');

/**
 * @class CockpitUsersProjectsComparison
 */
class CockpitUsersProjectsComparison extends Model {
    /**
     * The cockpit projects of the user.
     *
     * @method projects
     *
     * @return {Object} : Returns one or more projects
     */
    projects() {
        return this.belongsToMany('App/Models/CockpitComparisonProject');
    }
}

module.exports = CockpitUsersProjectsComparison;
