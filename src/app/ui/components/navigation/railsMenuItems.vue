<template>
  <v-list
    class="rails-menu"
    :opened="opened"
    @update:opened="newOpened => (opened = newOpened)">
    <template v-for="(item, index) in menuItems">
      <v-tooltip
        v-if="item"
        :key="index"
        :text="item.title"
        open-delay="0"
        open-on-hover
        location="left">
        <template v-slot:activator="{props}">
          <v-list-item v-bind="props" :to="item.to" exact>
            <template v-slot:prepend>
              <v-icon>{{ item.icon }}</v-icon>
            </template>
          </v-list-item>
        </template>
      </v-tooltip>
    </template>
  </v-list>
</template>
<script lang="ts" setup>
  import {ref} from 'vue';
  const opened = ref(['بانک ها', 'سازمان ها']);
  interface Props {
    menuItems: any;
  }
  withDefaults(defineProps<Props>(), {
    menuItems: true
  });
</script>
<style lang="scss" scoped>
  .rails-menu {
    :deep(.v-list-group) {
      .v-list-group__items {
        --indent-padding: 2px;
        .v-list-item__spacer {
          width: 3px;
        }
      }
    }
    :deep(.v-list-item) {
      .v-list-item__spacer {
        width: 10px;
      }
    }
  }
</style>
