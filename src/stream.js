/**
 * @module src/stream
 */

const EventEmitter = require('events').EventEmitter;
const util = require('util');
const Post = require('./models').Post;
const logger = require('./logger').get();

/**
 * @class
 * @extends {events/EventEmitter}
 * @param {array} tags
 * @param {twitter/Stream} twitterStream
 */
var Stream = function (tags, twitterStream) {
    emmiter = this;

    twitterStream.on('data', function (tweet) {
        if (logger.debug()) {
            logger.debug(tweet, 'received tweet');
        }

        if (Post.isLegal(tweet)) {
            emmiter.emit('post', new Post(tweet));
        } else if (logger.debug()) {
            logger.debug({ tweet: tweet }, 'ignored tweet; illegal');
        }
    });

    twitterStream.on('error', function (err) {
        logger.error(err, 'encountered error while streaming');
        this.emit('error', err);
    });
};

util.inherits(Stream, EventEmitter);

module.exports = Stream;
