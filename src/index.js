// TODO Change by config.json
const config = require('../config.prod.json');
const modules = [];

const initModules = () => {
  const { modules } = config;

  Object.keys(modules).forEach(name => {
    const config = modules[name];

    if (!config.enabled) {
      return;
    }

    const Module = require('./' + name);

    modules.push(new Module(config));
  });
};

initModules();
