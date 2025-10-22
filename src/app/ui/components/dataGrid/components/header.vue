<template>
  <div class="table-header" v-if="withHeader">
    <slot name="header">
      <div class="table-title" v-if="withTitle">
        <h3>
          <v-icon :icon="title.icon"></v-icon>
          <span v-if="isRecycleBin" class="table-deleted-title">
            لیست حذف شده ها
          </span>
          <span v-else>
            {{ title.text }}
          </span>
        </h3>
      </div>
      <div class="table-actions" v-if="withActionBar">
        <v-tooltip
          v-if="withRecycleBin"
          :text="
            !isRecycleBin ? 'لیست آیتم های حذف شده' : 'لیست آیتم های حذف نشده'
          "
          location="bottom">
          <template v-slot:activator="{props}">
            <v-btn
              v-bind="props"
              @click="_recycleBinList"
              variant="text"
              :icon="!isRecycleBin ? 'mdi-delete' : 'mdi-delete-off'"></v-btn>
          </template>
        </v-tooltip>
        <v-tooltip
          v-if="withExcelDownload"
          text="دانلود جدول"
          location="bottom">
          <template v-slot:activator="{props}">
            <v-btn
              v-bind="props"
              @click="_download"
              variant="text"
              icon="mdi-microsoft-excel"></v-btn>
          </template>
        </v-tooltip>
        <v-tooltip
          v-if="withRefresh"
          text="تازه کردن اطلاعات"
          location="bottom">
          <template v-slot:activator="{props}">
            <v-btn
              v-bind="props"
              @click="_reset"
              variant="text"
              icon="mdi-refresh"></v-btn>
          </template>
        </v-tooltip>

        <slot name="toollbar_right"></slot>
        <slot name="header_add">
          <v-btn
            size="large"
            prepend-icon="mdi-plus"
            variant="outlined"
            v-if="withAdd"
            class="create-btn"
            @click="create">
            <span>افزودن</span>
          </v-btn>
        </slot>
      </div>
    </slot>
  </div>
</template>
<script lang="ts" setup>
  import {useRouter, useRoute} from 'vue-router';

  interface Props {
    withHeader?: boolean;
    withTitle?: boolean;
    withActionBar?: boolean;
    withRefresh?: boolean;
    withExcelDownload?: boolean;
    withAdd?: boolean;
    title: {text?: string; icon?: string};
    createUrl?: () => void | string;
    isRecycleBin: boolean;
    withRecycleBin?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    withHeader: true,
    withTitle: true,
    withActionBar: true,
    withRefresh: true,
    withExcelDownload: true,
    withAdd: true,
    withRecycleBin: true,
    isRecycleBin: false
  });

  const emits = defineEmits<{
    (e: 'resetTable'): void;
    (e: 'downloadExcel'): void;
    (e: 'recycleBinList'): void;
  }>();

  const $router = useRouter();
  const $route = useRoute();

  function create() {
    if (props.createUrl) {
      if (typeof props.createUrl === 'function') {
        props.createUrl();
        return;
      }
      $router.push(props.createUrl);
      return;
    }

    $router.push($route.path + '/create');
  }
  function _reset() {
    emits('resetTable');
  }
  function _download() {
    emits('downloadExcel');
  }
  function _recycleBinList() {
    emits('recycleBinList');
  }
</script>
<style lang="scss" scoped>
  .table-header {
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e4e4e4;
    min-height: 80px;
    align-items: center;
    @include media(sm) {
      padding: 0 25px;
    }
    h3 {
      font-weight: 500;
      display: flex;
      align-items: center;
      i {
        margin-top: -5px;
      }
      span {
        margin-right: 10px;
      }
      .table-deleted-title {
        color: $error_color;
      }
    }
    .create-btn {
      font-size: 14px;
    }
  }
</style>
