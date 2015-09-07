describe('ServerMessages - Unit tests', function () {
  var sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();


    sandbox.stub(Meteor, 'publish');
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('#publishMessages', function () {
    beforeEach(function () {
      sandbox.stub(Internals.collection, 'find');
    });

    it('Should throw an error', function () {
      expect(function () {
        publishMethods['ServerMessages/publishMessages']();
      }).to.throw;
    });

    describe('Called with a instanceName', function () {
      it('Should publish the messages', function () {
        var instance = new ServerMessages(),
          timestamp = (new Date().getTime());

        publishMethods['ServerMessages/publishMessages'](instance.name);

        var args = Internals.collection.find.args[0];
        expect(args[0].instanceName).to.equal(instance.name);
        expect(args[0].timestamp.$gt).to.be.at.least(timestamp - Internals.constants.MAX_TIMESTAMP_AGE);
      });
    });
  });
});
