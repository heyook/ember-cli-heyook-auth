import Ember from 'ember';

const {
  Mixin,
  inject: { service }
} = Ember;

export default Mixin.create({
  rememberMe: true,

  afterLoginRoute: "/",

  session: service('session'),

  actions: {

    updateRememberMe(shouldRemember) {
      this.get('session.store').cookieExpirationTime = shouldRemember ? 14 * 24 * 60 * 60 : null;
    },

    submit(data, callback) {
      if (!this.get('session.isAuthenticated')) {
        this.get('session').authenticate("authenticator:devise", data).then( () => {
          callback();
          this.transitionTo(this.get('afterLoginRoute'));
        }, (reason) => {
          callback(reason);
        });
      }
    }
  }
});
