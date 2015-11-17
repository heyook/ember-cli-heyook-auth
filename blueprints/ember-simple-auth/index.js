module.exports = {
  description: 'Ember Simple Auth',
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addBowerPackageToProject('ember-simple-auth', '^1.0.1');
  }
};
