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

            table.integer('cockpit_project_id').unsigned().notNullable()
            .references('id')
            .inTable('cockpit_projects');

            table.integer('cockpit_project_comparison_type_id').unsigned().notNullable()
            .references('id')
            .inTable('cockpit_project_comparison_types');

            table.integer('value').notNullable();

            table.foreign('cockpit_users_projects_comparison_id', 'ccp_cupc_id_foreign')
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
