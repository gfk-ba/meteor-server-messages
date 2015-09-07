/* global publishMethods:true*/


/***
 * Namespace containing the publishes for the package.
 * Only exposed for testing purposes
 *
 * @type {{ServerMessages/publishMessages: Function}}
 */
publishMethods = {
  /***
   * Publishes all the messages for the given instanceName
   *
   * @param instanceName the name of the instance to publish the messages for
   * @returns {any|Cursor}
   */
  'ServerMessages/publishMessages': function (instanceName) {
    var timestamp = (new Date().getTime()) - Internals.constants.MAX_TIMESTAMP_AGE;

    return Internals.collection.find({
      instanceName: instanceName,
      timestamp: {$gt: timestamp}
    });
  }
};

_.each(publishMethods, function (fn, name) {
  Meteor.publish(name, fn);
});

