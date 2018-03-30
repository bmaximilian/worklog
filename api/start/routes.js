
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route');
const apiPrefix = '/api/v1';

Route.get('/', () => ({ greeting: 'Hello world in JSON' }));

Route
    .group(() => {
        Route.get('/users', 'CockpitUserController.index');
    })
    .prefix(`${apiPrefix}/cockpit`);
