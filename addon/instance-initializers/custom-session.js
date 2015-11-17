import Ember from "ember";
import Session from "ember-simple-auth/internal-session";

function lookupFactory(app, name) {
  if (app.resolveRegistration) {
    return app.resolveRegistration(name);
  }

  return app.container.lookupFactory(name);
}

export function initialize(instance) {

  let config = lookupFactory(instance, 'config:environment');
  let resourceName = (config.HeyookAuth || {}).resourceName;
  let currentResourceName = (config.HeyookAuth || {}).currentResourceName;
  let requestHeaders = (config.HeyookAuth || {}).requestHeaders;

  instance.lookup('service:heyookAuth').set('requestHeaders', requestHeaders);

  Session.reopen({
    preUserId: undefined,

    setCurrentUser: Ember.observer('authenticated.id', function() {
      var id = this.get("authenticated.id");
      var self = this;

      //if current user id doesn't change, don't update
      if(!Ember.isEmpty(this.preUserId) && id === this.preUserId) {
        return;
      }
      this.preUserId = id;

      if (!Ember.isEmpty(id)) {
        Ember.Logger.debug('Fetch Authenticated ID ' + id);
        instance.lookup("service:store").find(resourceName, id).then(function(user) {
          self.set(currentResourceName, user);
        });
      }
    })
  });
}

export default {
  name: 'custom-session',
  initialize: initialize
};
