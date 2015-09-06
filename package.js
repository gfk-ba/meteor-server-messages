Package.describe({
  name: 'gfk:server-messages',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.use([
    'mongo'
  ]);

  api.use([
    'gfk:mediator'
  ], 'client');

  api.addFiles([
    'shared/servermessages.js'
  ]);

  api.addFiles([
    'client/servermessages.js'
  ], 'client');

  api.addFiles([
    'server/servermessages.js'
  ], 'server');

  api.export('ServerMessages');
});

Package.onTest(function(api) {
  api.use([
    'underscore',
    'gfk:server-messages',
    'mike:mocha-package@0.5.8',
    'practicalmeteor:sinon',
    'practicalmeteor:chai']);

  api.addFiles([
    'test/shared/servermessages.test.js'
  ]);

  api.addFiles([
    'test/client/servermessages.test.js'
  ], 'client');

  api.addFiles([
    'test/server/servermessages.test.js'
  ], 'server');
});
