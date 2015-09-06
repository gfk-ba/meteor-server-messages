Package.describe({
  name: 'gfk:server-messages',
  version: '1.0.0',
  summary: 'Add server to client mediator',
  git: 'https://github.com/gfk-ba/meteor-server-messages',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'mongo',
    'underscore'
  ]);

  api.use([
    'gfk:mediator'
  ], 'client');

  api.addFiles([
    'shared/serverMessages.js'
  ]);

  api.addFiles([
    'client/channelListener.js',
    'client/serverMessages.js'
  ], 'client');

  api.addFiles([
    'server/serverMessages.js'
  ], 'server');

  api.export('ServerMessages');

  api.export('ChannelListener', {testOnly:true});
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
    'test/server/serverMessages.test.js'
  ], 'server');
});
