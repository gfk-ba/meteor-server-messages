/* global ChannelListener:true*/

ChannelListener = function (channel, publishName, collection) {
  this.handlers = [];
  this.channel = channel;

  this._subscription = Meteor.subscribe(publishName, channel);

  this._observe = collection.find({
    channel: channel
  }).observe({
    added: this._handleMessage.bind(this)
  });
};

ChannelListener.prototype.addHandler = function (handler) {
  this.handlers.push(handler);
};

ChannelListener.prototype.destroy = function () {
  this._subscription.stop();
  this._observe.stop();
};

ChannelListener.prototype._handleMessage = function (message) {
  _.each(this.handlers, function (handler) {
    handler.apply(handler, message.arguments);
  });
};
