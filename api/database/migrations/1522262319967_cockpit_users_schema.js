const Schema = use('Schema');

/**
 * @class CockpitUsersSchema
 */
class CockpitUsersSchema extends Schema {
    /**
     * Creates the token schema in the database
     *
     * @return {void}
     */
    up() {
        this.create('cockpit_users', (table) => {
            table.increments();
            table.timestamps();
            table.string('first_name');
            table.string('last_name');
            table.string('uuid');
            table.boolean('moco_active');
            table.integer('working_hours_per_week');
            table.string('relationship');
            table.date('joined');
            table.integer('total_vacation_hours');
            table.integer('taken_vacation_hours');
            table.integer('sickness_hours');
            table.integer('overtime');
        });
    }

    /**
     * Drops the token schema in the database
     *
     * @return {void}
     */
    down() {
        this.drop('cockpit_users');
    }
}

module.exports = CockpitUsersSchema;
