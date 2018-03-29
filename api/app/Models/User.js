
const Model = use('Model');

/**
 * @class User
 */
class User extends Model {
    /**
     * Boots the model
     *
     * @return {void}
     */
    static boot() {
        super.boot();

        /**
     * A hook to hash the user password before saving
     * it to the database.
     *
     * Look at `app/Models/Hooks/User.js` file to
     * check the hashPassword method
     */
        this.addHook('beforeCreate', 'User.hashPassword');
    }

    /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object} : Returns one or more tokens of the user
   */
    tokens() {
        return this.hasMany('App/Models/Token');
    }

    /**
     * The cockpit users of the user. Depending on permissions of the cockpit
     *
     * @method cockpitUsers
     *
     * @return {Object} : Returns one or more cockpit users of the user
     */
    cockpitUsers() {
        return this.belongsToMany('App/Models/CockpitUser');
    }
}

module.exports = User;
