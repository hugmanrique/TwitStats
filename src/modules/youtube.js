const Module = require('./module');

const request = require('request-promise-native').defaults({ json: true });

module.exports = class YoutubeModule extends Module {
  newData() {
    const { id, token } = this.config;

    return request
      .get({
        url: 'https://www.googleapis.com/youtube/v3/channels',
        headers: {},
        form: {
          id,
          part: 'statistics'
        }
      })
      .then(data => {
        const {
          viewCount,
          commentCount,
          subscriberCount,
          videoCount
        } = data.statistics;

        return {
          ytSubs: subscriberCount,
          ytViews: viewCount,
          ytComments: commentCount,
          ytVideos: videoCount
        };
      });
  }
};
