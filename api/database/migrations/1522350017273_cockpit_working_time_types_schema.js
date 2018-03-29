const Schema = use('Schema');

/**
 * working time type (i.e scheduled, fulfilled)
 * @class CockpitWorkingTimeTypesSchema
 */
class CockpitWorkingTimeTypesSchema extends Schema {
    /**
     * Creates the schema in the database
     *
     * @return {void}
     */
    up() {
        this.create('cockpit_working_time_types', (table) => {
            table.increments();
            table.timestamps();
            table.string('name').notNullable().unique();
            table.string('description');
        });
    }

    /**
     * Drops the schema in the database
     *
     * @return {void}
     */
    down() {
        this.drop('cockpit_working_time_types');
    }
}

module.exports = CockpitWorkingTimeTypesSchema;
