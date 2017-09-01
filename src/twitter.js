const logger = require('./logger');
const Twitter = require('twitter');

let client;

exports.init = config => {
  logger.debug('Creating Twitter client');

  client = new Twitter(config);
};

exports.updateDesc = value => {
  if (value.length > exports.descLimit) {
    return Promise.reject('Description was too long, ignored change');
  }

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

exports.descLimit = 160;
