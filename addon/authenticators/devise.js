import Ember from 'ember';
import Devise from 'ember-simple-auth/authenticators/devise';

const { RSVP, isEmpty } = Ember;

export default Devise.extend({

  /**
   * Use service to access ENV.
   */
  heyookAuth: Ember.inject.service(),

  /**
    Authenticates the session with the specified `identification` and
    `password`; the credentials are `POST`ed to the
    {{#crossLink "DeviseAuthenticator/serverTokenEndpoint:property"}}server{{/crossLink}}.
    If the credentials are valid the server will responds with a
    {{#crossLink "DeviseAuthenticator/tokenAttributeName:property"}}token{{/crossLink}}
    and
    {{#crossLink "DeviseAuthenticator/identificationAttributeName:property"}}identification{{/crossLink}}.
    __If the credentials are valid and authentication succeeds, a promise that
    resolves with the server's response is returned__, otherwise a promise that
    rejects with the server error is returned.
    @method authenticate
    @param {String} identification The user's identification
    @param {String} password The user's password
    @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming authenticated
    @public
  */
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

  /**
    Restores the session from a session data object; __returns a resolving
    promise when there are non-empty
    {{#crossLink "DeviseAuthenticator/tokenAttributeName:property"}}token{{/crossLink}}
    and
    {{#crossLink "DeviseAuthenticator/identificationAttributeName:property"}}identification{{/crossLink}}
    values in `data`__ and a rejecting promise otherwise.
    @method restore
    @param {Object} data The data to restore the session from
    @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming or remaining authenticated
    @public
  */
  restore(data) {
    const resourceName = this.get('heyookAuth').resourceName || this.get('resourceName');
    const userData = data[resourceName];
    const { tokenAttributeName, identificationAttributeName } = this.getProperties('tokenAttributeName', 'identificationAttributeName');
    const tokenAttribute = userData[tokenAttributeName];
    const identificationAttribute = userData[identificationAttributeName];

    return new RSVP.Promise((resolve, reject) => {
      if (!isEmpty(tokenAttribute) && !isEmpty(identificationAttribute) && !isEmpty(userData.id)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  /**
    Makes a request to the devise server.
    @method makeRequest
    @param {Object} data The request data
    @return {jQuery.Deferred} A promise like jQuery.Deferred as returned by `$.ajax`
    @protected
  */
  makeRequest: function(data) {
    const url = this.get('heyookAuth').serverTokenEndpoint || this.get('serverTokenEndpoint');
    let _this = this;
    return Ember.$.ajax({
      url: url,
      type: 'POST',
      data: data,
      dataType: 'json',
      beforeSend: function(xhr/*, settings*/) {
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        var headers = _this.get('heyookAuth').requestHeaders;
        Object.keys(headers).forEach(function(key) {
          xhr.setRequestHeader(key, headers[key]);
        });
      }
    });
  }
});
