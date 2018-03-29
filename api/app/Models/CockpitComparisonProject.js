
const Model = use('Model');

/**
 * @class CockpitComparisonProject
 */
class CockpitComparisonProject extends Model {
    /**
     * The cockpit project
     *
     * @method project
     *
     * @return {Object} : Returns one projects of the comparison
     */
    project() {
        return this.hasOne('App/Models/CockpitProject');
    }
}

module.exports = CockpitComparisonProject;
