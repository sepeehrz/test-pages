<template>
  <v-tooltip :text="text">
    <template v-slot:activator="{props}">
      <div class="badge" :style="{backgroundColor: color}" v-bind="props">
        {{ text }}
      </div>
    </template>
  </v-tooltip>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';

  export default defineComponent({
    name: 'Badge'
  });
</script>
<script lang="ts" setup>
  interface Props {
    text: string;
    color: string;
  }
  withDefaults(defineProps<Props>(), {
    text: '',
    color: ''
  });
</script>
<style lang="scss" scoped>
  .badge {
    max-width: 90px;
    line-height: 30px;
    vertical-align: middle;
    text-align: center;
    padding: 0 10px;
    height: 30px;
    border-radius: 7px;
    color: #fff;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
