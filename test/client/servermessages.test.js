describe('ServerMessages - Unit tests', function () {
  var sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();

    sandbox.stub(Mongo, 'Collection').returns({
      find: sandbox.stub().returns({
        observe: sandbox.stub()
      })
    });
    sandbox.stub(Meteor, 'subscribe');
  });

  afterEach(function () {
    sandbox.restore();
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
});
