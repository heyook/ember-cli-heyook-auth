import Ember from 'ember';

const {
  Mixin,
  inject: { service },
  observer
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
          if(reason) {
            // TODO: better error parser
            this.set("controller.errors", reason.error || reason.message || reason.errors);
          }
        });
      }
    }
  }
});
