# Authentication for Ember projects 

### Set environment
```javascript
var ENV = {
  //...

  HeyookAuth: {
    resourceName: "user",
    currentResourceName: 'currentUser',
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
  auth_token: DS.attr('string')
});
```

### create login route
```javascript
import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import LoginRouteMixin from 'ember-cli-heyook-auth/mixins/login-route-mixin';

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
  model=model
  onSubmit='submit'
  onRemember='updateRememberMe'}}
```

### access current user in controller
```javascript
import Ember from 'ember';

ApplicationController = Ember.Controller.extend({
  currentAdmin:    Em.computed.alias "session.currentAdmin"
});
export default ApplicationController;
```

### create simple auth authenticated route
```Javascript
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin);
```
