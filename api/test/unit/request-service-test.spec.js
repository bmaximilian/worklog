
const { test } = use('Test/Suite')('Request Service Test');
const RequestProvider = use('Request');

test('Should send a GET request', async ({ assert }) => {
    const apiUrl = 'https://swapi.co/api/people/1';
    const method = RequestProvider.methods.GET;
    const response = await RequestProvider.fetch(apiUrl, method);
    assert.equal(response.body.name, 'Luke Skywalker');
}).timeout(0);

test('Should send a POST request', async ({ assert }) => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
    const method = RequestProvider.methods.POST;
    const body = {
        title: 'foo',
        body: 'bar',
        userId: 1,
    };
    const response = await RequestProvider.fetch(apiUrl, method, body);
    assert.equal(response.body.title, body.title);
    assert.equal(response.body.body, body.body);
    assert.equal(response.body.userId, body.userId);
    assert.isNumber(response.body.id);
}).timeout(0);

test('Should send a PUT request', async ({ assert }) => {
    const body = {
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1,
    };
    const apiUrl = `https://jsonplaceholder.typicode.com/posts/${body.id}`;
    const method = RequestProvider.methods.PUT;
    const response = await RequestProvider.fetch(apiUrl, method, body);

    assert.equal(response.body.title, body.title);
    assert.equal(response.body.body, body.body);
    assert.equal(response.body.userId, body.userId);
    assert.equal(response.body.id, body.id);
}).timeout(0);

test('Should send a PATCH request', async ({ assert }) => {
    const body = {
        id: 1,
        title: 'foo',
    };
    const apiUrl = `https://jsonplaceholder.typicode.com/posts/${body.id}`;
    const method = RequestProvider.methods.PATCH;
    const response = await RequestProvider.fetch(apiUrl, method, body);

    assert.equal(response.body.title, body.title);
    assert.isString(response.body.body);
    assert.isNumber(response.body.userId);
    assert.equal(response.body.id, body.id);
}).timeout(0);

test('Should send a DELETE request', async ({ assert }) => {
    const body = {
        id: 1,
        title: 'foo',
    };
    const apiUrl = `https://jsonplaceholder.typicode.com/posts/${body.id}`;
    const method = RequestProvider.methods.DELETE;
    const response = await RequestProvider.fetch(apiUrl, method, body);

    assert.isNumber(response.status);
    assert.equal(response.status, 200);
}).timeout(0);
