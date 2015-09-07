describe('ServerMessages - Unit tests', function () {
  describe('#constructor', function () {
    var sandbox;

    beforeEach(function () {
      sandbox = sinon.sandbox.create();

      sandbox.stub(Mongo, 'Collection');

      if(Meteor.isServer) {
        sandbox.stub(Meteor, 'publish');
      }
    });

    afterEach(function () {
      sandbox.restore();
    });

    it('Should set name to default', function () {
      var instance = new ServerMessages();

      expect(instance._name).to.equal('default');
    });

    describe('Called with a name', function () {
      it('Should set the name property to the given name', function () {
        var testName = 'foobar',
          instance = new ServerMessages(testName);

        expect(instance._name).to.equal(testName);
      });
    });
  });
});
