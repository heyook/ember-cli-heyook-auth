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
      auth_token: "abc"
    };

    server = new Pretender(function() {
      this.post('api/users/sign_in', function(){
        return [201,
          {"Content-Type": "application/json"},
          JSON.stringify({user: authUser})
        ];
      });
      this.get('api/users/1', function(){
        return [200,
          {"Content-Type": "application/json"},
          JSON.stringify({user: authUser})
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
    assert.equal(find('form input#email').length, 1, 'The form contains email input');
    assert.equal(find('form input#password').length, 1, 'The form contains password input');

    fillIn('input#email', "idea@lida.com");
    fillIn('input#password', "secretpwd");
    click('input.btn');
  });

  andThen(function() {
    assert.equal(currentURL(), '/', "Go to dashboard overview");
  });
});
