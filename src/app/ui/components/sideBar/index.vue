<template>
  <v-navigation-drawer v-model="drawer" :rail="rail" permanent app>
    <railMenuItems v-if="rail" :menuItems="railMenu" />
    <navigationItems v-else :menuItems="menuItems" />
  </v-navigation-drawer>
</template>
<script lang="ts" setup>
  import {ref, computed} from 'vue';
  import GlobalRepository from '@remote/global/Repository';
  import railMenuItems from '../navigation/railsMenuItems.vue';
  import navigationItems from '../navigation/navigationItems.vue';

  interface Props {
    drawer: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    drawer: true
  });

  const rail = ref(false);

  const drawer = computed(() => {
    return props.drawer;
  });

  const menuItems = computed(() => {
    return GlobalRepository.getMenu();
  });

  const railMenu = computed(() => {
    let menu = [];
    for (const item of menuItems.value) {
      if (item.child) {
        for (const child of item.child) {
          menu.push(child);
        }
      }
    }
    return menu;
  });
</script>
<style lang="scss" scoped></style>
