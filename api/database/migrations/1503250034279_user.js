
const Schema = use('Schema');

/**
 * @class UserSchema
 */
class UserSchema extends Schema {
    /**
     * Creates the schema in the database
     *
     * @return {void}
     */
    up() {
        this.create('users', (table) => {
            table.increments();
            table.string('username').notNullable().unique();
            table.string('email', 254).notNullable().unique();
            table.string('password').notNullable();
            table.timestamps();
        });
    }

    /**
     * Drops the schema in the database
     *
     * @return {void}
     */
    down() {
        this.drop('users');
    }
}

module.exports = UserSchema;
