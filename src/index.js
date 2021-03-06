// TODO Change by config.json
const logger = require('./logger');
const twitter = require('./twitter');

const config = require('../config.json');

const modules = [];

const description = config.description;
const variables = {};

const init = () => {
  logger.init(config.debug);

  const limit = twitter.descLimit;

  if (description.length > limit) {
    logger.warn(`Description will probably be too long (>${limit})`);
  }

  twitter.init(config.twitter);

  initModules().then(() => {
    setInterval(update, config.interval);
    update();
  });
};

const initModules = () => {
  const { modules: mods } = config;

  return Promise.all(
    Object.keys(mods).map(name => {
      const config = mods[name];

      if (!config.enabled) {
        return;
      }

      const Module = require('./modules/' + name);
      const instance = new Module(config);

      modules.push(instance);

      logger.debug(`Created ${name} module`);

      return instance.load();
    })
  );
};

const update = () => {
  Promise.all(
    modules.map(module => {
      return module.update().then(data => {
        const variableNames = Object.keys(data);

        variableNames.forEach(name => {
          variables[name] = data[name];
        });
      });
    })
  )
    .then(updateDescription)
    .then(() => {
      logger.debug('Updated');
    })
    .catch(err => {
      console.error('Error updating variables:', err);
    });
};

const updateDescription = () => {
  const names = Object.keys(variables);
  let value = description;

  names.forEach(name => {
    value = value.replace(`%${name}%`, variables[name]);
  });

  return twitter.updateDesc(value);
};

const formatValue = value => {
  if (typeof value === 'number') {
    return value.toLocaleString();
  }

  // TODO Add more format types?

  return value;
};

init();
