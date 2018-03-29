const Schema = use('Schema');

/**
 * @class CockpitUsersSchema
 */
class CockpitUsersSchema extends Schema {
    /**
     * Creates the schema in the database
     *
     * @return {void}
     */
    up() {
        this.create('cockpit_users', (table) => {
            table.increments();
            table.timestamps();
            table.integer('user_id').unsigned().references('id').inTable('users');
            table.string('first_name').notNullable();
            table.string('last_name').notNullable();
            table.string('uuid');
            table.boolean('moco_active').defaultTo(false);
            table.integer('working_hours_per_week').defaultTo(0);
            table.string('relationship');
            table.date('joined');
            table.integer('total_vacation_hours').notNullable().defaultTo(0);
            table.integer('taken_vacation_hours').notNullable().defaultTo(0);
            table.integer('sickness_hours').notNullable().defaultTo(0);
            table.integer('overtime').notNullable().defaultTo(0);
        });
    }

    /**
     * Drops the schema in the database
     *
     * @return {void}
     */
    down() {
        this.drop('cockpit_users');
    }
}

module.exports = CockpitUsersSchema;
