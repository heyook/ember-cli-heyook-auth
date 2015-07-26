import Ember from 'ember';
import layout from '../templates/components/login-form';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['login'],
  tagName: 'form',

  didInsertElement: function() {
    this._super();
    Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
  },

  afterRenderEvent: function() {
    var _this = this;
    this.$('#remember-me').change(function() {
      _this.sendAction('onRemember', this.checked);
    });
  },

  actions: {
    submit: function() {
      this.sendAction('onSubmit', this.get('model'));
    }
  }
});
