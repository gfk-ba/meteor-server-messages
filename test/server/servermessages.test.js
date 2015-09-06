describe('ServerMessages - server', function () {
  describe('#constructor', function () {
    var sandbox;

    beforeEach(function () {
      sandbox = sinon.sandbox.create();

      sandbox.stub(Mongo, 'Collection');
      sandbox.stub(Meteor, 'publish');
    });

    afterEach(function () {
      sandbox.restore();
    });

    it('Should create a publish for the instance', function () {
      var instance = new ServerMessages();

      expect(Meteor.publish).to.have.been.calledWith('ServerMessages/' + instance._name, instance.publishMessages);
    });
  });
})
