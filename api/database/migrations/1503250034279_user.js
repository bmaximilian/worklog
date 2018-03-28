
const Schema = use('Schema');

/**
 * @class UserSchema
 */
class UserSchema extends Schema {
    /**
     * Creates the user schema in the database
     *
     * @return {void}
     */
    up() {
        this.create('users', (table) => {
            table.increments();
            table.string('username', 80).notNullable().unique();
            table.string('email', 254).notNullable().unique();
            table.string('password', 60).notNullable();
            table.timestamps();
        });
    }

    /**
     * Drops the user schema in the database
     *
     * @return {void}
     */
    down() {
        this.drop('users');
    }
}

module.exports = UserSchema;
