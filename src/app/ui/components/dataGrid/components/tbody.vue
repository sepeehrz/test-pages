<template>
  <slot name="data" :item="item" />
  <template v-if="withAction">
    <td v-if="isRecycleBin">
      <slot name="recycle" :item="item">
        <v-tooltip text="بازیابی" location="bottom">
          <template v-slot:activator="{props}">
            <v-btn
              color="#000"
              v-bind="props"
              @click="_restore"
              variant="text"
              icon="mdi-restore"></v-btn>
          </template>
        </v-tooltip>
      </slot>
    </td>
    <td v-else>
      <slot name="actions" :item="item">
        <v-menu v-if="actions && actions.length !== 0" location="right">
          <template v-slot:activator="{props: menu}">
            <v-tooltip text="عملیات ها" location="bottom">
              <template v-slot:activator="{props: tooltip}">
                <v-btn
                  color="#000"
                  v-bind="mergeProps(menu, tooltip)"
                  variant="text"
                  icon="mdi-dots-vertical"></v-btn>
              </template>
            </v-tooltip>
          </template>
          <v-list>
            <v-list-item
              v-for="(action, index) in actions"
              :key="index"
              @click="action.cb(item)">
              <v-list-item-title>
                <v-icon>{{ action.icon }}</v-icon>
                {{ action.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <slot name="edit">
          <v-tooltip v-if="withEdit" text="ویرایش" location="bottom">
            <template v-slot:activator="{props}">
              <v-btn
                color="#000"
                v-bind="props"
                @click="_edit"
                variant="text"
                icon="mdi-pencil"></v-btn>
            </template>
          </v-tooltip>
        </slot>

        <slot name="delete">
          <v-tooltip v-if="withDelete" text="حذف" location="bottom">
            <template v-slot:activator="{props}">
              <v-btn
                color="#000"
                v-bind="props"
                @click="_delete"
                variant="text"
                icon="mdi-delete"></v-btn>
            </template>
          </v-tooltip>
        </slot>
        <slot name="extend_action" :item="item"></slot>
      </slot>
    </td>
  </template>
</template>
<script lang="ts" setup>
  import {inject, mergeProps} from 'vue';
  import {useRouter, useRoute} from 'vue-router';

  interface Props {
    item: {[key: string]: any};
    withEdit: boolean;
    withDelete: boolean;
    editUrl?: (items: object) => void;
    actions?: any;
    isRecycleBin: boolean;
    withAction?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    withEdit: true,
    withDelete: true,
    withAction: true,
    isRecycleBin: false
  });
  const emits = defineEmits<{
    (e: 'delete', items: string): void;
    (e: 'restore', items: string): void;
  }>();
  const $dialog: any = inject('dialog');
  const $router = useRouter();
  const $route = useRoute();

  function _edit() {
    if (props.editUrl) {
      props.editUrl(props.item);
    } else {
      const url = $route.path + '/' + props.item.id;
      $router.push(url);
    }
  }
  async function _delete() {
    const confirm = await $dialog.confirm({
      title: 'آیا از حذف این آیتم مطمئن میباشید ؟',
      ok_txt: 'بله',
      cancel_txt: 'خیر'
    });
    if (confirm) {
      emits('delete', props.item.id);
    }
  }
  async function _restore() {
    const confirm = await $dialog.confirm({
      title: 'آیا از بازیابی این آیتم مطمئن میباشید ؟',
      ok_txt: 'بله',
      cancel_txt: 'خیر'
    });
    if (confirm) {
      emits('restore', props.item.id);
    }
  }
</script>
<style lang="scss" scoped></style>
