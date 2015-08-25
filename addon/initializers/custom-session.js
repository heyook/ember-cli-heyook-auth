import Ember from "ember";
import Session from "simple-auth/session";

// TODO: need to update to instance-initializer to access container
export function initialize(container/*, application */) {
  var config = container.lookupFactory('config:environment');
  var resourceName = (config.HeyookAuth || {}).resourceName;
  var currentResourceName = (config.HeyookAuth || {}).currentResourceName;
  var requestHeaders = (config.HeyookAuth || {}).requestHeaders;

  container.lookup('service:heyookAuth').set('requestHeaders', requestHeaders);

  Session.reopen({
    preUserId: undefined,

    setCurrentUser: Ember.observer('secure.id', function() {
      var id = this.get("secure.id");
      var self = this;

      //if current user id doesn't change, don't update
      if(!Ember.isEmpty(this.preUserId) && id === this.preUserId) {
        return;
      }
      this.preUserId = id;

      if (!Ember.isEmpty(id)) {
        container.lookup("service:store").find(resourceName, id).then(function(user) {
          self.set(currentResourceName, user);
        });
      }
    })
  });
}

export default {
  name: "custom-session",
  before: "simple-auth",
  initialize: initialize
};
