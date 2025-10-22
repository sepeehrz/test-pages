<template>
  <v-locale-provider rtl>
    <v-app>
      <SideBar :drawer="drawer" />
      <v-app-bar elevation="2" height="79">
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click="drawerfn"></v-app-bar-nav-icon>
        </template>
        <template v-slot:append>
          <v-tooltip text="تغییر تم">
            <template v-slot:activator="{props}">
              <v-btn
                :icon="getThemeIcon()"
                v-bind="props"
                @click="toggleTheme"></v-btn>
            </template>
          </v-tooltip>
        </template>
      </v-app-bar>
      <v-main tag="div" scrollable>
        <v-card class="pa-4">
          <RouterView />
          <Loader />
        </v-card>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>

<script setup lang="ts">
  import {ref} from 'vue';
  import SideBar from '../components/sideBar/index.vue';
  import {useVuetifyTheme} from '@app/composables/useVuetifyTheme';
  import Loader from '@app/ui/components/loader.vue';
  const {toggleTheme, getThemeIcon} = useVuetifyTheme();

  const drawer = ref(true);

  function drawerfn() {
    drawer.value = !drawer.value;
  }
</script>

<style lang="scss">
  :deep(.v-application) {
    .v-main__scroller {
      overflow-x: hidden;
    }
  }
</style>
