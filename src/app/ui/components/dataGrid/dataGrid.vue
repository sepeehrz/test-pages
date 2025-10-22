<template>
  <div id="data-table-grid">
    <Header
      :title="title"
      :withHeader="withHeader"
      :withTitle="withTitle"
      :withActionBar="withActionBar"
      :create-url="createUrl"
      @reset-table="_refresh"
      @download-excel="downloadExcel"
      :isRecycleBin="isRecycleBin"
      :withExcelDownload="withExcelDownload"
      :withAdd="withAdd"
      :withRefresh="withRefresh"
      :withRecycleBin="withRecycleBin"
      @recycleBinList="recycleBinList">
      <template #toollbar_right>
        <slot name="toollbar_right"></slot>
      </template>
      <template #header>
        <slot name="header"></slot>
      </template>
      <template #header_add>
        <slot name="header_add"></slot>
      </template>
    </Header>

    <Filters
      @filter-data="getFiltersData"
      :filters="filters"
      :refresh-grid="refreshGrid" />

    <v-data-table
      class="data-table"
      v-model="selected"
      v-model:page="pagination.page"
      :items="items"
      :headers="tableHeader"
      :items-per-page="pagination.itemsPerPage"
      :loading="loading"
      density="comfortable"
      return-object
      :key="8">
      <template #headers="{columns}">
        <tr>
          <th v-if="selective" width="5%" class="text-right">
            <v-checkbox
              v-model="selectAll"
              hide-details
              @click="toggleSelectAll"></v-checkbox>
          </th>
          <template v-for="column in columns" :key="column.title">
            <th
              :width="column.width"
              :class="[
                column.align === 'start'
                  ? 'text-right'
                  : column.align === 'end'
                  ? 'text-left'
                  : 'text-center'
              ]">
              <template v-if="column.sortable">
                <span class="cursor-pointer" @click="sortColumn(column)">
                  {{ column.title }}
                </span>
                <v-icon
                  color="#fff"
                  v-if="sort.sortField && column.value === sort.sortField"
                  :icon="
                    sort.sortType === 'asc'
                      ? 'mdi-arrow-down'
                      : sort.sortType === 'desc'
                      ? 'mdi-arrow-up'
                      : ''
                  "></v-icon>
              </template>
              <span v-else>
                {{ column.title }}
              </span>
            </th>
          </template>
        </tr>
      </template>
      <template #item="{item}">
        <tr>
          <td v-if="selective">
            <v-checkbox v-model="selected" :value="item" hide-details />
          </td>
          <tableBody
            :item="item"
            :withEdit="withEdit"
            :withDelete="withDelete"
            :withAction="withAction"
            :editUrl="editUrl"
            :actions="actions"
            @delete="_delete"
            @restore="_restore"
            :isRecycleBin="isRecycleBin">
            <template #data="{item}">
              <slot name="data" :item="item" />
            </template>
            <template #actions="{item}">
              <slot name="actions" :item="item" />
            </template>
            <template #delete>
              <slot name="delete" />
            </template>
            <template #extend_action="{item}">
              <slot name="extend_action" :item="item" />
            </template>
          </tableBody>
        </tr>
      </template>
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
      <template #bottom>
        <tablePagination
          v-if="withPagination"
          :page="pagination.page"
          :totalPages="pagination.totalPages"
          @change-page="changePage"
          @change-page-size="changePageSize" />
      </template>
      <template #no-data>
        <div class="text-center">اطلاعاتی یافت نشد</div>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';

  export default defineComponent({
    name: 'DataGrid'
  });
</script>

<script lang="ts" setup>
  // import {useDownloadExcel} from '@app/utils';
  import Header from './components/header.vue';
  import Filters from './components/filters.vue';
  import tableBody from './components/tbody.vue';
  import type {IFilters, IHeaders} from './types';
  import tablePagination from './components/pagination.vue';
  import {ref, computed, onMounted, watch, inject} from 'vue';

  interface Props {
    headers: IHeaders[];
    service?: any;
    dataGrid?: any;
    queryService?: any;
    deleteService?: (value: string) => void;
    filters?: IFilters[];
    withPagination?: boolean;
    withHeader?: boolean;
    withActionBar?: boolean;
    withEdit?: boolean;
    withDelete?: boolean;
    title: {text?: string; icon?: string};
    createUrl?: () => void | string;
    editUrl?: (items: object) => void;
    downloadExcel?: () => void;
    selective?: boolean;
    actions?: any;
    withAction?: boolean;
    excelUrl?: string;
    withExcelDownload?: boolean;
    withTitle?: boolean;
    withAdd?: boolean;
    withRecycleBin?: boolean;
    withoutService?: boolean;
    defaultFilter?: any;
    tableItems?: any;
    withRefresh?: boolean;
    withServerPagination?: boolean;
    withQuerySearch?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    headers: () => [],
    withPagination: true,
    withActionBar: true,
    withAction: true,
    withHeader: true,
    withEdit: true,
    withDelete: true,
    selective: false,
    withExcelDownload: true,
    withRecycleBin: true,
    withAdd: true,
    withoutService: false,
    withRefresh: true,
    withTitle: true,
    withServerPagination: true,
    withQuerySearch: false,
    dataGrid: {},
    actions: () => []
  });

  const pagination = ref({
    page: 1,
    itemsPerPage: 10,
    totalPages: 0
  });
  const sort = ref({
    sortType: '',
    sortField: ''
  });
  const $toast: any = inject('toast');

  const items = ref([]);
  const loading = ref(false);
  const selectAll = ref(false);
  const refreshGrid = ref(false);
  const params = ref<any>({});
  const filterData = ref<{search?: string}>({});
  const selected = ref([]);
  const isRecycleBin = ref(false);
  const select = defineModel('select');

  const tableHeader = computed(() => {
    const headers: any = props.headers;

    const action_exist = props.headers?.some(
      (item: any) => item.name == 'action'
    );
    if (!action_exist && props.withAction) {
      headers?.push({
        title: 'عملیات',
        name: 'action',
        align: 'start',
        width: '15%',
        sortable: false
      });
    }
    return headers;
  });

  watch(
    () => selected.value,
    (value: any) => {
      select.value = value;
    }
  );
  watch(
    () => props.tableItems,
    (value: any) => {
      if (props.withoutService && value) {
        items.value = value;
      }
    }
  );

  onMounted(() => {
    if (props.withoutService) {
      items.value = props.tableItems;
      return;
    }
    buildQuary();
    props.dataGrid.refresh = () => {
      buildQuary();
    };
  });

  function getFiltersData(value: object) {
    if (Object.entries(value).length !== 0) {
      filterData.value = value;
      refreshGrid.value = false;
      buildQuary();
    }
  }
  function sortColumn(column: any) {
    sort.value.sortField = column.key;
    sort.value.sortType === ''
      ? (sort.value.sortType = 'asc')
      : sort.value.sortType === 'asc'
      ? (sort.value.sortType = 'desc')
      : (sort.value.sortType = '');
    buildQuary();
  }

  function changePage(page: number) {
    pagination.value.page = page;
    buildQuary();
  }
  function changePageSize(size: number) {
    pagination.value.itemsPerPage = size;
    buildQuary();
  }
  function buildQuary() {
    paramsBuilder();
    quary();
  }
  const totalPagesClient = computed(() =>
    Math.ceil(items.value.length / pagination.value.itemsPerPage)
  );

  function filteredItemsClient(data: never[]) {
    if (!props.withQuerySearch) return data;

    let search = filterData.value?.search || '';
    if (search === 'null') {
      search = '';
    }
    const searchKey = search.toLowerCase().trim();

    if (!searchKey) return data;

    return data.filter(item =>
      Object.values(item).some(val =>
        String(val ?? '')
          .toLowerCase()
          .includes(searchKey)
      )
    );
  }

  async function quary() {
    loading.value = true;

    let service = props.queryService
      ? props.queryService(params.value)
      : props.service.$query(params.value);

    service.then((data: never[]) => {
      items.value = props.withQuerySearch ? filteredItemsClient(data) : data;
      pagination.value.totalPages = totalPagesClient.value;
      loading.value = false;
    });
  }
  function paramsBuilder() {
    params.value = {};
    if (props.defaultFilter) {
      params.value = props.defaultFilter;
    }
    if (props.withPagination) {
      params.value.page = pagination.value.page;
      params.value.pageSize = pagination.value.itemsPerPage;
    }

    if (sort.value.sortField) {
      params.value.sortType = sort.value.sortType;
      params.value.sortField = sort.value.sortField;
    }
    if (isRecycleBin.value) {
      params.value.RecycleBin = true;
    }
    if (Object.entries(filterData.value).length !== 0) {
      params.value = Object.assign(params.value, filterData.value);
    }
  }

  function toggleSelectAll() {
    if (selected.value.length) {
      selected.value = [];
    } else {
      selected.value = items.value.slice();
    }
  }
  function _refresh() {
    params.value = {};
    pagination.value.page = 1;
    pagination.value.itemsPerPage = 10;
    filterData.value = {};
    isRecycleBin.value = false;
    refreshGrid.value = true;
    sort.value = {
      sortType: 'asc',
      sortField: ''
    };
    buildQuary();
  }
  async function downloadExcel() {
    if (!props.downloadExcel) {
      let data;
      if (props.service) {
        data = await props.service.$export({excel: 1}, props.excelUrl);
      } else {
        data = await props.queryService({excel: 1});
      }
      // useDownloadExcel(data);
      return;
    }
    props.downloadExcel();
  }
  async function recycleBinList() {
    isRecycleBin.value = !isRecycleBin.value;
    buildQuary();
  }
  async function _delete(id: string): Promise<void> {
    let service = props.deleteService
      ? props.deleteService(id)
      : props.service.$delete(id);
    service.then(
      (data: {
        data: {
          successful: boolean;
          data: [];
          totalPages: number;
          messages: string[];
        };
      }) => {
        buildQuary();
      }
    );
  }
  async function _restore(id: string): Promise<void> {
    props.service.$restore(id).then(
      (data: {
        data: {
          successful: boolean;
          data: [];
          totalPages: number;
          messages: string[];
        };
      }) => {
        buildQuary();
      }
    );
  }
</script>
<style lang="scss" scoped>
  .data-table {
    :deep(.v-table__wrapper) {
      border-radius: 10px;
      overflow-y: hidden;
      overflow-x: auto;

      .v-btn--icon {
        &.v-btn--density-default {
          width: 30px;
          height: 30px;
        }
      }
      .v-selection-control--density-default {
        --v-selection-control-size: unset;
      }
      th {
        background: rgb(var(--v-theme-primary));
        span {
          color: #fff;
        }
      }
      td,
      th {
        border-bottom: 0 !important;
        text-align: right;
        font-size: 16px;
        height: 50px;
        padding-right: 10px;
        white-space: nowrap;
      }
      tr:nth-child(even) {
        background-color: rgb(var(--v-theme-surface));
      }
    }
  }
</style>
