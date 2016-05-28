import Ember from 'ember';
import EmberValidations from 'ember-validations';
import layout from '../templates/components/login-form';

const { computed: { not }  } = Ember;

export default Ember.Component.extend(EmberValidations, {
  layout: layout,
  classNames: ['login'],
  tagName: 'form',

  formGroupClass: 'form-group label-floating is-empty',
  inputLabelClass: "control-label",
  inputClass: 'form-control',
  inputHelperClass: 'help-block',
  submitButtonClass: "btn btn-primary btn-raised btn-block",
  passwordPattern: ".{4,}",

  rememberMeLabel: "Remember me",
  btnLabel: "login",
  errors: [],

  model: {
    identification: "",
    password: ""
  },

  isntValid: not('isValid'),

  clearProperties: function() {
    this.eachAttribute( (propName) => {
      this.set(propName, undefined);
    });
  },

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
      this.sendAction('onSubmit', this.get('model'), (reason) => {
        if (reason) {
          // returns ex: {message: "invalid email password combination"} 
          this.set('error_message', reason.message);
        } else {
          this.set('model', {
            identification: "",
            password: ""
          });
        }
      });
    }
  },

  validations: {
    'model.identification': {
      presence: true,
      length: {
        minimum: 3
      },
      format: {
        "with": /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
        allowBlank: false,
        message: 'must be email'
      }
    },
    'model.password': {
      presence: true,
      length: {
        minimum: 4
      }
    }
  }
});
