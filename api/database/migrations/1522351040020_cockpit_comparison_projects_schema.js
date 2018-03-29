
const Schema = use('Schema');

/**
 * @class CockpitComparisonProjectsSchema
 */
class CockpitComparisonProjectsSchema extends Schema {
    /**
     * Creates the schema in the database
     *
     * @return {void}
     */
    up() {
        this.create('cockpit_comparison_projects', (table) => {
            table.increments();
            table.timestamps();
            table.integer('cockpit_users_projects_comparison_id').unsigned().notNullable();
            table.integer('cockpit_project_id').unsigned().notNullable();

            table.foreign('cockpit_project_id').references('id').inTable('cockpit_projects');
            table.foreign('cockpit_users_projects_comparison_id')
                .references('id').inTable('cockpit_users_projects_comparisons');
        });
    }

    /**
     * Drops the schema in the database
     *
     * @return {void}
     */
    down() {
        this.drop('cockpit_comparison_projects');
    }
}

module.exports = CockpitComparisonProjectsSchema;
