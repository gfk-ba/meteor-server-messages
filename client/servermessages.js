_.extend(ServerMessages.prototype, {
  /***
   * Part of constructor that is server/client specific
   * @private
   */
  _init: function () {
    this._listeners = {};
    this._subscription = Meteor.subscribe('ServerMessages/publishMessages', this._name);
  },
  /***
   * Listen to a certain channel, execute the given handler when a message arrives
   *
   * @param channel the channel to listen to
   * @param handler the handler to execute upon a new message
   */
  listen: function (channel, handler) {
    if (!this._listeners[channel]) {
      this._addChannelListener(channel);
    }

    this._listeners[channel].addHandler(handler);
  },
  /***
   * Instantiates a new ChannelListener for the given channel
   * @param channel the channel to listen to
   * @private
   */
  _addChannelListener: function (channel) {
    this._listeners[channel] = new ChannelListener(
      channel,
      Internals.collection
    );
  },
  /***
   * Cleans up current subscription and oberves on the collection.
   * Call this before setting the reference to ServerMessages to undefined to prevent memory leaks.
   */
  destroy: function () {
    _.invoke(this._listeners, 'destroy');
    this._subscription.stop();
  }
});
