const Module = require('./module');

const request = require('request-promise-native').defaults({ json: true });

class YoutubeModule extends Module {
  newData() {
    const { id, apiKey } = this.config;

    return request
      .get({
        url: 'https://www.googleapis.com/youtube/v3/channels',
        qs: {
          id,
          key: apiKey,
          part: 'statistics',
          maxResults: 1
        }
      })
      .then(data => {
        if (!data.items.length) {
          this.disable('Invalid channel ID');
        }

        const item = data.items[0];

        const {
          viewCount,
          commentCount,
          subscriberCount,
          videoCount
        } = item.statistics;

        return {
          ytSubs: subscriberCount,
          ytViews: viewCount,
          ytComments: commentCount,
          ytVideos: videoCount
        };
      });
  }
}

module.exports = YoutubeModule;
