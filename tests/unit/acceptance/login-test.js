import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../helpers/start-app';

var App;
var server;

module('Integration | Acceptance | Login', {
  setup: function() {
    App = startApp();
    var authUser = {
      id: 1,
      email: "idea@heyook.com",
      token: "abc"
    };

    var user = {
      data: {
        type: "users",
        id: 1,
        attributes: authUser
      }
    };

    server = new Pretender(function() {
      this.post('api/users/sign_in', function(){
        return [201,
          {"Content-Type": "application/json"},
          JSON.stringify({user: authUser})
        ];
      });
      this.get('users/1', function(){
        return [200,
          {"Content-Type": "application/json"},
          JSON.stringify(user)
        ];
      });
    });
  },
  teardown: function() {
    Ember.run(App, App.destroy);
    server.shutdown();
  },
});

test('signin', function(assert) {
  visit('/login');

  andThen(function() {
    assert.equal(find('form').length, 1, 'The page shows sign in form');
    assert.equal(find('form input#login-email').length, 1, 'The form contains email input');
    assert.equal(find('form input#login-password').length, 1, 'The form contains password input');

    fillIn('input#login-email', "idea@lida.com");
    fillIn('input#login-password', "secretpwd");
    click('input.btn');
  });

  andThen(function() {
    assert.equal(currentURL(), '/', "Go to after login route");
  });
});
