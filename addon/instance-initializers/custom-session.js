import Session from "ember-simple-auth/internal-session";
import Ember from 'ember';
import lookupFactory from '../utils/lookup-factory';

export function initialize(instance) {

  Session.reopen({
    preUserId: undefined,

    setCurrentUser: Ember.observer('authenticated.user.id', function() {
      let config = lookupFactory(instance, 'config:environment');
      let heyookAuthConfig = config.HeyookAuth || {};

      let resourceName = heyookAuthConfig.resourceName;
      let currentResourceName = heyookAuthConfig.currentResourceName;

      var id = this.get("authenticated.user.id");
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
  initialize
};
