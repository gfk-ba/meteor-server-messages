describe('ServerMessages - Unit tests', function () {
  var sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();

    sandbox.stub(Mongo, 'Collection');
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

    it('Should create a publish for the instance', function () {
      expect(Meteor.publish).to.have.been.calledWith('ServerMessages/' + instance._name);
    });

    it('Should wrap the publishMessages function', function () {
      var publishFn = Meteor.publish.args[0][1];

      sandbox.stub(instance, '_publishMessages');


      var testObject = {},
        testArgs = [testObject, 'test', 123, 456];

      publishFn.apply(testObject, testArgs);

      var callArgs = instance._publishMessages.args[0];
      testArgs.unshift(testObject);

      expect(callArgs).to.eql(testArgs);
    });
  });

  describe('#publishMessages', function () {
    beforeEach(function () {
      Mongo.Collection.returns({
        find: sandbox.stub()
      });
    });

    describe('Called with a channel', function () {
      it('Should publish the messages', function () {
        var instance = new ServerMessages(),
          testChannel = 'testingFoos';

        instance._publishMessages({}, testChannel);

        var args = instance._collection.find.args[0];
        expect(args[0].channel).to.equal(testChannel);
        expect(args[0].timestamp.$gt).to.be.above((new Date().getTime()) - 200);
      });
    });

    describe('#notify', function () {
      beforeEach(function () {
        Mongo.Collection.returns({
          insert: sandbox.stub(),
          remove: sandbox.stub()
        });
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

        var document = instance._collection.insert.args[0][0];

        expect(document.channel).to.equal(testChannel);
        expect(document.arguments).to.eql(testArgs);
        expect(document.timestamp).to.be.at.least(timestamp);
      });


      it('Should remove old messages', function () {
        var instance = new ServerMessages(),
          testChannel = 'testingFoos';

        instance.notify(instance, testChannel);

        var args = instance._collection.remove.args[0];
        expect(args[0].timestamp.$lt).to.be.most((new Date().getTime()) - 100);
      });
    });
  });
});
