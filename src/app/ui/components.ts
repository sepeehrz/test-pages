import type {App} from 'vue';
import Badge from './components/badge.vue';
import DataGrid from './components/dataGrid/dataGrid.vue';
import {LoaderPlugin} from '@app/utils/loader/index';
import {DialogPlugin} from '@app/utils/dialog/index';
import {ToastPlugin} from '@app/utils/toast/index';

export function setupComponents(app: App) {
  [DataGrid, Badge].forEach((component: {name: string}) => {
    app.component(component.name, component);
  });
  app.use(LoaderPlugin);
  app.use(DialogPlugin);
  app.use(ToastPlugin);
}
