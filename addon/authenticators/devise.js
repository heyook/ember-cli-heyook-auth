import Ember from 'ember';
import Devise from 'simple-auth-devise/authenticators/devise';

export default Devise.extend({

  authenticate: function(credentials) {
    var _this;
    _this = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var data;
      data = {};
      data[_this.resourceName] = {
        password: credentials.password
      };
      data[_this.resourceName][_this.identificationAttributeName] = credentials.identification;
      data = JSON.stringify(data);
      return _this.makeRequest(data).then((function(response) {
        return Ember.run(function() {
          return resolve(response);
        });
      }), function(xhr/*, status, error*/) {
        return Ember.run(function() {
          return reject(xhr.responseJSON || xhr.responseText);
        });
      });
    });
  },
  makeRequest: function(data/*, resolve, reject*/) {
    return Ember.$.ajax({
      url: this.serverTokenEndpoint,
      type: 'POST',
      data: data,
      dataType: 'json',
      beforeSend: function(xhr/*, settings*/) {
        xhr.setRequestHeader('Accept', 'application/vnd.heyook.v1');
        return xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      }
    });
  }
});
