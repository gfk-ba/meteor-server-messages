Package.describe({
  name: 'gfk:server-messages',
  version: '1.1.0',
  summary: 'Add server to client mediator',
  git: 'git@github.com:gfk-ba/meteor-server-messages.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'mongo',
    'underscore'
  ]);

  api.addFiles([
    'shared/internals.js',
    'shared/serverMessages.js'
  ]);

  api.addFiles([
    'client/channelListener.js',
    'client/serverMessages.js'
  ], 'client');

  api.addFiles([
    'server/serverMessages.js',
    'server/publish.js'
  ], 'server');

  api.export('ServerMessages');

  api.export([
    'ChannelListener',
    'Internals',
    'publishMethods'
  ], {testOnly:true});
});

Package.onTest(function(api) {
  api.use([
    'underscore',
    'gfk:server-messages',
    'mike:mocha-package@0.5.8',
    'practicalmeteor:sinon',
    'practicalmeteor:chai']);

  api.addFiles([
    'test/shared/serverMessages.test.js'
  ]);

  api.addFiles([
    'test/client/serverMessages.test.js'
  ], 'client');

  api.addFiles([
    'test/server/serverMessages.test.js',
    'test/server/publish.test.js'
  ], 'server');
});
