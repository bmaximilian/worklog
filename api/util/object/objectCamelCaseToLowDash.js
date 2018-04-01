/**
 * Created on 01.04.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { isArray, keys } = require('lodash');
const camelCaseToLowDash = require('../string/camelCaseToLowDash');

/**
 * Converts a object with camel case properties
 * to a object with low dash separated properties
 *
 * @param {Object} object : Object : The object to convert
 * @return {Object} : The object whose properties are converted to low dash separated strings
 */
const objectCamelCaseToLowDash = (object) => {
    const returnObject = isArray(object) ? [] : {};
    keys(object).forEach((key) => {
        if (object[key] instanceof Object) {
            returnObject[camelCaseToLowDash(key)] = objectCamelCaseToLowDash(object[key]);
        } else {
            returnObject[camelCaseToLowDash(key)] = object[key];
        }
    });
    return returnObject;
};

module.exports = objectCamelCaseToLowDash;
