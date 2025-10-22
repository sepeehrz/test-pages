import theme from './theme';
import {createVuetify} from 'vuetify';
import {md3} from 'vuetify/blueprints';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
  blueprint: md3,
  theme: {
    ...theme,
    defaultTheme: 'light'
  },
  defaults: {
    VTextField: {
      color: 'primary'
    },
    VTextarea: {
      color: 'primary'
    }
  },
  icons: {
    defaultSet: 'mdi'
  }
});

export default vuetify;
