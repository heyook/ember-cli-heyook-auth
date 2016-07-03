import {
  validatePresence,
  validateLength,
  validateFormat
} from 'ember-changeset-validations/validators';

export default {
  identification: [
    validatePresence(true),
    validateLength({ min: 5 }),
    validateFormat({ type: 'email' })
  ],
  password: [
    validatePresence(true),
    validateLength({ min: 5 }),
  ]
};
