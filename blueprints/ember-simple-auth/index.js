module.exports = {
  description: 'Ember Simple Auth',
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addBowerPackageToProject('ember-simple-auth', '0.8.0');
  }
};
