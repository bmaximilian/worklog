const Model = use('Model');

/**
 * @class CockpitUser
 */
class CockpitUser extends Model {
    /**
     * The cockpit working times of the user.
     *
     * @method workingTimes
     *
     * @return {Object} : Returns one or more working times
     */
    workingTimes() {
        return this.hasMany('App/Models/CockpitUsersWeeklyWorkingTime');
    }

    /**
     * The cockpit project comparisons of the user.
     *
     * @method projectsComparisons
     *
     * @return {Object} : Returns one or more comparisons
     */
    projectsComparisons() {
        return this.hasMany('App/Models/CockpitUsersProjectsComparisons');
    }
}

module.exports = CockpitUser;
