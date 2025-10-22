import Icon from './components/icons.vue';
import Badge from './components/badge.vue';
import {Toast} from '@app/utils/toast/index';
import DataGrid from './components/dataGrid/DataGrid.vue';
import FormGenerator from './components/formGenerator/formGenerator.vue';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Icon: typeof Icon;
    Badge: typeof Badge;
    DataGrid: typeof DataGrid;
    FormGenerator: typeof FormGenerator;
  }
  export interface ComponentCustomProperties {
    $toast: Toast;
  }
}
