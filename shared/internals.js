/* global Internals:true*/

/***
 * Internal namespace used for constants and collection instance
 *
 * @namespace
 * @type {{constants: {MAX_TIMESTAMP_AGE: number}, collection: Mongo.Collection}}
 */
Internals = {
  constants: {
    MAX_TIMESTAMP_AGE: 2500
  },
  collection: new Mongo.Collection('servermessages')
};
