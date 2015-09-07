describe('ServerMessages - Unit tests', function () {
  var sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    sandbox.stub(Meteor, 'publish');
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('#constructor', function () {
    var instance;

    beforeEach(function () {
      instance = new ServerMessages();
    });


  });

  describe('#notify', function () {
    beforeEach(function () {
      sandbox.stub(Internals.collection, 'insert');
      sandbox.stub(Internals.collection, 'remove');
    });

    it('Should insert the message into the collection for the channel', function () {
      var timestamp = new Date().getTime(),
        instance = new ServerMessages(),
        testChannel = 'foobar',
        testArgs = [
          {
            foo: 'bar'
          },
          123,
          'def'
        ];

      instance.notify.apply(instance, [testChannel].concat(testArgs));

      var document = Internals.collection.insert.args[0][0];

      expect(document.instanceName).to.equal(instance._name);
      expect(document.channel).to.equal(testChannel);
      expect(document.arguments).to.eql(testArgs);
      expect(document.timestamp).to.be.at.least(timestamp);
    });


    it('Should remove old messages for the instance', function () {
      var instance = new ServerMessages(),
        testChannel = 'testingFoos';

      instance.notify(instance, testChannel);

      var args = Internals.collection.remove.args[0];
      expect(args[0].timestamp.$lt).to.be.most((new Date().getTime()) - 100);
      expect(args[0].instanceName).to.equal(instance.name);
    });
  });
});
