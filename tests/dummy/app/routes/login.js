import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import LoginRouteMixin from 'ember-cli-heyook-auth/mixins/login-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, LoginRouteMixin);
