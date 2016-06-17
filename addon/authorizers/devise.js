import Ember from 'ember';
import Devise from 'ember-simple-auth/authorizers/devise';

const { isEmpty } = Ember;

export default Devise.extend({

  /**
   * Use service to access ENV.
   */
  heyookAuth: Ember.inject.service(),

  /**
    The devise resource name. __This will be used in the request and also be
    expected in the server's response.__
    @property resourceName
    @type String
    @default 'user'
    @public
  */
  resourceName: 'user',

  /**
    Includes the user's token (see
    {{#crossLink "DeviseAuthenticator/tokenAttributeName:property"}}{{/crossLink}})
    and identification (see
    {{#crossLink "DeviseAuthenticator/identificationAttributeName:property"}}{{/crossLink}})
    in the `Authorization` header.
    @method authorize
    @param {Object} data The data that the session currently holds
    @param {Function} block(headerName,headerContent) The callback to call with the authorization data; will receive the header name and header content as arguments
    @public
  */
  authorize(data, block) {
    const resourceName = this.get('heyookAuth').resourceName || this.get('resourceName');
    const userData = data[resourceName] ? data[resourceName] : data;

    if (!isEmpty(userData)) {
      const tokenAttributeName = this.get('tokenAttributeName');
      const userToken          = userData[tokenAttributeName];

      if (!isEmpty(userToken)) {
        block('Authorization', `Bearer ${userToken}`);
      }
    }
  }
});
