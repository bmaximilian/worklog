
const { test } = use('Test/Suite')('Cockpit User Test');
const Env = use('Env');
const CockpitRequest = use('CockpitRequest');

if (Env.get('COCKPIT_USER') !== 'null') {
    test('Should login', async ({ assert }) => {
        const login = await CockpitRequest.login(Env.get('COCKPIT_USER'), Env.get('COCKPIT_PASSWORD'));

        assert.isNumber(login.body.expiresIn);
        assert.equal(login.body.status, 'ok');
    }).timeout(0);

    test('Should fetch Employees data', async ({ assert }) => {
        await CockpitRequest.login(Env.get('COCKPIT_USER'), Env.get('COCKPIT_PASSWORD'));
        const employees = await CockpitRequest.getEmployees();

        assert.isObject(employees);
        assert.isArray(employees.active);
        assert.lengthOf(employees.active, 1);
        assert.property(employees.active[0], 'firstname');
        assert.property(employees.active[0], 'lastname');
        assert.property(employees.active[0], 'joined');
        assert.property(employees.active[0], 'left');
        assert.property(employees.active[0], 'mocoActive');
        assert.property(employees.active[0], 'relationship');
        assert.property(employees.active[0], 'uuid');
        assert.property(employees.active[0], 'workingHours');
    }).timeout(0);

    test('Should fetch all data of the employee', async ({ assert }) => {
        await CockpitRequest.login(Env.get('COCKPIT_USER'), Env.get('COCKPIT_PASSWORD'));
        const employees = await CockpitRequest.getEmployees();
        const employeeData = await CockpitRequest.fetchEmployeeData(employees.active[0]);

        assert.isObject(employees);
        assert.isObject(employeeData);

        assert.isObject(employeeData.analytics);
        assert.isArray(employeeData.analytics.comparison);
        assert.isNotEmpty(employeeData.analytics.comparison);
        assert.isArray(employeeData.analytics.projects);
        assert.isNotEmpty(employeeData.analytics.projects);
        assert.isArray(employeeData.analytics.schedules);
        assert.isNotEmpty(employeeData.analytics.schedules);
        assert.isArray(employeeData.analytics.workingTimes);
        assert.isNotEmpty(employeeData.analytics.workingTimes);
        assert.isNumber(employeeData.analytics.overtime);

        assert.isObject(employeeData.comparison);
        assert.isNotEmpty(employeeData.comparison);

        assert.isObject(employeeData.sickness);
        assert.isNotEmpty(employeeData.sickness);

        assert.isObject(employeeData.overtime);
        assert.isNotEmpty(employeeData.overtime);

        assert.isObject(employeeData.vacations);
        assert.isNotEmpty(employeeData.vacations);

        assert.isObject(employeeData.workingTimes);
        assert.isNotEmpty(employeeData.workingTimes);
    }).timeout(0);
}
