<template>
  <div class="pagination" v-if="totalPageNumber">
    <v-pagination
      v-model="currentPage"
      :length="totalPageNumber"
      rounded="circle"
      total-visible="10"
      color="#000"
      @update:modelValue="changePage"
      active-color="rgb(var(--v-theme-primary))"></v-pagination>
    <div class="page-size-wrapper">
      <div class="page-number">
        صفحه {{ currentPage }} از {{ totalPageNumber }}
      </div>
      <v-menu v-if="withPageSize">
        <template v-slot:activator="{props}">
          <div class="page-size" v-bind="props">
            <div class="page-size-icon">
              <v-icon icon="mdi-chevron-down"></v-icon>
            </div>
            {{ itemsPerPage }}
          </div>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in sizeItems"
            :key="index"
            :value="index">
            <v-list-item-title @click="selectPageSize(item)">
              {{ item }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import {ref, watch} from 'vue';

  interface Props {
    page: any;
    totalPages: any;
    withPageSize?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    withPageSize: true
  });
  const emits = defineEmits<{
    (e: 'changePage', items: number): void;
    (e: 'changePageSize', items: number): void;
  }>();

  const itemsPerPage = ref<any>(10);

  const currentPage = ref(props.page);

  const totalPageNumber = ref(props.totalPages);
  const sizeItems = ref([10, 20, 50, 80, 100]);
  watch(
    () => props.page,
    (value: any) => {
      currentPage.value = value;
    },
    {deep: true, immediate: true}
  );
  watch(
    () => props.totalPages,
    (value: any) => {
      totalPageNumber.value = value;
    },
    {immediate: true}
  );

  async function changePage(page: number) {
    emits('changePage', page);
  }

  async function selectPageSize(pageSize: number) {
    itemsPerPage.value = pageSize;
    currentPage.value = 1;
    emits('changePageSize', pageSize);
  }
</script>
<style lang="scss" scoped>
  .pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
    .page-size-wrapper {
      display: flex;
      align-items: center;
      padding-left: 10px;
      .page-number {
        margin-left: 10px;
      }
      .page-size {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 70px;
        text-align: center;
        height: 40px;
        border: 1px solid #000;
        border-radius: 8px;
        position: relative;
        .page-size-icon {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          &.openPageSize {
            transform: rotate(90deg);
          }
        }
      }
    }
  }
</style>
