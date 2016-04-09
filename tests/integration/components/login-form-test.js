import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('login-form', 'Integration | Component | Login Form', {
  integration: true
});

test('it renders form', function(assert) {
  this.render(hbs`{{login-form}}`);

  assert.equal(this.$('form.login').length, 1);
});

test('it disables login button is credential is not valid', function(assert) {
  this.render(hbs`{{login-form}}`);

  Ember.run( () => {
    this.$("form input#login-email").val('').trigger("change");
    this.$("form input#login-password").val("").trigger("change");
  });

  Ember.run( () => {
    assert.equal(this.$('input[data-test-target=btn-login]').attr('disabled'), 'disabled');
  });
});

test('it triggers submit when submit button is clicked', function(assert) {
  assert.expect(4);

  this.set('submit', function(m){
    assert.ok(true, "it triggers submit to targetObject");
    assert.equal(m.identification, "123@abc.com");
    assert.equal(m.password, "11111111");
  });
  this.render(hbs`{{login-form onSubmit=submit}}`);

  Ember.run( () => {
    this.$("form input#login-email").val('123@abc.com').trigger("change");
    this.$("form input#login-password").val("11111111").trigger("change");
  });

  Ember.run( () => {
    assert.equal(this.$('input[data-test-target=btn-login]').attr('disabled'), undefined);

    this.$('input[data-test-target=btn-login]').click();
  });

});

test('it triggers onRemember when remember me button is clicked', function(assert) {
  assert.expect(3);

  this.set('updateRememberMe', function(m){
    assert.ok(true, "it triggers remember me to targetObject");
    assert.equal(m, false);
  });
  this.render(hbs`{{login-form onRemember=updateRememberMe}}`);

  assert.equal(this.$('form input#remember-me').attr('checked'), 'checked');
  this.$('form input#remember-me').click();
});
