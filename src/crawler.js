/**
 * @module src/crawler
 */

const _ = require('lodash');
const Twitter = require('twitter');
const Stream = require('./stream');
const logger = require('./logger').get();

/**
 * @constant
 * @type {string}
 * API endpoint to start a new status filter.
 */
const API_STATUSES_FILTER = 'statuses/filter';

/**
 * @class
 * @param {object} config Twitter client configuration. See the
 *  {link:https://github.com/desmondmorris/node-twitter|package documentation}
 *  for details.
 */
var Crawler = function (config) {
    var client;

    config = _.defaults(config || {}, {
        consumer: {},
        accessToken: {}
    });

    client = new Twitter({
        consumer_key:           config.consumer.key,
        consumer_secret:        config.consumer.secret,
        access_token_key:       config.accessToken.key,
        access_token_secret:    config.accessToken.secret
    });

    if (logger.debug()) {
        logger.debug('insantiated twitter client');
    }

    /**
     * @param {array} tags Collection of terms to crawl for. 
     * @returns {bluebird/Promise} Resolves to a Stream object once the stream
     *  has started.
     */
    function followTags (tags) {
        return new Promise(function (resolve) {
            var track = tags.join(',');

            if (logger.debug()) {
                logger.debug('following tags: %s', track);
            }

            client.stream(API_STATUSES_FILTER, {
                track: tags.join(',')
            }, function (stream) {
                resolve(new Stream(tags, stream));
            });
        });
    }

    this.crawl = followTags;
};

module.exports = Crawler;
