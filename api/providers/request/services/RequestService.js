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
    isEmpty,
    keys,
} = require('lodash');
const { formatGetUrlParameters, objectLowDashToCamelCase } = require('../../../util');

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
        this.methodsArray = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
        this.responseTypes = {
            JSON: 'JSON',
            TEXT: 'TEXT',
            BUFFER: 'BUFFER',
            DEFAULT: 'DEFAULT',
        };
    }

    /**
     * Returns the allowed methods
     *
     * @return {{
     * GET: String,
     * POST: String,
     * PUT: String,
     * PATCH: String,
     * DELETE: String,
     * }} : The allowed methods
     */
    get methods() {
        const buffer = {};
        this.methodsArray.forEach((method) => {
            buffer[method] = method;
        });
        return buffer;
    }

    /**
     * Sets a default header
     *
     * @param {String} key : String : Key of the header
     * @param {String} value : String : Value of the header
     * @param {String} method : String : The method to set the header for
     * @returns {void}
     */
    setDefaultHeader(key, value, method = null) {
        const parsedMethod = toUpper(method);
        if (!isString(key)) throw new Error('The key must be a string');
        if (!isString(value)) throw new Error('The value must be a string');
        if (method && (!isString(method) || !includes(this.methodsArray, parsedMethod))) {
            throw new Error(`The method must be a string and one of ${this.methodsArray.join(', ')}`);
        }

        if (method) {
            this.headers[parsedMethod][key] = value;
        } else {
            keys(this.headers).forEach((headerMethod) => {
                this.headers[headerMethod][key] = value;
            });
        }
        this.logger.debug(`RequestProvider: Setting default header ${key} to ${value}`);
    }

    /**
     * Creates a parsed response object
     *
     * @param {Object} response : Object : The fetch response
     * @param {Object} body : Object : The parsed body
     * @return {{status, body: *}} : The parsed response
     */
    mapToResponse(response, body) {
        return {
            status: response.status,
            body: objectLowDashToCamelCase(body),
        };
    }

    /**
     * Fetches data from an api
     *
     * @param {String} apiUrl : String : The api url
     * @param {String} method : String : The method
     * @param {Object} body : Object : The request body
     * @param {Object} headers : Object : The request headers
     * @param {String} responseType : String : The response type
     * @return {Promise} : The fetch promise
     */
    fetch(apiUrl, method = this.methods.GET, body = {}, headers = {}, responseType = this.responseTypes.JSON) {
        const parsedMethod = toUpper(method);
        let parsedApiUrl = apiUrl;

        if (!isString(apiUrl)) throw new Error('Parameter 1 must be a string');
        if (!isString(method) || !includes(this.methodsArray, parsedMethod)) {
            throw new Error(`Parameter 2 must be a string and one of ${this.methodsArray.join(', ')}`);
        }
        if (!isObject(body)) throw new Error('Parameter 3 must be an object');
        if (!isObject(headers)) throw new Error('Parameter 4 must be an object');

        this.logger.info(`RequestProvider: ${parsedMethod} - ${apiUrl}`);
        let params = {
            method: parsedMethod,
            headers: assign({}, this.headers[parsedMethod], headers),
        };

        if (method !== this.methods.GET) {
            params = assign(params, { body: JSON.stringify(body) });
        } else if (isObject(body) && !isEmpty(body)) {
            parsedApiUrl += formatGetUrlParameters(body);
        }

        return fetch(parsedApiUrl, params)
            .then(async (response) => {
                switch (responseType) {
                    case this.responseTypes.JSON:
                        return this.mapToResponse(response, await response.json());
                    case this.responseTypes.TEXT:
                        return this.mapToResponse(response, await response.text());
                    case this.responseTypes.BUFFER:
                        return this.mapToResponse(response, await response.buffer());
                    default:
                        return response;
                }
            });
    }
}

module.exports = RequestService;
