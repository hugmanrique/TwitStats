const mcping = require('mc-ping-updated');
const Module = require('./module');

class MCModule extends Module {
  newData() {
    const { address, port, timeout } = this.config;

    return new Promise((res, rej) => {
      return mcping(
        address,
        port,
        (err, data) => {
          if (err) {
            return rej(err);
          }

          const { max, online } = data.players;

          return {
            mcPlayers: online,
            mcMax: max,
            // Shouldn't be used, includes §
            mcMotd: data.text,
            mcVersion: data.version.name
          };
        },
        timeout
      );
    });
  }
}

module.exports = MCModule;
