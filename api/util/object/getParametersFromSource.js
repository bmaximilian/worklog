/**
 * Created on 11.04.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const {
    get,
    forOwn,
    isObject,
    isArray,
} = require('lodash');

/**
 * Resolves the parameter from source or from defaults
 *
 * @param {Object} source : Object : The source object
 * @param {String} sourcePath : String : The path to the parameter
 * @param {Object} defaults : Object : The fallback object
 * @return {*} : The resolved parameter
 */
const resolveParameter = (source, sourcePath, defaults) => get(
    source,
    sourcePath,
    get(
        defaults,
        sourcePath,
        null,
    ),
);

/**
 * Maps the source to the parameter map
 *
 * @param {Object} source : Object : The source object
 * @param {Object} parameterMap : Object : The parameter map { [targetKey]: sourceKey }
 * @param {Object} defaults : Object : The default parameter
 * @return {Object} : The mapped source
 */
const getParametersFromSource = (source, parameterMap, defaults = {}) => {
    const buffer = {};

    forOwn(parameterMap, (value, key) => {
        if (isObject(value)) {
            buffer[key] = getParametersFromSource(source, value);
        } else if (isArray(value)) {
            buffer[key] = value.map(sourcePath => resolveParameter(source, sourcePath, defaults));
        } else {
            buffer[key] = resolveParameter(source, value, defaults);
        }
    });

    return buffer;
};

module.exports = getParametersFromSource;
