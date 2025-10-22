import {createApp, h} from 'vue';
import {RouterView} from 'vue-router';
import {startApplication} from '@app/application';
export {startApplication, defineModule} from './setup';

createApp({
  render() {
    return h(RouterView);
  }
})
  .use(startApplication)
  .mount('#app');
