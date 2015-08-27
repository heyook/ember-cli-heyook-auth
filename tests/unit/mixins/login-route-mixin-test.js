import Ember from 'ember';
import LoginRouteMixinMixin from 'ember-cli-heyook-auth/mixins/login-route-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | login route mixin');

test('it gets model', function(assert) {
  var LoginRouteMixinObject = Ember.Object.extend(LoginRouteMixinMixin);
  var subject = LoginRouteMixinObject.create();

  subject.reopen({
    store: {
      createRecord: function(){
        return 'a';
      }
    }
  });

  assert.equal(subject.model(), 'a');
});

test('it calls transitionTo', function(assert) {
  assert.expect(1);

  var LoginRouteMixinObject = Ember.Object.extend(LoginRouteMixinMixin);
  var subject = LoginRouteMixinObject.create();

  subject.reopen({
    transitionTo: function(){
      assert.ok(true);
    }
  });

  assert.equal(subject.beforeModel());
});
