describe('ServerMessages - client', function () {
  describe('#constructor', function () {
    var sandbox;

    beforeEach(function () {
      sandbox = sinon.sandbox.create();

      sandbox.stub(Mongo, 'Collection');
      sandbox.stub(Meteor, 'subscribe');
    });

    afterEach(function () {
      sandbox.restore();
    });

  });

  it('Should do things', function () {
      expect(true).to.equal(true);
  });
})
