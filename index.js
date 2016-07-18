/**
 * @module crawler-twitter
 */

const _ = require('lodash');
const src = require('./src');
const Crawler = src.Crawler;
const Logger = src.Logger;

/**
 * @param {object} config Twitter configuration.
 * @param {object} options Options.
 * @param {object} options.logging Logging configuration.
 * @returns {module:src/crawler}
 */
function getCrawler (config, options) {
    var logger;

    options = _.defaults(options || {}, {
        logger: {}
    });

    // initialize the logger using the passed in settings
    Logger.init(options.logger);
    logger = Logger.get();

    if (logger.info()) {
        logger.info('initializing Twitter crawler');
    }

    return new Crawler(config);
}

module.exports = {
    getCrawler: getCrawler
};
