import Ember from 'ember';
import Base from 'simple-auth/authorizers/base';

export default Base.extend({
  authorize: function(jqXHR/*, requestOptions*/) {
    var authData, secureData, userIdentification, userToken;
    secureData = this.get('session.secure');
    userToken = secureData["auth_token"];
    userIdentification = secureData["id"];
    if (this.get('session.isAuthenticated') && !Ember.isEmpty(userToken) && !Ember.isEmpty(userIdentification)) {
        authData = "token=" + userIdentification + "." + userToken;
        jqXHR.setRequestHeader('Authorization', 'Token ' + authData);
    }
  }
});
