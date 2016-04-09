import Ember from 'ember';
import LoginRouteMixin from 'ember-cli-heyook-auth/mixins/login-route';
import { module, test } from 'qunit';

module('Unit | Mixin | login route');

// Replace this with your real tests.
test('it adds login route function', function(assert) {
  let LoginRouteObject = Ember.Object.extend(LoginRouteMixin);
  let subject = LoginRouteObject.create();

  assert.equal(subject.afterLoginRoute, "/");
});
