# Ember-cli-heyook-auth

Auth specific to heyook projects.

### Set environment
```javascript
var ENV = {
  //...

  HeyookAuth: {
    resourceName: "user",
    serverTokenEndpoint: 'api/users/sign_in'
  }

  //...
};
```

### create resource
```javascript
import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  token: DS.attr('string')
});
```

### create login route
```javascript
import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import LoginRouteMixin from 'ember-cli-heyook-auth/mixins/login-route';

export default Ember.Route.extend(ApplicationRouteMixin, LoginRouteMixin);
```

in route, you can do
```Coffeescript
beforeModel: ->
    if @get('session.isAuthenticated')
      @transitionTo "dashboard"
```
or
```Coffeescript
actions:
    logout: ->
      @get('session').invalidate()
```

### create login template
```handlebar
{{login-form
  errors=errors
  onSubmit='submit'
  onRemember='updateRememberMe'}}
```

### create simple auth authenticated route
```Javascript
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin);
```
