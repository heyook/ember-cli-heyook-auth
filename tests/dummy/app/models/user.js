import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  auth_token: DS.attr('string')
});
