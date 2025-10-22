import vuetify from './vuetify';
import './assets/style/app.scss';
import {setupComponents} from './components';
import {defineModule} from '@app/application';
import defaultLayout from './layouts/defaultLayout.vue';

export const uiModule = defineModule(({app, router}) => {
  app.use(vuetify);

  setupComponents(app);

  router.addRoute({
    name: 'main',
    path: '/',
    component: defaultLayout
  });
});
