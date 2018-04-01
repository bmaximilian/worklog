/**
 * Created on 01.04.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { isString } = require('lodash');

/**
 * Formats json params to get uri params
 *
 * @param {Object} params : Object : The parameters to format
 * @return {string} : The formatted parameters
 */
module.exports = (params) => {
    const paramString = Object
        .keys(params)
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');

    return isString(paramString) && paramString.length > 0 ? `?${paramString}` : '';
};
