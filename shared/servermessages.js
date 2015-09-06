ServerMessages = function (name) {
  var self = this;

  this._name = name || 'default';

  this._collection = new Mongo.Collection('servermessages_' + this._name);

  if (Meteor.isServer) {
    //TODO: Figure out how to safely clean up publishes when this object is removed
    Meteor.publish(this.getPublishName(), function () {
      Array.prototype.unshift.call(arguments, this);
      return self._publishMessages.apply(self, arguments);
    });
  } else {
    this._listeners = {};
  }
};

ServerMessages.prototype = {
  getPublishName: function () {
    return 'ServerMessages/' + this._name;
  },
  getCollection: function () {
    return this._collection;
  }
};
