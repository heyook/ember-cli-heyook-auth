import Ember from 'ember';
// import { initialize } from '../../../initializers/custom-session';
import { module, test } from 'qunit';

var registry, application;

module('Unit | Initializer | custom session', {
  beforeEach: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      registry = application.registry;
      application.deferReadiness();
    });
  }
});

// TODO: need to access factory in unit test
test('it works', function(assert) {
  assert.expect(0);
  // initialize(registry, application);
});
