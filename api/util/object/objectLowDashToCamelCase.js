/**
 * Created on 01.04.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { isArray, keys } = require('lodash');
const lowDashToCamelCase = require('../string/lowDashToCamelCase');

/**
 * Converts a object with ow dash separated properties
 * to a object with camel case properties
 *
 * @param {Object} object : Object : The object to convert
 * @return {Object} : The object whose properties are converted to camel case strings
 */
const objectLowDashToCamelCase = (object) => {
    const returnObject = isArray(object) ? [] : {};
    keys(object).forEach((key) => {
        if (object[key] instanceof Object) {
            returnObject[lowDashToCamelCase(key)] = objectLowDashToCamelCase(object[key]);
        } else {
            returnObject[lowDashToCamelCase(key)] = object[key];
        }
    });
    return returnObject;
};

module.exports = objectLowDashToCamelCase;
