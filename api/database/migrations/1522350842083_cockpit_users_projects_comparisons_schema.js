
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
            table.integer('cockpit_user_id').unsigned().notNullable()
                .references('id')
                .inTable('cockpit_users');
            table.integer('year').unsigned().notNullable();
            table.integer('calendar_week').unsigned().notNullable();
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
