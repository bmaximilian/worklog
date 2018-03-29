const Schema = use('Schema');

/**
 * @class CockpitTimeTypesSchema
 */
class CockpitTimeTypesSchema extends Schema {
    /**
     * Creates the schema in the database
     *
     * @return {void}
     */
    up() {
        this.create('cockpit_time_types', (table) => {
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
        this.drop('cockpit_time_types');
    }
}

module.exports = CockpitTimeTypesSchema;
