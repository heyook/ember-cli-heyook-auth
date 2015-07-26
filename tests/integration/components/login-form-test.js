import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('login-form', 'Integration | Component | Login Form', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{login-form}}`);

  assert.equal(this.$('form.login').length, 1);
});

test('it disables submit button if user is not valid', function(assert) {
  this.set('credential', {
    isntValid: true
  });
  this.render(hbs`{{login-form model=credential}}`);

  assert.equal(this.$('form input[type=submit]').attr('disabled'), 'disabled');
});

test('it triggers submit when submit button is clicked', function(assert) {
  assert.expect(2);

  var credential = {
    identification: 'hello',
    password: '1111111',
  };
  this.set('credential', credential);
  this.set('submit', function(m){
    assert.ok(true, "it triggers submit to targetObject");
    assert.equal(m, credential);
  });
  this.render(hbs`{{login-form model=credential onSubmit=submit}}`);

  this.$('form input[type=submit]').click();
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
