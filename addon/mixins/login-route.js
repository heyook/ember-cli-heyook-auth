import Ember from 'ember';

const {
  Mixin,
  inject: { service }
} = Ember;

export default Mixin.create({

  afterLoginRoute: "/",

  session: service('session'),

  model() {
    return {
      identification: "",
      password: ""
    };
  },

  actions: {

    submit(data) {
      const credential = Ember.getProperties(data, "identification", "password");
      return new Ember.RSVP.Promise( (resolve, reject) => {
        if (!this.get('session.isAuthenticated')) {
          this.get('session').authenticate("authenticator:devise", credential).then( () => {
            this.transitionTo(this.get('afterLoginRoute'));
            resolve(true);
          }, (reason) => {
            Ember.Logger.debug(reason);
            reject(reason);
          });
        } else {
          resolve(true);
        }
      });
    }
  }
});
