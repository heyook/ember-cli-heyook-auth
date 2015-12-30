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

    submit: function(credential) {
      var authenticator, data;
      if (!this.get('session.isAuthenticated')) {
        authenticator = this.get("authenticator");
        data          = credential.getProperties('identification', 'password');

        var _this = this;
        this.get('session').authenticate(authenticator, data).then(function() {
          credential.clearProperties();
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
