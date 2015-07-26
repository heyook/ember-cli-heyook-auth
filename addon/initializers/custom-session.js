import Ember from "ember";
import Session from "simple-auth/session";

export function initialize(container/*, application */) {
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

      var config = container.lookupFactory('config:environment');
      var resourceName = (config.HeyookAuth || {}).resourceName;
      var currentResourceName = (config.HeyookAuth || {}).currentResourceName;

      if (!Ember.isEmpty(id)) {
        container.lookup("store:main").find(resourceName, id).then(function(user) {
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
