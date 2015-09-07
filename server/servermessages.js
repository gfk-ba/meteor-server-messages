_.extend(ServerMessages.prototype, {
  /***
   * Notifies the listeners of the given channel.
   * All other arguments are passed on to the listeners
   *
   * @param channel the channel to notify
   */
  notify: function (channel) {
    var args = [].slice.call(arguments);
    args.splice(0, 1);

    this._cleanupOldMessages();

    Internals.collection.insert({
      instanceName: this._name,
      channel: channel,
      arguments: args,
      timestamp: (new Date().getTime())
    });
  },
  /***
   * Cleans up old messages that are expired
   * @private
   */
  _cleanupOldMessages: function () {
    var timestamp = (new Date().getTime()) - Internals.constants.MAX_TIMESTAMP_AGE;

    Internals.collection.remove({
      timestamp: {$lt: timestamp}
    });
  }
});
