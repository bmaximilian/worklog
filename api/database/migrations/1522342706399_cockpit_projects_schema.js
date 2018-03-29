const Schema = use('Schema');

/**
 * @class CockpitProjectsSchema
 */
class CockpitProjectsSchema extends Schema {
    /**
     * Creates the schema in the database
     *
     * @return {void}
     */
    up() {
        this.create('cockpit_projects', (table) => {
            table.increments();
            table.timestamps();
            table.string('name').unique();
            table.string('short_name').notNullable().unique();
        });
    }

    /**
     * Drops the schema in the database
     *
     * @return {void}
     */
    down() {
        this.drop('cockpit_projects');
    }
}

module.exports = CockpitProjectsSchema;
