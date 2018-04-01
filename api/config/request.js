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
    headers: {
        GET: {},
        POST: {
            'Content-Type': 'application/json',
        },
        PUT: {
            'Content-Type': 'application/json',
        },
        PATCH: {
            'Content-Type': 'application/json',
        },
        DELETE: {
            'Content-Type': 'application/json',
        },
    },
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
            login: '/auth/login',
            employees: '/employees',
            employeeData: '/employees/{uuid}',
            employeeEmployeeDataForYear: '/employees/{uuid}/{year}',
        },
    },
};
