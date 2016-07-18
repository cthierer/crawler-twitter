/**
 * @module src/models/media
 */

const _ = require('lodash');

const MEDIA_ID                  = 'id_str';
const MEDIA_URL                 = 'media_url_https';
const MEDIA_DISPLAY             = 'display_url';
const MEDIA_TYPE                = 'type';

/**
 * @class
 * @param {object} media A Twitter media definition.
 */
var Media = function (media) {
    this.id             = media[MEDIA_ID];
    this.link           = media[MEDIA_URL];
    this.link_display   = media[MEDIA_DISPLAY];
    this.type           = media[MEDIA_TYPE];
};

/**
 * @param {object} media
 * @returns {boolean}
 */
Media.isLegal = function (media) {
    return _.has(media, MEDIA_TYPE) &&
        Media.LEGAL_TYPES.indexOf(media[MEDIA_TYPE]) >= 0;
};

/**
 * @constant
 * @type {string}
 */
Media.TYPE_PHOTO = 'photo';

/**
 * @constant
 * @type {array}
 */
Media.LEGAL_TYPES = [ Media.TYPE_PHOTO ];

module.exports = Media;
