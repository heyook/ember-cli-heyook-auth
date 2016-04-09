import Ember from 'ember';

export default Ember.Controller.extend({
  authenticator: 'authenticator:devise',

  rememberMe: true,

  afterLoginRoute: "/",

  session: Ember.inject.service('session'),

  rememberMeChanged: Ember.observer('rememberMe', function() {
    return this.get('session.store').cookieExpirationTime = this.get('rememberMe') ? 14 * 24 * 60 * 60 : null;
  }),

  actions: {

    updateRememberMe: function(shouldRemember) {
      this.set('rememberMe', shouldRemember);
    },

    submit: function(data, callback) {
      var authenticator;
      if (!this.get('session.isAuthenticated')) {
        var _this = this;
        this.get('session').authenticate(this.get("authenticator"), data).then(function() {
          callback();
          _this.transitionToRoute(_this.get('afterLoginRoute'));
        }, function(reason) {
          if(reason) {
            _this.set("error", reason.error || reason.message || reason.errors);
          }
        });
      }
    }
  }
});
