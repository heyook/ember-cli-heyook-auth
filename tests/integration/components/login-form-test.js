import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import loginValidations from 'ember-cli-heyook-auth/validations/login';

moduleForComponent('login-form', 'Integration | Component | Login Form', {
  integration: true
});

test('it renders form', function(assert) {
  this.render(hbs`{{login-form}}`);

  assert.equal(this.$('form.login').length, 1);
});

test('it disables login button if credential is empty', function(assert) {
  this.set('credential', {
    identification: '',
    password: ""
  });

  this.set('loginValidations', loginValidations);

  this.render(hbs`{{login-form
    changeset=(changeset credential loginValidations)
  }}`);

  assert.equal(this.$('input[data-test-target=btn-login]').attr('disabled'), 'disabled');
});

test('it triggers submit when submit button is clicked', function(assert) {
  assert.expect(4);

  this.set('credential', {
    identification: '',
    password: ""
  });

  this.set('loginValidations', loginValidations);

  this.set('submit', function(m){
    assert.ok(true, "it triggers submit to targetObject");
    assert.equal(m.get('identification'), "123@abc.com");
    assert.equal(m.get('password'), "11111111");

    return new Ember.RSVP.Promise( (resolve/*, reject*/) => {
      resolve(true);
    });
  });
  this.render(hbs`{{login-form
    changeset=(changeset credential loginValidations)
    onSubmit=(action submit)}}`);

  Ember.run( () => {
    this.$("form input#login-email").val('123@abc.com').trigger("change");
    this.$("form input#login-password").val("11111111").trigger("change");
  });

  Ember.run( () => {
    assert.equal(this.$('input[data-test-target=btn-login]').attr('disabled'), undefined);

    this.$('input[data-test-target=btn-login]').click();
  });

});
