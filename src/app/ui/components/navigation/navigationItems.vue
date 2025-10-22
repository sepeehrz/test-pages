<template>
  <v-list class="nav-list" :opened="opened" @update:opened="openMenu">
    <template v-for="(item, index) in menuItems">
      <v-list-item v-if="!item.child" :to="item.to" :key="index" exact>
        <template v-slot:title>
          <v-icon :icon="item.icon"></v-icon>
          {{ item.title }}
        </template>
      </v-list-item>
      <v-list-group v-else :value="item.value" :prepend-icon="item.icon">
        <template v-slot:activator="{props}">
          <v-list-item v-bind="props" :title="item.title"></v-list-item>
        </template>
        <template v-for="(subMenu, index) in item.child">
          <v-list-item
            v-if="!subMenu.child"
            :to="subMenu.to"
            :key="index"
            exact
            nav
            :active-calss="$route.meta.module === subMenu.module">
            <template v-slot:title>
              <v-icon :icon="subMenu.icon"></v-icon>
              {{ subMenu.title }}
            </template>
          </v-list-item>

          <v-list-group
            v-else
            :value="subMenu.title"
            :prepend-icon="subMenu.icon">
            <template v-slot:activator="{props}">
              <v-list-item v-bind="props" :title="subMenu.title"></v-list-item>
            </template>
            <v-list-item
              v-for="(child, i) in subMenu.child"
              :key="i"
              :to="child.to"
              prepend-icon="mdi-account-circle"
              :title="child.title"
              :value="child.title"
              exact></v-list-item>
          </v-list-group>
        </template>
      </v-list-group>
    </template>
  </v-list>
</template>
<script lang="ts" setup>
  import {ref} from 'vue';
  import {useRoute} from 'vue-router';

  interface Props {
    menuItems: any;
  }
  withDefaults(defineProps<Props>(), {
    menuItems: true
  });
  const opened = ref<any>(['organizations', 'banks']);
  const $route = useRoute();

  function openMenu(newOpened: any) {
    if (newOpened && newOpened.length) {
      opened.value = newOpened;
    }
  }
</script>
<style lang="scss" scoped>
  .nav-list {
    :deep(.v-list-group) {
      .v-list-group__items {
        --indent-padding: 10px;
        .v-list-item__spacer {
          width: 3px;
        }
      }
    }
    :deep(.v-list-item) {
      .v-list-item__spacer {
        width: 3px;
      }
    }
  }
</style>
