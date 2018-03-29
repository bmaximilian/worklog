const Schema = use('Schema');

/**
 * References calendar week and year to a user
 * @class CockpitUsersWeeklyWorkingTimesSchema
 */
class CockpitUsersWeeklyWorkingTimesSchema extends Schema {
    /**
     * Creates the schema in the database
     *
     * @return {void}
     */
    up() {
        this.create('cockpit_users_weekly_working_times', (table) => {
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
        this.drop('cockpit_users_weekly_working_times');
    }
}

module.exports = CockpitUsersWeeklyWorkingTimesSchema;
