/**
 * Created on 01.04.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { forOwn } = require('lodash');

/**
 * Replaces a placeholder string
 *  Placeholders look like: {key}
 *  Example: "The id is {id}" => "The id is 1"
 *
 * @param {String} string : String : The string to replace in
 * @param {Object} placeholders : Object : An object whose keys are the placeholders
 * @return {String} : The replaced string
 */
module.exports = (string, placeholders) => {
    let newString = string.toString();

    forOwn(placeholders, (value, key) => {
        newString = newString.replace(new RegExp(`{${key}}`, 'g'), value);
    });

    return newString;
};
