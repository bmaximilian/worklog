
const Schema = use('Schema');

/**
 * References
 *  time type (i.e holiday, project, vacation),
 *  working time type (i.e scheduled, fulfilled)
 * to a weekly working time
 * @class CockpitWorkingTimesSchema
 */
class CockpitWorkingTimesSchema extends Schema {
    /**
     * Creates the schema in the database
     *
     * @return {void}
     */
    up() {
        this.create('cockpit_working_times', (table) => {
            table.increments();
            table.timestamps();
            table.integer('cockpit_time_type_id').unsigned().notNullable();
            table.integer('cockpit_working_time_type_id').unsigned().notNullable();
            table.integer('cockpit_users_weekly_working_time_id').unsigned().notNullable();
            table.integer('value').notNullable();

            table.foreign('cockpit_time_type_id').references('id').inTable('cockpit_time_types');
            table.foreign('cockpit_working_time_type_id').references('id').inTable('cockpit_working_time_types');
            table.foreign('cockpit_users_weekly_working_time_id')
                .references('id').inTable('cockpit_users_weekly_working_times');
        });
    }

    /**
     * Drops the schema in the database
     *
     * @return {void}
     */
    down() {
        this.drop('cockpit_working_times');
    }
}

module.exports = CockpitWorkingTimesSchema;
