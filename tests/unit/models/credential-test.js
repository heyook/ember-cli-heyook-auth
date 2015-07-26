import { moduleForModel, test } from 'ember-qunit';

moduleForModel('credential', 'Unit | Model | credential', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  var model = this.subject();
  assert.ok(!!model);
});

test('it has password and identification', function(assert) {
  var model = this.subject({
    identification: "abc",
    password: '123'
  });
  assert.equal(model.get('identification'), 'abc');
  assert.equal(model.get('password'), '123');
});
