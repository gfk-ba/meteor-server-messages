var MAX_TIMESTAMP_AGE = 250;

_.extend(ServerMessages.prototype, {
  _publishMessages: function (publishInstance, channel) {
    var timestamp = (new Date().getTime()) - MAX_TIMESTAMP_AGE;

    return this._collection.find({
      channel: channel,
      timestamp: {$gt: timestamp}
    });
  },
  notify: function (channel) {
    var args = [].slice.call(arguments);
    args.splice(0, 1);

    this._cleanupOldMessages();

    this._collection.insert({
      channel: channel,
      arguments: args,
      timestamp: (new Date().getTime())
    });
  },
  _cleanupOldMessages: function () {
    var timestamp = (new Date().getTime()) - MAX_TIMESTAMP_AGE;

    this._collection.remove({
      timestamp: {$lt: timestamp}
    });
  }
});
