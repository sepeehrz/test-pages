import {Toast} from '@app/utils/toast/index';
import DataGrid from './components/dataGrid/DataGrid.vue';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    DataGrid: typeof DataGrid;
  }
  export interface ComponentCustomProperties {
    $toast: Toast;
  }
}
