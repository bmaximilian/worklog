const Schema = use('Schema');

/**
 * @class UsersCockpitUsersSchema
 */
class UsersCockpitUsersSchema extends Schema {
    /**
     * Creates the schema in the database
     *
     * @return {void}
     */
    up() {
        this.create('users_cockpit_users', (table) => {
            table.increments();
            table.timestamps();

            table.integer('user_id').unsigned().notNullable()
                .references('id')
                .inTable('users');

            table.integer('cockpit_user_id').unsigned().notNullable()
                .references('id')
                .inTable('cockpit_users');
        });
    }

    /**
     * Drops the schema in the database
     *
     * @return {void}
     */
    down() {
        this.drop('users_cockpit_users');
    }
}

module.exports = UsersCockpitUsersSchema;
