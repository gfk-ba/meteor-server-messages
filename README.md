Unit tests: [![Build Status](https://secure.travis-ci.org/gfk-ba/meteor-server-messages.png)](http://travis-ci.org/gfk-ba/meteor-server-messages)


# Meteor server messages

Add server to client messages mediator

See example page @ [meteor.com](http://server-messages-example.meteor.com/) source: [github.com](https://github.com/gfk-ba/meteor-server-messages-example)

## Installation

``` sh
$ meteor add gfk:server-messages
```

## Usage

Create a instance of the package in a shared file:

```
serverMessages = new ServerMessages();
```

Then on the client subscribe to the messages you want to handle:

```
serverMessages.listen('serverMessage:info', function (subject, message, options) {
    Notifications.info(subject, message, options);
});
```

Sending messages from server to the client:

```
serverMessages.notify('serverMessage:info', 'test', 'test', {});
```

Alternatively have a look at the example page.



## Contributing 

All contributions are welcome! Please submit pull requests. *Please add tests* and make sure everything is green!

### Testing

#### Unit tests
To run the unit tests execute the following command from within your checkout:

```bash
meteor test-packages --driver-package respondly:test-reporter --port 10015 ./

```
