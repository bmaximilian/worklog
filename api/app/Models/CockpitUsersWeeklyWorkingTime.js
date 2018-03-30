
const Model = use('Model');

/**
 * @class CockpitUsersWeeklyWorkingTime
 */
class CockpitUsersWeeklyWorkingTime extends Model {
    /**
     * The cockpit working times of the week.
     *
     * @method workingTimes
     *
     * @return {Object} : Returns one or more working times
     */
    workingTimes() {
        return this.belongsToMany('App/Models/CockpitWorkingTime');
    }
}

module.exports = CockpitUsersWeeklyWorkingTime;
