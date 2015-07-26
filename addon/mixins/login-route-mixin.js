import Ember from 'ember';

export default Ember.Mixin.create({

  beforeModel: function() {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('/');
    }
  },

  model: function(/*params*/) {
    return this.store.createRecord("credential");
  }
});
