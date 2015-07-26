import Ember from 'ember';
import DS from 'ember-data';
import EmberValidations from 'ember-validations';

var Credential;

Credential = DS.Model.extend(EmberValidations.Mixin, {
  identification: DS.attr('string'),
  password: DS.attr('string'),
  isntValid: Ember.computed.not('isValid')
});

export default Credential;

Credential.reopen({

  clearProperties: function() {
    var _this = this;
    this.eachAttribute(function(propName) {
      _this.set(propName, undefined);
    });
  },

  validations: {
    identification: {
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
    password: {
      presence: true,
      length: {
        minimum: 4
      }
    }
  }
  
});
