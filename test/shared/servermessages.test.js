describe('ServerMessages', function () {
  describe('#constructor', function () {
    var sandbox;

    beforeEach(function () {
      sandbox = sinon.sandbox.create();

      sandbox.stub(Mongo, 'Collection');
    });

    afterEach(function () {
      sandbox.restore();
    });

    it('Should create a collection instance', function () {
      var instance = new ServerMessages();

      expect(Mongo.Collection).to.have.been.calledWith('servermessages_default');
    });

    it('Should set name to default', function () {
      var instance = new ServerMessages();

      expect(instance._name).to.equal('default');
    });

    describe('When called with a name', function () {
      it('Should set name to the given name', function () {
        var testName = 'testName';

        var instance = new ServerMessages(testName);

        expect(instance._name).to.equal(testName);
      });

      it('Should put the instance name in the collection name', function () {
        var testName = 'testName';

        var instance = new ServerMessages(testName);

        expect(Mongo.Collection).to.have.been.calledWith('servermessages_' + testName);
      });
    });
  });
})
