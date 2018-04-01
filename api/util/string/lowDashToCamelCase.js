/**
 * Created on 01.04.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

/**
 * Converts a low dash separated string to camel case string
 *
 * @param {String} str : String : The string to convert
 * @return {string} : The converted string
 */
module.exports = (str) => {
    const string = str.toString().trim();
    if (string === string.toString().toUpperCase()) {
        return string;
    }

    // save starting low dashes
    let first = '';
    let execString = string;
    while (execString.toString().charAt(0) === '_') {
        first += execString.toString().charAt(0);
        execString = execString.toString().slice(1);
    }

    // Convert string to camelCase
    execString = execString.replace(/_+([^_]+)/g, (whole, match) => match.charAt(0).toUpperCase() + match.slice(1));

    const out = first + execString;
    return out.length > first.length ? out : string;
};
