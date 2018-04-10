/**
 * Created on 01.04.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const {
    assign,
    concat,
    get,
    isString,
    isObject,
} = require('lodash');
const { replacePlaceholderString } = require('../../../util');
const RequestService = require('./RequestService');

/**
 * @class CockpitRequestService
 */
class CockpitRequestService extends RequestService {
    /**
     * Constructor of CockpitRequestService
     *
     * @param {Object} config : Object : The provider config
     */
    constructor(config) {
        super(config);
        this.config = config.cockpit;
        this.token = '';
    }

    /**
     * Sends a login request
     *
     * @param {String} email : String : The username of the user
     * @param {String} password : String : The password of the user
     * @return {Promise} : Returns the login request
     */
    login(email, password) {
        return this.fetch(
            `${this.config.baseRoute}${this.config.apiRoutes.login}`,
            this.methods.POST,
            {
                email,
                password,
            },
        )
            .then((response) => {
                this.token = `Bearer ${response.body.token}`;
                this.setDefaultHeader('Authorization', this.token);
                return response;
            });
    }

    /**
     * Returns the active and inactive employees
     *
     * @return {Promise} : The active and inactive employees
     */
    getEmployees() {
        return this.fetch(
            `${this.config.baseRoute}${this.config.apiRoutes.employees}`,
            this.methods.GET,
        )
            .then(response => get(response, 'body.data.employees', {}));
    }

    /**
     * Returns the employee data for one year
     *
     * @param {String} uuid : String : The uuid of the user
     * @param {String} year : String : The requested year
     * @return {Promise} : The employee data of the requested user for the requested year
     */
    getEmployeeDataForYear(uuid, year) {
        const route = replacePlaceholderString(
            `${this.config.baseRoute}${this.config.apiRoutes.employeeEmployeeDataForYear}`,
            {
                uuid,
                year,
            },
        );

        return this.fetch(
            route,
            this.methods.GET,
        )
            .then(response => get(response, 'body.data', {}));
    }

    /**
     * Fetches all the data since an employee joined
     *
     * @param {Object} employee : Object : The Employee to fetch
     * @return {Promise} : All the employee data
     */
    async fetchEmployeeData(employee) {
        if (!isObject(employee)) throw new Error('Employee must be an object');
        if (!isString(employee.uuid)) throw new Error('Employee must have a parameter "uuid" as string');
        if (!isString(employee.joined)) throw new Error('Employee must have a parameter "joined" as date string.');

        let year = new Date().getFullYear();
        const minYear = new Date(employee.joined).getFullYear();

        const fetchedEmployee = {
            analytics: {
                comparison: [],
                overtime: 0,
                projects: [],
                schedules: [],
                workingTimes: [],
            },
            comparison: {},
            sickness: {},
            overtime: {},
            vacations: {},
            workingTimes: {},
        };

        while (year > minYear - 1) {
            // Need to do the await in loop because need to fetch employee data for every year
            // eslint-disable-next-line no-await-in-loop
            const employeeBuffer = await this.getEmployeeDataForYear(employee.uuid, year.toString());

            fetchedEmployee.analytics.comparison = concat(
                fetchedEmployee.analytics.comparison,
                employeeBuffer.analytics.comparison,
            );

            fetchedEmployee.analytics.overtime += employeeBuffer.analytics.overtime;

            fetchedEmployee.analytics.projects = concat(
                fetchedEmployee.analytics.projects,
                employeeBuffer.analytics.projects,
            );

            fetchedEmployee.analytics.schedules = concat(
                fetchedEmployee.analytics.schedules,
                employeeBuffer.analytics.schedules,
            );

            fetchedEmployee.analytics.workingTimes = concat(
                fetchedEmployee.analytics.workingTimes,
                employeeBuffer.analytics.workingTimes,
            );

            fetchedEmployee.comparison = assign(
                fetchedEmployee.comparison,
                employeeBuffer.comparison,
            );

            fetchedEmployee.sickness = assign(
                fetchedEmployee.sickness,
                {
                    [year]: employeeBuffer.sickness,
                },
            );

            fetchedEmployee.overtime = assign(
                fetchedEmployee.overtime,
                {
                    [year]: employeeBuffer.analytics.overtime,
                },
            );

            fetchedEmployee.vacations = assign(
                fetchedEmployee.vacations,
                {
                    [year]: employeeBuffer.vacations.absolute,
                },
            );

            fetchedEmployee.workingTimes = assign(
                fetchedEmployee.workingTimes,
                employeeBuffer.workingTimes,
            );

            year -= 1;
        }

        return fetchedEmployee;
    }
}

module.exports = CockpitRequestService;
