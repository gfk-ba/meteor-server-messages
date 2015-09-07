ServerMessages = function (name) {
  this._name = name || 'default';

  if (_.isFunction(this._init)) {
    //Client/server specific part of constructor
    this._init.apply(this, arguments);
  }
};

ServerMessages.prototype = {};
