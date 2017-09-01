const logger = require('./logger');
const Twitter = require('twitter');

let client;

exports.init = config => {
  logger.debug('Creating Twitter client');

  client = new Twitter(config);
};

exports.updateDesc = value => {
  return new Promise((res, rej) => {
    client.post(
      'account/update_profile',
      {
        description: value,
        skip_status: true
      },
      (err, data) => {
        if (err) {
          return rej();
        }

        res();
      }
    );
  });
};
