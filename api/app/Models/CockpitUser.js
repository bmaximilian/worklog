const Model = use('Model');

/**
 * @class CockpitUser
 */
class CockpitUser extends Model {
    /**
     * The cockpit working times of the user.
     *
     * @method weeklyWorkingTimes
     *
     * @return {Object} : Returns one or more working times
     */
    weeklyWorkingTimes() {
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
        return this.hasMany('App/Models/CockpitUsersProjectsComparison');
    }
}

module.exports = CockpitUser;
