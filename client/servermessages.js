_.extend(ServerMessages.prototype, {
  listen: function (channel, handler) {
    if (!this._listeners[channel]) {
      this._addChannelListener(channel);
    }

    this._listeners[channel].addHandler(handler);
  },
  _addChannelListener: function (channel) {
    this._listeners[channel] = new ChannelListener(
      channel,
      this.getPublishName(),
      this.getCollection()
    );
  }
});
