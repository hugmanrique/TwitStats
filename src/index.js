// TODO Change by config.json
const config = require('../config.prod.json');
const twitter = require('./twitter');

const modules = [];

const description = config.description;
const variables = {};

const init = () => {
  twitter.init(config.twitter);

  initModules();
};

const initModules = () => {
  const { modules } = config;

  Object.keys(modules).forEach(name => {
    const config = modules[name];

    if (!config.enabled) {
      return;
    }

    const Module = require('./modules/' + name);

    modules.push(new Module(config));
  });
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
    .then(() => {
      return updateDescription();
    })
    .then(() => {
      // TODO Add debug mode
      console.log('Updated');
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
