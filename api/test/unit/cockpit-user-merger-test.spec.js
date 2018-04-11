const { test } = use('Test/Suite')('Cockpit User Merger Test');
const CockpitUserMerger = use('App/Mergers/CockpitUserMerger');

test('Should convert a user from the cockpit API to a database user', async ({ assert }) => {
    const cockpitApiUser = {
        firstname: 'Maximilian',
        joined: '2017-07-01',
        lastname: 'Beck',
        left: null,
        mocoActive: true,
        relationship: 'intern',
        uuid: 'a99a5a0a-482c-4130-847a-47b3e71ade6f',
        workingHours: 40,
        analytics: {
            comparison: [
                '2018-17/VEG: Deviation between scheduled and booked time -8 (-100%)',
                '2018-17/MMVP: Deviation between scheduled and booked time -32 (-100%)',
                '2018-16/VEG: Deviation between scheduled and booked time -8 (-100%)',
                '2018-16/MMVP: Deviation between scheduled and booked time -32 (-100%)',
                '2018-15/MMVP: Deviation between scheduled and booked time -22.25 (-70%)',
                '2018-15/BAC: Deviation between scheduled and booked time +5.75 (+100%)',
                '2018-14/VEG: Deviation between scheduled and booked time -2.5 (-31%)',
                '2018-14/BAC: Deviation between scheduled and booked time +1.75 (+100%)',
                '2018-14/ACAD: Deviation between scheduled and booked time +1.5 (+100%)',
                '2018-13/SVC: Deviation between scheduled and booked time +0.25 (+100%)',
                '2018-13/BAC: Deviation between scheduled and booked time +1.25 (+100%)',
                '2018-13/ACAD: Deviation between scheduled and booked time +4.75 (+100%)',
                '2018-12/VEG: Deviation between scheduled and booked time -15.75 (-98%)',
                '2018-12/SVC: Deviation between scheduled and booked time -19.25 (-80%)',
                '2018-12/MMVP: Deviation between scheduled and booked time +31.5 (+100%)',
                '2018-12/BAC: Deviation between scheduled and booked time +0.5 (+100%)',
                '2018-12/ACAD: Deviation between scheduled and booked time +8 (+100%)',
                '2018-11/VEG: Deviation between scheduled and booked time +3 (+38%)',
                '2018-11/SVP: Deviation between scheduled and booked time +2.25 (+100%)',
                '2018-11/SVC: Deviation between scheduled and booked time +5.75 (+36%)',
                '2018-11/MMVP: Deviation between scheduled and booked time -11.75 (-73%)',
                '2018-11/DLH: Deviation between scheduled and booked time +4.75 (+100%)',
                '2018-11/ACAD: Deviation between scheduled and booked time +1 (+100%)',
            ],
            overtime: -42.5,
            projects: [
                '2018-12: Too much projects: Max 2, booked 3',
                '2018-11: Too much projects: Max 2, booked 5',
            ],
            schedules: [],
            workingTimes: [],
        },
        comparison: {
            '2018-17': {
                MMVP: -32,
                VEG: -8,
            },
            '2018-16': {
                MMVP: -32,
                VEG: -8,
            },
            '2018-15': {
                MMVP: -22.25,
                VEG: -0.75,
                BAC: 5.75,
            },
            '2018-14': {
                MMVP: -4.5,
                VEG: -2.5,
                ACAD: 1.5,
                BAC: 1.75,
            },
            '2018-13': {
                MMVP: -5.25,
                BAC: 1.25,
                SVC: 0.25,
                ACAD: 4.75,
            },
            '2018-12': {
                VEG: -15.75,
                SVC: -19.25,
                MMVP: 31.5,
                ACAD: 8,
                BAC: 0.5,
            },
            '2018-11': {
                VEG: 3,
                MMVP: -11.75,
                SVC: 5.75,
                ACAD: 1,
                SVP: 2.25,
                DLH: 4.75,
            },
        },
        sickness: {
            2018: { taken: 120 },
        },
        overtime: {
            2018: 1.5,
        },
        vacations: {
            2018: { total: 256, taken: 32, rest: 224 },
        },
        workingTimes: {
            '2018-04': {
                scheduled: {
                    Holiday: 8,
                    Project: 152,
                    Rest: 8,
                    Absence: 0,
                    Sickness: 0,
                    Vacation: 0,
                },
                fulfilled: {
                    project: 49.5,
                    training: 1.5,
                    nonBillable: 9,
                    billable: 42,
                    overtime: -101,
                },
                kpis: {
                    project: 33,
                    training: 1,
                    billable: 28,
                },
            },
        },
    };

    const Merger = new CockpitUserMerger(cockpitApiUser);
    const convertedUser = Merger.convertRemoteUserToDatabaseModel();

    assert.isObject(convertedUser);
    assert.isString(convertedUser.firstName);
    assert.isString(convertedUser.lastName);
    assert.isString(convertedUser.uuid);
    assert.isBoolean(convertedUser.mocoActive);
    assert.isNumber(convertedUser.workingHoursPerWeek);
    assert.isString(convertedUser.relationship);
    assert.isString(convertedUser.joined);
    assert.isNumber(convertedUser.totalVacationHours);
    assert.isNumber(convertedUser.takenVacationHours);
    assert.isNumber(convertedUser.sicknessHours);
    assert.isNumber(convertedUser.overtime);

    assert.isArray(convertedUser.weeklyWorkingTimes);
    assert.isNotEmpty(convertedUser.weeklyWorkingTimes);
    assert.lengthOf(convertedUser.weeklyWorkingTimes, 1);

    assert.isObject(convertedUser.weeklyWorkingTimes[0]);
    assert.isNotEmpty(convertedUser.weeklyWorkingTimes[0]);

    assert.isNumber(convertedUser.weeklyWorkingTimes[0].year);
    assert.isNumber(convertedUser.weeklyWorkingTimes[0].calendarWeek);

    assert.isArray(convertedUser.weeklyWorkingTimes[0].workingTimes);
    assert.isNotEmpty(convertedUser.weeklyWorkingTimes[0].workingTimes);
    assert.lengthOf(convertedUser.weeklyWorkingTimes[0].workingTimes, 14);

    assert.isObject(convertedUser.weeklyWorkingTimes[0].workingTimes[0]);
    assert.isNotEmpty(convertedUser.weeklyWorkingTimes[0].workingTimes[0]);

    assert.isNumber(convertedUser.weeklyWorkingTimes[0].workingTimes[0].value);

    assert.isObject(convertedUser.weeklyWorkingTimes[0].workingTimes[0].timeType);
    assert.isNotEmpty(convertedUser.weeklyWorkingTimes[0].workingTimes[0].timeType);
    assert.isString(convertedUser.weeklyWorkingTimes[0].workingTimes[0].timeType.name);
    // assert.isString(convertedUser.weeklyWorkingTimes[0].workingTimes[0].timeType.description);
    assert.isObject(convertedUser.weeklyWorkingTimes[0].workingTimes[0].workType);
    assert.isString(convertedUser.weeklyWorkingTimes[0].workingTimes[0].workType.name);
    // assert.isString(convertedUser.weeklyWorkingTimes[0].workingTimes[0].workType.description);

    assert.isArray(convertedUser.projectsComparisons);
    assert.isNotEmpty(convertedUser.projectsComparisons);
    assert.lengthOf(convertedUser.projectsComparisons, 7);

    assert.isObject(convertedUser.projectsComparisons[0]);
    assert.isNotEmpty(convertedUser.projectsComparisons[0]);

    assert.isNumber(convertedUser.projectsComparisons[0].year);
    assert.isNumber(convertedUser.projectsComparisons[0].calendarWeek);

    assert.isArray(convertedUser.projectsComparisons[0].projects);
    assert.isNotEmpty(convertedUser.projectsComparisons[0].projects);
    assert.lengthOf(convertedUser.projectsComparisons[0].projects, 2);

    assert.isObject(convertedUser.projectsComparisons[0].projects[0]);
    assert.isNotEmpty(convertedUser.projectsComparisons[0].projects[0]);
    assert.isNumber(convertedUser.projectsComparisons[0].projects[0].value);
    assert.isObject(convertedUser.projectsComparisons[0].projects[0].project);
    assert.isNotEmpty(convertedUser.projectsComparisons[0].projects[0].project);
    assert.isString(convertedUser.projectsComparisons[0].projects[0].project.shortName);
    // assert.isString(convertedUser.projectsComparisons[0].projects[0].project.name);
});
