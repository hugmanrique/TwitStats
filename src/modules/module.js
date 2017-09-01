class Module {
  constructor(config) {
    this.config = config;
  }

  update() {
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
}

module.exports = Module;
