import Ember from 'ember';
import layout from '../templates/components/login-form';

const {
  get,
  set,
  computed: { alias, or, equal }
} = Ember;

export default Ember.Component.extend({
  layout: layout,
  classNames: ['login'],
  tagName: 'form',

  formGroupClass: 'form-group',
  inputLabelClass: "control-label",
  inputClass: 'form-control',
  inputHelperClass: 'help-block',
  submitButtonClass: "btn btn-primary btn-raised btn-block",

  btnLabel: "login",
  errors: [],

  model: {
    identification: "",
    password: ""
  },

  textState: 'default',
  pending: equal('textState', 'pending'),
  isntValid: alias('changeset.isInvalid'),
  disable: or('isntValid', 'pending'),

  didReceiveAttrs() {
    this._super(...arguments);
    if(this.changeset) {
      this.changeset.validate("identification");
    }
  },

  actions: {
    submit: function() {
      const promise = this.attrs.onSubmit(get(this, 'changeset'));

      set(this, 'textState', 'pending');
      promise.then(() => {
        if (!this.isDestroyed) {
          set(this, 'textState', "fulfilled");
        }
      }, (reason) => {
        this.set('error_message', reason.message);
        if (!this.isDestroyed) {
          set(this, 'textState', 'rejected');
        }
      });
    }
  }
});
