class Module {
  constructor(config) {
    this.enabled = true;
    this.config = config;
  }

  load() {}

  update() {
    if (!this.enabled) {
      return Promise.reject();
    }

    return this.newData().catch(err => {
      console.error('Error updating module data:', err);
    });
  }

  /**
   * To be overriden by classes, returns a Promise that resolves
   * with an object or rejects if an error occurs.
   */
  newData() {
    return Promise.resolve();
  }

  disable(message = 'Unknown error') {
    this.enabled = false;

    throw new Error(message);
  }
}

module.exports = Module;
