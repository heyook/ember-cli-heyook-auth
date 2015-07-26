# Ember-cli-heyook-auth

Auth specific to heyook projects.

### Set environment
```javascript
var ENV = {
  //...

  "simple-auth": {
    authorizer: 'authorizer:devise',
    crossOriginWhitelist: ['*'],
    store: 'simple-auth-session-store:cookie'
  },

  "simple-auth-devise": {
    tokenAttributeName: "auth_token",
    identificationAttributeName: "email"
  },

  "simple-auth-session-store": {
    cookieName: "lidamo_auth_session"
  },

  HeyookAuth: {
    resourceName: "user",
    currentResourceName: 'currentUser'
  }

  //...
};

if (environment === 'test') {
  //...
  ENV['simple-auth-devise'].serverTokenEndpoint = "api/users/sign_in";
  ENV['simple-auth'].store = 'simple-auth-session-store:ephemeral';
}
```

### create resource
```javascript
import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  auth_token: DS.attr('string')
});
```

### create login route
```javascript
import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
import LoginRouteMixin from 'ember-cli-heyook-auth/mixins/login-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, LoginRouteMixin);
```

### create login template
```handlebar
{{login-form
  model=model
  onSubmit='submit'
  onRemember='updateRememberMe'}}
```
