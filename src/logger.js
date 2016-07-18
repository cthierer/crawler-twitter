/**
 * @module src/logger
 */

const _ = require('lodash');
const bunyan = require('bunyan');

/**
 * @constant
 * @type {object}
 * Reference to the project's package.json file.
 */
const packageFile = require('../package.json');

var logger;

/**
 * Singleton accessor to retrieve an instance of the application logger.
 * @param {object} options Logger configuration.
 * @param {string} options.name The application's name. If not provided,
 *  defaults to the application name pulled from the package.json file.
 * @returns {bunyan/Logger} Instance of the Bunyan logger.
 */
function get (options) {
    if (!logger) {
        init(options);
    }

    return logger;
}

/**
 * Initialize a new logger singleton.
 * @param {object} options Logger configuration. See
 *  {link:https://github.com/trentm/node-bunyan|Bunyan documentation} for
 *  more details.
 */
function init (options) {
    options = _.defaults(options || {}, {
        name: packageFile.name
    });

    logger = bunyan.createLogger(options);
}

module.exports = {
    get: get,
    init: init
};
