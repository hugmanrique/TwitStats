let debug = true;

exports.init = debugMode => {
  debug = debugMode;
};

exports.debug = message => {
  if (!debug) {
    return;
  }

  console.log(message);
};

exports.warn = message => {
  console.warn(message);
};
