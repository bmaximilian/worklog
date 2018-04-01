/**
 * Created on 30.03.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const fetch = require('node-fetch');
const {
    assign,
    includes,
    toUpper,
    isObject,
    isString,
} = require('lodash');

/**
 * @class RequestService
 */
class RequestService {
    /**
     * Constructor of RequestService
     *
     * @param {Object} config : Object : The configuration from config/request
     */
    constructor(config) {
        this.headers = config.headers;
        this.logger = use('Logger');
    }

    /**
     * Sets a default header
     *
     * @param {String} key : String : Key of the header
     * @param {String} value : String : Value of the header
     * @returns {void}
     */
    setDefaultHeader(key, value) {
        if (!isString(key)) throw new Error('The key must be a string');
        if (!isString(value)) throw new Error('The value must be a string');

        this.headers[key] = value;
        this.logger.debug(`RequestProvider: Setting default header ${key} to ${value}`);
    }

    /**
     * Fetches data from an api
     *
     * @param {String} apiUrl : String : The api url
     * @param {String} method : String : The method
     * @param {Object} body : Object : The request body
     * @param {Object} headers : Object : The request headers
     * @return {Promise} : The fetch promise
     */
    fetch(apiUrl, method = 'GET', body = {}, headers = {}) {
        const allowedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
        const parsedMethod = toUpper(method);

        if (!isString(apiUrl)) throw new Error('Parameter 1 must be a string');
        if (!isString(method) || !includes(allowedMethods, parsedMethod)) {
            throw new Error(`Parameter 2 must be a string and one of ${allowedMethods.join(', ')}`);
        }
        if (!isObject(body)) throw new Error('Parameter 3 must be an object');
        if (!isObject(headers)) throw new Error('Parameter 4 must be an object');

        this.logger.info(`RequestProvider: ${parsedMethod} - ${apiUrl}`);

        return fetch(
            apiUrl,
            {
                method: parsedMethod,
                body,
                headers: assign({}, this.headers, headers),
            },
        );
    }
}

module.exports = RequestService;
