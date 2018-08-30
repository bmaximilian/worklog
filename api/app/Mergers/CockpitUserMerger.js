/**
 * Created on 30.03.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const {
    get,
    keys,
    toLower,
    toUpper,
    flatten,
} = require('lodash');
const { whitelist, camelCaseToLowDash } = require('bmax-utils');
const { getParametersFromSource } = require('../../util');

const CockpitUserModel = use('App/Models/CockpitUser');

/**
 * @class CockpitUserMerger
 */
class CockpitUserMerger {
    /**
     * Constructor of CockpitUserMerger
     *
     * @param {Object} remoteUser : Object : The user from the cockpit api
     * @returns {void}
     */
    constructor(remoteUser) {
        this.remoteUser = remoteUser;
    }

    /**
     * Merges the user data
     *
     * @param {Object} remoteUser : Object : The user from the cockpit api
     * @returns {Object} : The database user
     */
    async merge(remoteUser = this.remoteUser) {
        const user = await CockpitUserModel.findBy('uuid', get(remoteUser, 'uuid'));
        const formattedRemoteUser = this.convertRemoteUserToDatabaseModel(remoteUser);

        if (!user) {
            return CockpitUserModel.create(this.sanitizeUser(formattedRemoteUser));
        }

        return user.fill(formattedRemoteUser);
    }

    /**
     * Sanitizes the remote user
     *
     * @param {Object} remoteUser : Object : The user from the cockpit api
     * @returns {Object} : The sanitized remote user
     */
    sanitizeUser(remoteUser = this.remoteUser) {
        return camelCaseToLowDash(whitelist(remoteUser, [
            'firstName',
            'lastName',
            'uuid',
            'mocoActive',
            'workingHoursPerWeek',
            'relationship',
            'joined',
            'totalVacationHours',
            'takenVacationHours',
            'sicknessHours',
            'overtime',
        ]));
    }

    /**
     * Converts a remote user to the database model
     *
     * @param {Object} remoteUser : Object : The user from the cockpit api
     * @returns {Object} : The CockpitUser JSON which can be inserted into the database
     */
    convertRemoteUserToDatabaseModel(remoteUser = this.remoteUser) {
        const convertedUser = getParametersFromSource(remoteUser, {
            uuid: 'uuid',
            firstName: 'firstname',
            lastName: 'lastname',
            joined: 'joined',
            left: 'left',
            mocoActive: 'mocoActive',
            workingHoursPerWeek: 'workingHours',
            relationship: 'relationship',
            totalVacationHours: 'totalVacationHours',
            takenVacationHours: 'takenVacationHours',
            sicknessHours: 'sicknessHours',
            weeklyWorkingTimes: 'weeklyWorkingTimes',
            projectsComparisons: 'projectsComparisons',
            overtime: 'overtime',
        }, {
            totalVacationHours: 0,
            takenVacationHours: 0,
            sicknessHours: 0,
            weeklyWorkingTimes: [],
            projectsComparisons: [],
        });

        convertedUser.overtime = 0;
        keys(remoteUser.overtime).forEach((year) => {
            convertedUser.overtime += remoteUser.overtime[year];
        });

        convertedUser.weeklyWorkingTimes = keys(remoteUser.workingTimes).map((key) => {
            const match = /(\d{4})-(\d{2})/.exec(key);
            const buffer = {};

            if (match && match.length > 2) {
                buffer.year = parseInt(match[1], 10);
                buffer.calendarWeek = parseInt(match[2], 10);
            }

            buffer.workingTimes = flatten(keys(remoteUser.workingTimes[key]).map(workType =>
                keys(remoteUser.workingTimes[key][workType]).map(timeType => ({
                    value: remoteUser.workingTimes[key][workType][timeType],
                    timeType: {
                        name: toLower(timeType),
                        description: null,
                    },
                    workType: {
                        name: toLower(workType),
                        description: null,
                    },
                }))));

            return buffer;
        });

        convertedUser.projectsComparisons = keys(remoteUser.comparison).map((key) => {
            const match = /(\d{4})-(\d{2})/.exec(key);
            const buffer = {};

            if (match && match.length > 2) {
                buffer.year = parseInt(match[1], 10);
                buffer.calendarWeek = parseInt(match[2], 10);
            }

            buffer.projects = keys(remoteUser.comparison[key]).map(projectShortName => ({
                value: remoteUser.comparison[key][projectShortName],
                project: {
                    name: null,
                    shortName: toUpper(projectShortName),
                },
            }));

            return buffer;
        });

        return convertedUser;
    }
}

module.exports = CockpitUserMerger;
