import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
} from 'vee-validate';
import {
  required,
  min,
  max,
  min_value as minValue,
  max_value as maxValue,
  alpha_spaces as alphaSpaces,
  email,
  confirmed,
  not_one_of as excluded,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('min_value', minValue);
    defineRule('max_value', maxValue);
    defineRule('alphaSpaces', alphaSpaces);
    defineRule('email', email);
    defineRule('confirmed', confirmed);
    defineRule('excluded', excluded);
  },
};
