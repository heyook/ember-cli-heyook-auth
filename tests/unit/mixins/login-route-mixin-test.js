import Ember from 'ember';
import LoginRouteMixinMixin from 'ember-cli-heyook-auth/mixins/login-route-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | login route mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var LoginRouteMixinObject = Ember.Object.extend(LoginRouteMixinMixin);
  var subject = LoginRouteMixinObject.create();
  assert.ok(subject);
});
