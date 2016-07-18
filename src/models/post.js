/**
 * @module src/models/post
 */

const _ = require('lodash');
const Media = require('./media');

const SOURCE                    = 'twitter';

const TWEET_CREATED_AT          = 'created_at';
const TWEET_ID                  = 'id_str';
const TWEET_RETWEETED_COUNT     = 'retweet_count';
const TWEET_TEXT                = 'text';
const TWEET_USER                = 'user';
const TWEET_ENTITIES            = 'entities';

const USER_ID                   = 'id_str';
const USER_NAME                 = 'name';
const USER_SCREENNAME           = 'screen_name';

const ENTITY_MEDIA              = 'media';

/**
 * @class
 * @param {object} tweet
 */
var Post = function (tweet) {
    var media = tweet[TWEET_ENTITIES][ENTITY_MEDIA];

    this.id             = tweet[TWEET_ID];
    this.content        = tweet[TWEET_TEXT];
    this.created_at     = tweet[TWEET_CREATED_AT];
    this.num_shares     = tweet[TWEET_RETWEETED_COUNT];
    this.user_id        = tweet[TWEET_USER][USER_ID];
    this.user_name      = tweet[TWEET_USER][USER_NAME];
    this.user_nickname  = tweet[TWEET_USER][USER_SCREENNAME];
    this.source         = SOURCE;
    this.media          = [];

    if (_.isArray(media)) {
        for (var i = 0; i < media.length; i++) {
            var item = media[i];
            if (Media.isLegal(item)) {
                this.media.push(new Media(item));
            }
        }
    }
};

/**
 * @returns {object}
 */
Post.prototype.get = function () {
    return {
        id:             this.id,
        content:        this.content,
        created_at:     this.created_at,
        num_shares:     this.num_shares,
        user_id:        this.user_id,
        user_name:      this.user_name,
        user_nickname:  this.user_nickname,
        source:         this.source,
        media:          this.media
    }
};

/**
 * @param {object} tweet
 * @returns {boolean}
 */
Post.isLegal = function (tweet) {
    return tweet;
}

module.exports = Post;
