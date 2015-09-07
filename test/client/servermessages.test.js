describe('ServerMessages - Unit tests', function () {
  var sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();

    sandbox.stub(Internals.collection, 'find').returns({
      observe: sandbox.stub()
    });

    sandbox.stub(Meteor, 'subscribe').returns({
      stop: sandbox.stub()
    });
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('#constructor', function () {
    it('Should setup a subscribe for all messages for the given instanceName', function () {
      var testValue = 'test';

      Meteor.subscribe.returns(testValue);

      var instance = new ServerMessages();
      expect(Meteor.subscribe).to.have.been.calledWith('ServerMessages/publishMessages', instance._name);
      expect(instance._subscription).to.equal(testValue);
    });
  });

  describe('#listen', function () {
    it('Should create a channelListener for the given channel', function () {
      var instance = new ServerMessages(),
        testChannel = 'test123',
        testHandler = function () {

        };

      instance.listen(testChannel, testHandler);

      expect(instance._listeners[testChannel]).to.exist;
      expect(instance._listeners[testChannel]).to.be.instanceOf(ChannelListener);
    });

    it('Should add the given handler to the handlers of the channel listener', function () {
      var instance = new ServerMessages(),
        testChannel = 'test123',
        testHandler = function () {};

      instance.listen(testChannel, testHandler);

      expect(instance._listeners[testChannel].handlers[0]).to.equal(testHandler);
    });
  });

  describe('#destroy', function () {
    it('Should invoke destroy on all listeners', function () {
      var instance = new ServerMessages();

      var fakeChannelListener = function () {
        this.destroy = sandbox.stub();
      };

      var fakeListener1 = new fakeChannelListener(),
        fakeListener2 = new fakeChannelListener();

      instance._listeners.test1 = fakeListener1;
      instance._listeners.test2 = fakeListener2;

      instance.destroy();

      expect(fakeListener1.destroy).to.have.been.calledOnce;
      expect(fakeListener2.destroy).to.have.been.calledOnce;
    });

    it('Should call stop on the subscription', function () {
      var instance = new ServerMessages();

      instance.destroy();

      expect(instance._subscription.stop).to.have.been.calledOnce;
    });
  });
});
