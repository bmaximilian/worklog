/**
 * Created on 30.03.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const Env = use('Env');

module.exports = {
    /*
     |--------------------------------------------------------------------------
     | Headers
     |--------------------------------------------------------------------------
     |
     | Configure some default request headers
     |
     */
    headers: {},
    /*
     |--------------------------------------------------------------------------
     | Cockpit
     |--------------------------------------------------------------------------
     |
     | Configure the routes to the cockpit api
     |
     */
    cockpit: {
        baseRoute: Env.get('COCKPIT_API_URL'),
        apiRoutes: {
            login: '/api/auth/login',
        },
    },
};
