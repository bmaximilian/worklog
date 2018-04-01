
const { test } = use('Test/Suite')('Request Service Test');
const RequestProvider = use('Request');

test('Should send a GET request', async ({ assert }) => {
    const apiUrl = 'https://swapi.co/api/people/1';
    const method = RequestProvider.methods.GET;
    const response = await RequestProvider.fetch(apiUrl, method);
    assert.equal(response.name, 'Luke Skywalker');
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
    assert.equal(response.title, body.title);
    assert.equal(response.body, body.body);
    assert.equal(response.userId, body.userId);
    assert.isNumber(response.id);
}).timeout(0);
