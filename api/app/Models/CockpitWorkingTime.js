
const Model = use('Model');

/**
 * @class CockpitWorkingTime
 */
class CockpitWorkingTime extends Model {
    /**
     * The cockpit time type
     * (i.e holiday, project, vacation)
     *
     * @method timeType
     *
     * @return {Object} : Returns one time type of the working time
     */
    timeType() {
        return this.hasOne('App/Models/CockpitTimeType');
    }

    /**
     * The cockpit work type
     * (i.e scheduled, fulfilled)
     *
     * @method workType
     *
     * @return {Object} : Returns one work type of the working time
     */
    workType() {
        return this.hasOne('App/Models/CockpitWorkType');
    }
}

module.exports = CockpitWorkingTime;
