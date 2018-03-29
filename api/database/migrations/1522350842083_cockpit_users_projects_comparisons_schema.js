
const Schema = use('Schema');

/**
 * @class CockpitUsersProjectsComparisonsSchema
 */
class CockpitUsersProjectsComparisonsSchema extends Schema {
    /**
     * Creates the schema in the database
     *
     * @return {void}
     */
    up() {
        this.create('cockpit_users_projects_comparisons', (table) => {
            table.increments();
            table.timestamps();
            table.integer('cockpit_user_id').unsigned().notNullable();
            table.integer('year').unsigned();
            table.integer('calendar_week').unsigned();

            table.foreign('cockpit_user_id').references('id').inTable('cockpit_users');
        });
    }

    /**
     * Drops the schema in the database
     *
     * @return {void}
     */
    down() {
        this.drop('cockpit_users_projects_comparisons');
    }
}

module.exports = CockpitUsersProjectsComparisonsSchema;
