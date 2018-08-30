const { Command } = require('@adonisjs/ace');
const { get, toLower, assign } = require('lodash');

const Env = use('Env');
const Logger = use('Logger');
const CockpitRequest = use('CockpitRequest');
const CockpitUserMerger = use('App/Mergers/CockpitUserMerger');

/**
 * @class GetCockpitUsers
 */
class GetCockpitUsers extends Command {
    /**
     * Returns the command signature
     *
     * @return {string} : The signature
     */
    static get signature() {
        return `
            get:cockpit:users
            { --user=@value : The username (email) of the user to get }
            { --token=@value : The API token if existing }
            { --all : If all users should be consolidated }
        `;
    }

    /**
     * Returns the command description
     *
     * @return {string} : The description
     */
    static get description() {
        return 'Fetches the user of the WTL Cockpit';
    }

    /**
     * Executes the command
     *
     * @param {Object} args : Object : The arguments
     * @param {Object} options : Object : The options
     * @return {Promise<void>} : The command execution
     */
    async handle(args, options) {
        let username;
        let { token } = options;
        if (!token) {
            token = Env.get('COCKPIT_TOKEN');
        }
        if (token) {
            CockpitRequest.setDefaultHeader('Authorization', `Bearer ${token}`);
        } else {
            username = await this.askForLoginCredentials(options);
        }

        await this.fetchUser(options, username);
        return Promise.resolve(true);
    }

    /**
     * Fetches one or more users from the cockpit
     *
     * @param {Object} options : Object : the cli options
     * @param {string} username? : string : the username
     * @return {Promise<void>} : The request
     */
    async fetchUser(options, username) {
        let employees = await CockpitRequest.getEmployees();
        employees = get(employees, 'active', []);

        if (username && !options.all) {
            employees = employees
                .filter(employee =>
                    `${toLower(get(employee, 'firstname', ''))}.${toLower(get(employee, 'lastname', ''))}@wtl.de`
                    === username);
        }

        return Promise.all(employees.map(async (employee) => {
            try {
                const employeeData = await CockpitRequest.fetchEmployeeData(employee);
                const cockpitUserMerger = new CockpitUserMerger(assign({}, employee, employeeData));

                return await cockpitUserMerger.merge();
            } catch (e) {
                Logger.error(e.message);
                return Promise.reject(e);
            }
        }));
    }

    /**
     * Asks for login credentials and performs a login
     *
     * @param {Object} options : Object : The cli options
     * @return {Promise<*>} : The login request
     */
    async askForLoginCredentials(options) {
        let { username } = options;
        if (!username) {
            username = Env.get('COCKPIT_USER');
        }
        if (!username) {
            username = await this.ask('Enter your username or e-mail address');
        }

        let password = Env.get('COCKPIT_PASSWORD');
        if (!password) {
            password = await this.secure('Enter the password of the user');
        }

        const response = await CockpitRequest.login(username, password);

        if (response.body.status !== 'ok') {
            throw new Error('Could not log in');
        }

        return options.all ? null : username;
    }
}

module.exports = GetCockpitUsers;
