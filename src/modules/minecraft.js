const mcping = require('mc-ping-updated');
const Module = require('./module');

class MCModule extends Module {
  newData() {
    const { address, port, timeout } = this.config;

    return new Promise(res => {
      return mcping(
        address,
        port,
        (err, data) => {
          if (err) {
            return sendOffline(res);
          }

          const version = data.version.name;
          const { max, online } = data.players;

          this.lastVersion = version;

          res({
            mcPlayers: online,
            mcMax: max,
            // Shouldn't be used, includes §
            mcMotd: data.text,
            mcVersion: version
          });
        },
        timeout
      );
    });
  }

  sendOffline(res) {
    res({
      mcPlayers: 0,
      mcMax: 0,
      mcMotd: '',
      mcVersion: this.lastVersion || '1.8.8'
    });
  }
}

module.exports = MCModule;
