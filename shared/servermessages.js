ServerMessages = function (name) {
  this._name = name || 'default';

  this._collection = new Mongo.Collection('servermessages_' + this._name);

  if (Meteor.isServer) {
    Meteor.publish('ServerMessages/' + this._name, this.publishMessages);
  }
};
