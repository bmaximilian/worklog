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
        this.hasMany('App/Models/CockpitUsersWeeklyWorkingTime');
    }
}

module.exports = CockpitUser;
