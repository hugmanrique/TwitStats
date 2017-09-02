const Module = require('./module');

const request = require('request-promise-native').defaults({ json: true });

class TwitchModule extends Module {
  load() {
    return this.requestToken();
  }

  newData() {
    const { clientId, channelId } = this.config;

    return request
      .get({
        url: `https://api.twitch.tv/kraken/channels/${channelId}`,
        headers: {
          'Client-ID': clientId,
          Authorization: `OAuth ${this.accessToken}`,
          Accept: 'application/vnd.twitchtv.v5+json'
        }
      })
      .then(data => {
        if (data.error) {
          throw new Error(data.message);
        }

        return {
          twitchFollows: data.followers,
          twitchViews: data.views,
          twitchGame: data.game
        };
      });
  }

  requestToken() {
    const { clientId, clientSecret } = this.config;

    return request
      .post({
        url: 'https://api.twitch.tv/kraken/oauth2/token',
        qs: {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'client_credentials'
        }
      })
      .then(data => {
        if (data.error) {
          throw new Error('Twitch API error');
        }

        this.accessToken = data['access_token'];

        const expires = data['expires_in'];

        // Request new token 2 minutes before expiry
        setTimeout(this.requestToken, expires - 60 * 2);
      });
  }
}

module.exports = TwitchModule;
