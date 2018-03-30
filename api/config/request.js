/**
 * Created on 30.03.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

module.exports = {
    /*
     |--------------------------------------------------------------------------
     | Cockpit
     |--------------------------------------------------------------------------
     |
     | Configure the routes to the cockpit api
     |
     */
    cockpit: {
        baseRoute: '//cockpit.webteam-leipzig.net',
        apiRoutes: {
            login: '/api/auth/login',
        },
    },
};
