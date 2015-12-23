import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Mixin.create({

  session: service('session'),

  beforeModel: function() {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('/');
    } else {
      return this._super(...arguments);
    }
  },

  model: function(/*params*/) {
    return this.store.createRecord("credential");
  }
});
